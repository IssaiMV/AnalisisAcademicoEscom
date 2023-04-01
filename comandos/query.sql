CREATE TABLE usuario (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  apellido_paterno VARCHAR(50) NOT NULL,
  apellido_materno VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  rol ENUM('Profesor', 'Coordinador', 'Evaluador') NOT NULL,
  coordinador_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (coordinador_id) REFERENCES usuario(id)
);

CREATE TABLE reunion (
  id INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  enlace VARCHAR(255) NOT NULL,
  coordinador_id INT NULL,
  estatus ENUM('Realizada', 'Cancelada', 'Pendiente') NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (coordinador_id) REFERENCES usuario(id)
);

CREATE TABLE asistencia (
  id INT NOT NULL AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  id_reunion INT NOT NULL,
  fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  asistio TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id),
  FOREIGN KEY (id_reunion) REFERENCES reunion(id)
);

CREATE TABLE documento (
  id INT NOT NULL AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  ruta VARCHAR(255) NOT NULL,
  tipo ENUM('Evidencia', 'Planeacion') NOT NULL DEFAULT 'Evidencia',
  fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE unidad_de_aprendizaje (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  codigo VARCHAR(10) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE acuerdo (
  id INT NOT NULL AUTO_INCREMENT,
  reunion_id INT NOT NULL,
  id_coordinador INT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (id_coordinador) REFERENCES usuario(id),
  FOREIGN KEY (reunion_id) REFERENCES reunion(id)
);

CREATE TABLE comentario_documento (
  id INT NOT NULL AUTO_INCREMENT,
  id_coordinador INT NOT NULL,
  id_documento INT NOT NULL,
  comentario TEXT NOT NULL,
  fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (id_coordinador) REFERENCES usuario(id),
  FOREIGN KEY (id_documento) REFERENCES documento(id)
);

CREATE TABLE comentario_reunion (
  id INT NOT NULL AUTO_INCREMENT,
  id_coordinador INT NOT NULL,
  id_reunion INT NOT NULL,
  comentario TEXT NOT NULL,
  fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (id_coordinador) REFERENCES usuario(id),
  FOREIGN KEY (id_reunion) REFERENCES reunion(id)
);

CREATE TABLE comentario_sistema (
  id INT NOT NULL AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  comentario TEXT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE carrera (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE usuario_carrera (
  id INT NOT NULL AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  id_carrera INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id),
  FOREIGN KEY (id_carrera) REFERENCES carrera(id)
);

CREATE TABLE semestre (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE grupo (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE semestre_grupo (
  id INT NOT NULL AUTO_INCREMENT,
  semestre_id INT NOT NULL,
  grupo_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (semestre_id) REFERENCES semestre(id),
  FOREIGN KEY (grupo_id) REFERENCES grupo(id)
);

CREATE TABLE encuesta (
  id INT NOT NULL AUTO_INCREMENT,
  cantidad_alumnos INT NOT NULL,
  cantidad_aprobados INT NOT NULL,
  cantidad_reprobados INT NOT NULL,
  observaciones TEXT,
  semestre_grupo_id INT NOT NULL,
  usuario_id INT NOT NULL,
  unidad_de_aprendizaje_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (semestre_grupo_id) REFERENCES semestre_grupo(id),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  FOREIGN KEY (unidad_de_aprendizaje_id) REFERENCES unidad_de_aprendizaje(id)
);

CREATE TABLE dificultad_estudiantes (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE problematicas_grupo (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE encuesta_dificultad_estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    encuesta_id INT,
    dificultad_estudiantes_id INT,
    otro VARCHAR(255),
    FOREIGN KEY (encuesta_id) REFERENCES encuesta(id),
    FOREIGN KEY (dificultad_estudiantes_id) REFERENCES dificultad_estudiantes(id)
);

CREATE TABLE encuesta_problematicas_grupo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    encuesta_id INT,
    problematicas_grupo_id INT,
    otro VARCHAR(255),
    FOREIGN KEY (encuesta_id) REFERENCES encuesta(id),
    FOREIGN KEY (problematicas_grupo_id) REFERENCES problematicas_grupo(id)
);