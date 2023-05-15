import express, { NextFunction, Request, Response } from "express";
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
import { AsistenciaRepository } from "./infrastructure/repository/asistencia.repository";
import { Asistencia } from "./infrastructure/entity/Asistencia";
import { DocumentoRepository } from "./infrastructure/repository/documento.repository";
import { Documento } from "./infrastructure/entity/Documento";
import { EncuestaRepository } from "./infrastructure/repository/encuesta.repository";
import { Encuesta } from "./infrastructure/entity/Encuesta";
import { UnidadDeAprendizajeRepository } from "./infrastructure/repository/unidad.aprendizaje.repository";
import { SemestreRepository } from "./infrastructure/repository/semestre.repository";
import { SemestreGrupoRepository } from "./infrastructure/repository/semestre.grupo.repository";
import { Rol, Usuario } from "./infrastructure/entity/Usuario";
import { ProblematicasGrupoRepository } from "./infrastructure/repository/problematicas.grupo.repository";
import { EncuestaProblematicasGrupoRepository } from "./infrastructure/repository/encuesta.problematicas.grupo.repository";
import { DificultadEstudianteRepository } from "./infrastructure/repository/dificultad.estudiante.repository";
import { EncuestaProblematicasGrupo } from "./infrastructure/entity/EncuestaProblematicasGrupo";
import { DificultadEstudiantes } from "./infrastructure/entity/DificultadEstudiantes";


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
const asistenciaRepository = new AsistenciaRepository()
const documentoRepository = new DocumentoRepository()
const reunionRepository = new ReunionRepository()
const usuarioRepository = new UsuarioRepository()
const encuestaRepository = new EncuestaRepository()
const unidadDeAprendizajeRepository = new UnidadDeAprendizajeRepository()
const semestreRepository = new SemestreRepository()
const semestreGrupoRepository = new SemestreGrupoRepository()
const problematicasGrupoRepository = new ProblematicasGrupoRepository()
const encuestaProblematicasGrupoRepository = new EncuestaProblematicasGrupoRepository()
const dificultadEstudianteRepository = new DificultadEstudianteRepository()


interface RequestWithUsuario extends Request {
    usuario: any; // Aquí puedes definir el tipo de usuario según tus necesidades
}

