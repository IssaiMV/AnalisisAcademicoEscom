DROP TABLE encuesta_dificultad_estudiantes;

ALTER TABLE dificultad_estudiantes
ADD COLUMN id_encuesta INT,
ADD COLUMN razon VARCHAR(50),
ADD COLUMN observacion TEXT;

INSERT INTO problematicas_grupo (nombre) VALUES
('Ninguna'),
('Falta de participación en clase'),
('Bajo rendimiento académico'),
('Problemas de disciplina'),
('Falta de motivación'),
('Dificultades de aprendizaje'),
('Falta de interacción entre los estudiantes'),
('Ausentismo frecuente'),
('Problemas de comunicación con el profesor');

-- Insertar registros en la tabla semestre
INSERT INTO semestre (nombre) VALUES
('2019/1'),
('2019/2'),
('2020/1'),
('2020/2');

-- Insertar registros en la tabla grupo
INSERT INTO grupo (nombre) VALUES
('1CM1'),
('1CV2'),
('2CM1'),
('2CV2'),
('3CM1'),
('3CV2'),
('4CM1'),
('4CV2'),
('5CM1'),
('5CV2'),
('6CM1'),
('6CV2'),
('7CM1'),
('7CV2'),
('8CM1'),
('8CV2');

-- Insertar registros en la tabla semestre_grupo
INSERT INTO semestre_grupo (semestre_id, grupo_id) VALUES
(1, 1),  -- 2021/1 - 1CM1
(1, 2),  -- 2021/1 - 1CV2
(2, 1),  -- 2021/2 - 1CM1
(2, 2),  -- 2021/2 - 1CV2
(3, 3),  -- 2022/1 - 2CM1
(3, 4),  -- 2022/1 - 2CV2
(4, 3),  -- 2022/2 - 2CM1
(4, 4),  -- 2022/2 - 2CV2
(5, 5),  -- 2023/1 - 3CM1
(5, 6),  -- 2023/1 - 3CV2
(6, 5),  -- 2023/2 - 3CM1
(6, 6),  -- 2023/2 - 3CV2
(7, 7),  -- 2024/1 - 4CM1
(7, 8),  -- 2024/1 - 4CV2
(8, 7),  -- 2024/2 - 4CM1
(8, 8),  -- 2024/2 - 4CV2
(9, 9),  -- 2025/1 - 5CM1
(9, 10), -- 2025/1 - 5CV2
(10, 9), -- 2025/2 - 5CM1
(10, 10),-- 2025/2 - 5CV2
(9, 11), -- 2025/1 - 6CM1
(9, 12), -- 2025/1 - 6CV2
(10, 11),-- 2025/2 - 6CM1
(10, 12),-- 2025/2 - 6CV2
(9, 13), -- 2025/1 - 7CM1
(9, 14), -- 2025/1 - 7CV2
(10, 13),-- 2025/2 - 7CM1
(10, 14);-- 2025/2 - 7CV2

