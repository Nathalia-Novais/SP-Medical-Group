USE MED_GROUP_N
GO

--SELECIONAR TODAS AS CLINICAS
  SELECT * FROM  CLINICA

--SELECIONAR TODOS OS TIPOS DE USUARIOS
SELECT * FROM TIPO_USUARIO

--SELECIONAR TODOS OS USUARIOS
SELECT * FROM USUARIO

--SELECIONAR TODAS ESPEECIALIDADES
SELECT * FROM ESPECIALIDADE

--SELECIONAR TODOS OS MEDICOS
SELECT * FROM MEDICO

--SELECIONAR TODOS OS PACIENTES
SELECT * FROM PACIENTE

--SELECIONAR TODAS SITUA�OES
SELECT * FROM SITUACAO

--SELECIONAR TODAS AS CONSULTAS
SELECT * FROM CONSULTA

--Mostrar a quantidade de usu�rios 
 SELECT  COUNT (*) [Quantidade de Usu�rios] FROM USUARIO

--Converter a data de nascimento do paciente para o formato (mm-dd-yyyy) na exibi��o
SELECT convert(varchar(20),DataNascimento,106) [Data de nascimento] FROM PACIENTE

--Calcular a idade do paciente a partir da data de nascimento
SELECT NomePaciente [Nome Paciente],FLOOR(DATEDIFF(DAY, DataNascimento, GETDATE()) / 365.25)[Idade] FROM PACIENTE


--Criou uma fun��o para retornar a quantidade de m�dicos de uma determinada especialidade
SELECT  COUNT (*) [Quantidade de M�dicos] FROM MEDICO
INNER JOIN ESPECIALIDADE
ON ESPECIALIDADE.idEspecialidade = MEDICO.idEspecialidade
WHERE NomeEspecialidade = 'Pediatria'
;

-- Mostrar pela a consulta o nome do m�dico e a especialidade dele , a situa��� da consulta e o nome do paciente
SELECT NomePaciente, TipoSituacao [Consulta],NomeMedico,NomeEspecialidade FROM CONSULTA
INNER JOIN MEDICO
ON MEDICO.idMedico = CONSULTA.idMedico
INNER JOIN ESPECIALIDADE
ON ESPECIALIDADE.idEspecialidade = MEDICO.idEspecialidade
INNER JOIN PACIENTE 
ON PACIENTE.idPaciente = CONSULTA.idPaciente
INNER JOIN SITUACAO 
ON SITUACAO.idSituacao = CONSULTA.idSituacao