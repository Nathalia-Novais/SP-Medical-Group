
USE MED_GROUP_N
GO

--CLINICA
INSERT INTO CLINICA(NomeClinica,CNPJ,RazaoSocial,Endereco)
VALUES ('Clinica Porssale','86.400.902/0001-30','SP Medical Group','Av. Barão Limeira, 532, São Paulo, SP');
GO

SELECT * FROM  CLINICA

--TIPO_USUARIO
INSERT INTO TIPO_USUARIO (NomeTipo)
VALUES ('Administrador'),('Médico'),('Paciente');
GO

SELECT * FROM TIPO_USUARIO


--USUARIO
INSERT INTO USUARIO (idTipoUsuario,email,senha)
VALUES 
(1,'adm@gmail.com','adm123'),(2,'ricardo.lemos@spmedicalgroup.com.br','123'),
(2,'roberto.possarle@spmedicalgroup.com.br','345'),(2,'helena.souza@spmedicalgroup.com.br','678'),
(3,'ligia@gmail.com','912'),(3,'alexandre@gmail.com','349'),
(3,'fernando@gmail.com','670'),(3,'henrique@gmail.com','234'),
(3,'joao@hotmail.com','523'),(3,'bruno@gmail.com','685'),
(3,'mariana@outlook.com','809');
GO
SELECT * FROM USUARIO

--ESPECIALIDADE
INSERT INTO ESPECIALIDADE (NomeEspecialidade)
VALUES ('Acupuntura'),('Anestesiologia'),('Angiologia'),('Cardiologia'),
('Cirurgia Cardiovascular'),('Cirurgia da Mão'),('Cirurgia do Aparelho Digestivo')
,('Cirurgia Geral'),('Cirurgia Pediátrica'),('Cirurgia Plástica'),
('Cirurgia Torácica'),('Cirurgia Vascular'),('Dermatologia'),
('Radioterapia'),('Urologia'),('Pediatria'),('Psiquiatria');
GO
SELECT * FROM ESPECIALIDADE

 --MEDICO
 INSERT INTO MEDICO (idEspecialidade,idClinica,idUsuario,CRM,NomeMedico)
VALUES
(2,1,2,'54356-SP','Ricardo Lemos'),(17,1,3,'53452-SP','Roberto Possarle'),(16,1,4,'65463-SP','Helena Strada');
GO
SELECT * FROM MEDICO

 --PACIENTE
 INSERT INTO PACIENTE(idUsuario,NomePaciente,DataNascimento,Telefone,RG,CPF,Endereco)
 VALUES (5,'Ligia','13/10/1983','','','',''),
 (6,'Alexandre','23/07/2001','','','',''),
 (7,'Fernando','10/10/1978','','','',''),
 (8,'Henrique','13/10/1985','','','',''),
 (9,'João','27/08/1975','','','',''),
 (10,'Bruno','21/03/1972','','','',''),
 (11,'Mariana','05/03/2018','','','','');
 GO

 --SITUACAO

-- CONSULTA