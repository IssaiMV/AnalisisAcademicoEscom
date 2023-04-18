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
import jwt from 'jsonwebtoken';
import { ReunionRepository } from "./infrastructure/repository/reunion.repository";
import { Reunion } from "./infrastructure/entity/Reunion";


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
const reunionRepository = new ReunionRepository()


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

/**
 * Reuniones
 */

// Obtener todas las reuniones
app.get('/reuniones', async (req: Request, res: Response) => {
    try {
        const reuniones = await reunionRepository.obtenerReuniones(myDataSource);
        res.json(reuniones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las reuniones' });
    }
});

// Obtener una reunión por ID
app.get('/reuniones/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const reunion = await reunionRepository.obtenerReunionPorId(myDataSource, parseInt(id));
        if (reunion) {
            res.json(reunion);
        } else {
            res.status(404).json({ message: 'Reunión no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la reunión' });
    }
});

// Crear una reunión
app.post('/reuniones', async (req: Request, res: Response) => {
    try {
        const reunion = req.body as Reunion;
        const nuevaReunion = await reunionRepository.crearReunion(myDataSource, reunion);
        res.json(nuevaReunion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la reunión' });
    }
});

// Modificar una reunión por ID
app.put('/reuniones/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const reunion = req.body as Reunion;
        const reunionModificada = await reunionRepository.modificarReunion(myDataSource, parseInt(id), reunion);
        if (reunionModificada) {
            res.json(reunionModificada);
        } else {
            res.status(404).json({ message: 'Reunión no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al modificar la reunión' });
    }
});

// Eliminar una reunión por ID
app.delete('/reuniones/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const eliminada = await reunionRepository.eliminarReunion(myDataSource, parseInt(id));
        if (eliminada) {
            res.json({ message: 'Reunión eliminada correctamente' });
        } else {
            res.status(404).json({ message: 'Reunión no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la reunión' });
    }
});


/**
 * Auth
 */

app.post('/auth', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Buscar al usuario por su email
    const usuario = await usuarioRepository.obtenerUsuarioPorEmail(myDataSource, email);

    // Si el usuario no existe, enviar un error
    if (!usuario) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Si la contraseña es incorrecta, enviar un error
    //    const passwordMatch = await bcrypt.compare(password, usuario.password);
    const passwordMatch = password === usuario.password;
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Si el usuario existe y la contraseña es correcta, generar el token JWT
    const token = jwt.sign(
        {
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol,
            nombre: usuario.nombre,
            apellidoPaterno: usuario.apellidoPaterno,
            apellidoMaterno: usuario.apellidoMaterno,
        },
        process.env.JWT_SECRET || 'mi-secreto-super-seguro',
        { expiresIn: '3h' }
    );

    // Enviar la respuesta con el token
    return res.json({ token });
});


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
        res.send({ success: true, fileUrl: `${req.file.filename}` });
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