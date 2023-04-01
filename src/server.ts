import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import "reflect-metadata";
import { myDataSource } from "./infrastructure/database/app-data-source";
import { UsuarioRepository } from "./infrastructure/repository/usuario.repository";
import path from "path";
import fs from "fs";
import multer from "multer";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;



myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("¡Hola, mundo!");
});
const usuarioRepository = new UsuarioRepository()


//Usuarios

app.get("/users", async (req: Request, res: Response) => {
    const users = await usuarioRepository.obtenerUsuarios(myDataSource)
    res.json(users)
})

app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await usuarioRepository.obtenerUsuarioPorId(myDataSource, parseInt(req.params.id))
    return res.send(results)
})
app.get("/users/coordinador/:id", async function (req: Request, res: Response) {
    const results = await usuarioRepository.obtenerUsuariosPorIdCoordinador(myDataSource, parseInt(req.params.id))
    return res.send(results)
})

app.post("/users", async function (req: Request, res: Response) {
    const results = await usuarioRepository.crearUsuario(myDataSource, req.body)
    return res.send(results)
})

app.put("/users/:id", async function (req: Request, res: Response) {
    const results = await usuarioRepository.modificarUsuario(myDataSource, parseInt(req.params.id), req.body)
    return res.send(results)
})

app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await usuarioRepository.eliminarUsuario(myDataSource, parseInt(req.params.id))
    return res.send(results)
})


// configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // aquí se indica la carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // aquí se genera el nombre del archivo
    },
});
const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
    try {
        // si se guardó correctamente, se devuelve la ruta del archivo guardado
        res.send({ success: true, fileUrl: `/uploads/${req.file.filename}` });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Error al guardar el archivo" });
    }
})

app.get("/download/:archivo", (req: Request, res: Response) => {
    const archivo = req.params.archivo;
    const rutaArchivo = path.join(__dirname, "../uploads", archivo);
    console.log(rutaArchivo);

    // se verifica si el archivo existe
    if (fs.existsSync(rutaArchivo)) {
        // se envía el archivo para descarga
        res.download(rutaArchivo, (error) => {
            if (error) {
                console.error(error);
                res.status(500).send("Ha ocurrido un error al descargar el archivo");
            }
        });
    } else {
        res.status(404).send("El archivo no existe");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});