CREATE DATABASE MED_GROUP_N
GO 

USE MED_GROUP_N
GO

CREATE TABLE CLINICA(
idClinica SMALLINT PRIMARY KEY IDENTITY,
NomeClinica VARCHAR(90) NOT NULL,
CNPJ VARCHAR(19) NOT NULL,
RazaoSocial VARCHAR(50) NOT NULL,
Endereco VARCHAR(150) NOT NULL
);
GO

CREATE TABLE TIPO_USUARIO (
  idTipoUsuario SMALLINT PRIMARY KEY IDENTITY,
  NomeTipo VARCHAR(50) NOT NULL
);
GO

CREATE TABLE USUARIO(
  idUsuario INT PRIMARY KEY IDENTITY,
  idTipoUsuario SMALLINT FOREIGN KEY REFERENCES TIPO_USUARIO(idTipoUsuario),
  email VARCHAR(256) UNIQUE NOT NULL,
  senha VARCHAR(10) NOT NULL 
);
GO

CREATE TABLE ESPECIALIDADE (
  idEspecialidade SMALLINT PRIMARY KEY IDENTITY,
  NomeEspecialidade VARCHAR(60) NOT NULL
);
GO


CREATE TABLE MEDICO(
  idMedico SMALLINT PRIMARY KEY IDENTITY,
  idEspecialidade SMALLINT FOREIGN KEY REFERENCES ESPECIALIDADE (idEspecialidade),
  idClinica SMALLINT FOREIGN KEY REFERENCES CLINICA (idClinica),
  idUsuario INT FOREIGN KEY REFERENCES USUARIO(idUsuario),
  CRM VARCHAR(9) UNIQUE NOT NULL,
  NomeMedico VARCHAR(40) NOT NULL 
);
GO

CREATE TABLE PACIENTE(
  idPaciente SMALLINT PRIMARY KEY IDENTITY,
  idUsuario INT FOREIGN KEY REFERENCES USUARIO(idUsuario),
  NomePaciente VARCHAR(10) NOT NULL ,
  DataNascimento DATE NOT NULL,
  Telefone VARCHAR (20),
  RG VARCHAR (10) UNIQUE NOT NULL,
  CPF VARCHAR (11) UNIQUE NOT NULL,
  Endereco VARCHAR (200)  NOT NULL,
);
GO

CREATE TABLE SITUACAO (
  idSituacao SMALLINT PRIMARY KEY IDENTITY,
  TipoSituacao VARCHAR(20) NOT NULL
);
GO

CREATE TABLE CONSULTA(
  idConsulta SMALLINT PRIMARY KEY IDENTITY,
  idMedico SMALLINT FOREIGN KEY REFERENCES MEDICO (idMedico),
  idPaciente SMALLINT FOREIGN KEY REFERENCES PACIENTE (idPaciente),
  idSituacao SMALLINT FOREIGN KEY REFERENCES SITUACAO (idSituacao),
  data_hora DATETIME NOT NULL 
);
GO