// Middleware para verificar el token JWT
export const verificarToken = (req: RequestWithUsuario, res: Response, next: NextFunction) => {
    // Obtener el token de la cabecera de autorización
    const token = req.headers.authorization?.split(' ')[1];

    // Si no hay token, enviar un error
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        // Verificar y decodificar el token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'mi-secreto-super-seguro');

        // Adjuntar los datos del usuario decodificado al objeto de solicitud
        req.usuario = decodedToken;

        // Pasar al siguiente middleware
        next();
    } catch (error) {
        // Si el token es inválido o ha expirado, enviar un error
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

// Aplicar el middleware de verificación de token a todas las rutas, excepto a la ruta /auth
app.use((req: RequestWithUsuario, res: Response, next: NextFunction) => {
    if (req.path !== '/auth') {
        verificarToken(req, res, next);
    } else {
        next();
    }
});


//Usuarios
app.get("/users", async (req: RequestWithUsuario, res: Response) => {
    let users = await usuarioRepository.obtenerUsuarios(myDataSource)
    if (req.usuario.rol === Rol.COORDINADOR) {
        users = users.filter((user: Usuario) => user.coordinadorId === req.usuario.id)
    }
    res.json(removePasswordFromJSON(users))
})

app.get("/users/:id", async function (req: RequestWithUsuario, res: Response) {
    const results = await usuarioRepository.obtenerUsuarioPorId(myDataSource, parseInt(req.params.id))
    return res.send(removePasswordFromJSON(results))
})

app.get("/users/ids/:ids", async function (req: RequestWithUsuario, res: Response) {
    const { ids } = req.params;
    const idList = ids.split(',').map((id) => parseInt(id, 10));
    const usuarios = await usuarioRepository.obtenerUsuariosPorId(myDataSource, idList);
    return res.send(removePasswordFromJSON(usuarios));
})

app.get("/users/coordinador/:id", async function (req: RequestWithUsuario, res: Response) {
    const results = await usuarioRepository.obtenerUsuariosPorIdCoordinador(myDataSource, parseInt(req.params.id))
    return res.send(removePasswordFromJSON(results))
})

app.post("/users", async function (req: RequestWithUsuario, res: Response) {
    const results = await usuarioRepository.crearUsuario(myDataSource, req.body)
    return res.send(results)
})

app.put("/users/:id", async function (req: RequestWithUsuario, res: Response) {
    const results = await usuarioRepository.modificarUsuario(myDataSource, parseInt(req.params.id), req.body)
    return res.send(removePasswordFromJSON(results))
})

app.delete("/users/:id", async function (req: RequestWithUsuario, res: Response) {
    const results = await usuarioRepository.eliminarUsuario(myDataSource, parseInt(req.params.id))
    return res.send(results)
})

/**
 * Documentos
 */
// Obtener todos los documentos
app.get("/documentos", async (req: RequestWithUsuario, res: Response) => {
    try {
        let documentos = await documentoRepository.obtenerDocumentos(myDataSource);
        if (req.usuario.rol === Rol.PROFESOR) {
            documentos = documentos.filter((documento: Documento) => documento.usuarioId === req.usuario.id)
        }
        if (req.usuario.rol === Rol.COORDINADOR) {
            documentos = documentos.filter((documento: Documento) => documento.usuarioId === req.usuario.id || documento.usuario.coordinadorId === req.usuario.id)
        }
        res.json(removePasswordFromJSON(documentos));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Obtener un documento por su id
app.get("/documentos/:id", async (req: RequestWithUsuario, res: Response) => {
    try {
        const { id } = req.params;
        const documento = await documentoRepository.obtenerDocumentoPorId(myDataSource, parseInt(id));
        if (documento) {
            res.json(documento);
        } else {
            res.status(404).json({ error: "Documento no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo documento
app.post("/documentos/", async (req: RequestWithUsuario, res: Response) => {
    try {
        const documento = req.body as Documento;
        const nuevoDocumento = await documentoRepository.crearDocumento(myDataSource, documento);
        res.json(nuevoDocumento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar un documento existente
app.put("/documentos/:id", async (req: RequestWithUsuario, res: Response) => {
    try {
        const { id } = req.params;
        const documento = req.body as Documento;
        const documentoActualizado = await documentoRepository.modificarDocumento(myDataSource, parseInt(id), documento);
        if (documentoActualizado) {
            res.json(documentoActualizado);
        } else {
            res.status(404).json({ error: "Documento no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un documento existente
app.delete("/documentos/:id", async (req: RequestWithUsuario, res: Response) => {
    try {
        const { id } = req.params;
        const eliminado = await documentoRepository.eliminarDocumento(myDataSource, parseInt(id));
        if (eliminado) {
            res.json({ message: "Documento eliminado correctamente" });
        } else {
            res.status(404).json({ error: "Documento no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Encuestas
 */
// Obtener todas las encuestas
app.get("/encuestas", async (req: RequestWithUsuario, res: Response) => {
    try {
        let encuestas = await encuestaRepository.obtenerEncuestas(myDataSource);
        if (req.usuario.rol === Rol.PROFESOR) {
            encuestas = encuestas.filter((encuesta: Encuesta) => encuesta.usuarioId === req.usuario.id)
        }
        if (req.usuario.rol === Rol.COORDINADOR) {
            encuestas = encuestas.filter((encuesta: Encuesta) => encuesta.usuarioId === req.usuario.id || encuesta.usuario.coordinadorId === req.usuario.id)
        }
        res.json(removePasswordFromJSON(encuestas));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las encuestas" });
    }
});

// Obtener una encuesta por su ID
app.get("/encuestas/:id", async (req: RequestWithUsuario, res: Response) => {
    const { id } = req.params;
    try {
        const encuesta = await encuestaRepository.obtenerEncuestaPorId(myDataSource, Number(id));
        if (encuesta) {
            res.json(encuesta);
        } else {
            res.status(404).json({ message: `No se encontró la encuesta con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error al obtener la encuesta con ID ${id}` });
    }
});

// Crear una nueva encuesta
app.post("/encuestas", async (req: RequestWithUsuario, res: Response) => {
    const encuesta: Encuesta = req.body;
    const problematica = req.body.problematica;
    const mayorDificultad = req.body.mayorDificultad;
    try {
        const nuevaEncuesta = await encuestaRepository.crearEncuesta(myDataSource, encuesta);
        const encuestaProblematicas: EncuestaProblematicasGrupo = {
            id: null,
            encuestaId: nuevaEncuesta.id,
            problematicasGrupoId: problematica,
            otro: null,
            encuesta: null,
            problematicasGrupo: null
        };
        await encuestaProblematicasGrupoRepository.crearEncuestaProblematicasGrupo(myDataSource, encuestaProblematicas);
        mayorDificultad.forEach(async (item: any) => {
            let dificultadEstudiante: DificultadEstudiantes = {
                id: null,
                nombre: null,
                idEncuesta: nuevaEncuesta.id,
                razon: item.razon,
                observacion: item.observacion,
                encuesta: null,
            }
            await dificultadEstudianteRepository.crearDificultadEstudiante(myDataSource, dificultadEstudiante);
        })

        res.json(nuevaEncuesta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la encuesta" });
    }
});

// Actualizar una encuesta existente
app.put("/encuestas/:id", async (req: RequestWithUsuario, res: Response) => {
    const { id } = req.params;
    const encuesta: Encuesta = req.body;
    try {
        const encuestaActualizada = await encuestaRepository.modificarEncuesta(myDataSource, Number(id), encuesta);
        if (encuestaActualizada) {
            res.json(encuestaActualizada);
        } else {
            res.status(404).json({ message: `No se encontró la encuesta con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error al actualizar la encuesta con ID ${id}` });
    }
});

// Eliminar una encuesta existente
app.delete("/encuestas/:id", async (req: RequestWithUsuario, res: Response) => {
    const { id } = req.params;
    try {
        const eliminada = await encuestaRepository.eliminarEncuesta(myDataSource, Number(id));
        if (eliminada) {
            res.json({ message: `Encuesta con ID ${id} eliminada correctamente` });
        } else {
            res.status(404).json({ message: `No se encontró la encuesta con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error al eliminar la encuesta con ID ${id}` });
    }
});

/**
 * Unidad de aprendizaje
 */
app.get("/unidades-de-aprendizaje", async (req: RequestWithUsuario, res: Response) => {
    try {
        const unidad = await unidadDeAprendizajeRepository.obtenerUnidadesDeAprendizaje(myDataSource);
        res.json(unidad);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las encuestas" });
    }
});
/**
 * Unidad de aprendizaje
 */
app.get("/problematicas-grupo", async (req: RequestWithUsuario, res: Response) => {
    try {
        const problematicasGrupo = await problematicasGrupoRepository.obtenerProblematicasGrupo(myDataSource);
        res.json(problematicasGrupo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las encuestas" });
    }
});

/**
 * Semestres
 */
app.get("/semestres", async (req: RequestWithUsuario, res: Response) => {
    try {
        const semestres = await semestreRepository.obtenerSemestres(myDataSource);
        res.json(semestres);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las encuestas" });
    }
});

app.get("/semestres/:id/grupos", async (req: RequestWithUsuario, res: Response) => {
    const { id } = req.params;
    try {
        const grupos = await semestreGrupoRepository.obtenerGrupoPorSemestreId(myDataSource, Number(id));
        if (grupos) {
            res.json(grupos);
        } else {
            res.status(404).json({ message: `No se encontró la encuesta con ID ${id}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error al obtener la encuesta con ID ${id}` });
    }
});

/**
 * Reuniones
 */

// Obtener todas las reuniones
app.get('/reuniones', async (req: RequestWithUsuario, res: Response) => {
    try {
        let reuniones = await reunionRepository.obtenerReuniones(myDataSource);
        if (req.usuario.rol === Rol.PROFESOR) {
            reuniones = reuniones.filter((reunion: Reunion) => reunion.coordinadorId === req.usuario.coordinadorId)
        }
        if (req.usuario.rol === Rol.COORDINADOR) {
            reuniones = reuniones.filter((reunion: Reunion) => reunion.coordinadorId === req.usuario.id)
        }
        res.json(removePasswordFromJSON(reuniones));
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las reuniones' });
    }
});

// Obtener una reunión por ID
app.get('/reuniones/:id', async (req: RequestWithUsuario, res: Response) => {
    try {
        const { id } = req.params;
        let reunion = await reunionRepository.obtenerReunionPorId(myDataSource, parseInt(id));
        if (reunion) {
            let asistencia = await asistenciaRepository.obtenerAsistenciasPorReunionId(myDataSource, parseInt(id));
            if (asistencia) {
                reunion.asistencias = asistencia;
            }
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
app.post('/reuniones', async (req: RequestWithUsuario, res: Response) => {
    try {
        const reunion = req.body as Reunion;
        const nuevaReunion = await reunionRepository.crearReunion(myDataSource, reunion);
        reunion.asistencias.forEach(async (asistente: any) => {
            let asistencia = new Asistencia();
            asistencia.usuarioId = asistente;
            asistencia.reunionId = nuevaReunion.id;
            asistencia.fecha_hora = nuevaReunion.fecha_hora;
            asistencia.asistio = 0;
            return await asistenciaRepository.crearAsistencia(myDataSource, asistencia);
        });
        res.json(nuevaReunion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la reunión' });
    }
});

// Modificar una reunión por ID
app.put('/reuniones/:id', async (req: RequestWithUsuario, res: Response) => {
    try {
        const { id } = req.params;
        const reunion = req.body as Reunion;
        const asistencias = reunion.asistencias;
        delete reunion.asistencias;
        const reunionModificada = await reunionRepository.modificarReunion(myDataSource, parseInt(id), reunion);
        console.error('Termina asistencia');
        await asistenciaRepository.eliminarAsistenciaReunionId(myDataSource, parseInt(id));
        asistencias.forEach(async (asistente: any) => {
            let asistencia = new Asistencia();
            asistencia.usuarioId = asistente;
            asistencia.reunionId = reunionModificada.id;
            asistencia.fecha_hora = reunionModificada.fecha_hora;
            asistencia.asistio = 0;
            return await asistenciaRepository.crearAsistencia(myDataSource, asistencia);
        });
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

// Modificar una reunión por ID
app.put('/asistencias/:id', async (req: RequestWithUsuario, res: Response) => {
    try {
        const asistenciaId = parseInt(req.params.id);
        const asistenciaRepository = new AsistenciaRepository();
        const asistenciaExistente = await asistenciaRepository.obtenerAsistenciaPorId(myDataSource, asistenciaId);
        if (asistenciaExistente) {
            const { asistio } = req.body;
            asistenciaExistente.asistio = asistio;
            const asistenciaModificada = await asistenciaRepository.modificarAsistencia(myDataSource, asistenciaId, asistenciaExistente);
            return res.json(asistenciaModificada);
        } else {
            return res.status(404).json({ message: "Asistencia no encontrada" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error al actualizar asistencia" });
    }
});

// Eliminar una reunión por ID
app.delete('/reuniones/:id', async (req: RequestWithUsuario, res: Response) => {
    try {
        const { id } = req.params;
        await asistenciaRepository.eliminarAsistenciaReunionId(myDataSource, parseInt(id));
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
            coordinadorId: usuario.coordinadorId,
            rol: usuario.rol,
            nombre: usuario.nombre,
            apellidoPaterno: usuario.apellidoPaterno,
            apellidoMaterno: usuario.apellidoMaterno,
        },
        process.env.JWT_SECRET || 'mi-secreto-super-seguro',
        { expiresIn: '1h' }
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

app.post("/upload", upload.single("file"), (req: RequestWithUsuario, res: Response) => {
    try {
        // si se guardó correctamente, se devuelve la ruta del archivo guardado
        res.send({ success: true, fileUrl: `${req.file.filename}` });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Error al guardar el archivo" });
    }
})

app.get("/download/:archivo", (req: RequestWithUsuario, res: Response) => {
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

function removePasswordFromJSON(json: any): any {
    // Primero, asegurémonos de que el objeto JSON sea válido.
    if (typeof json !== "object" || json === null) {
        throw new Error("El valor proporcionado no es un objeto JSON válido.");
    }

    // Si el objeto JSON tiene la llave "password", la eliminamos.
    if (json.hasOwnProperty("password")) {
        delete json.password;
    }

    // Comprobamos si hay más objetos JSON anidados y llamamos a esta función de manera recursiva
    // para buscar y eliminar la llave "password" en todos los niveles del objeto.
    for (const prop in json) {
        if (json.hasOwnProperty(prop) && typeof json[prop] === "object" && json[prop] !== null) {
            json[prop] = removePasswordFromJSON(json[prop]);
        }
    }

    return json;
}