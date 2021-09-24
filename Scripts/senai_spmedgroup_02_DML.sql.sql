
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
 VALUES (5,'Ligia','13/10/1983','11 3456-7654','43522543-5','94839859000','Rua Estado de Israel 240, São Paulo, Estado de São Paulo, 04022-000'),
 (6,'Alexandre','23/07/2001','11 98765-6543','32654345-7','73556944057','Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200'),
 (7,'Fernando','10/10/1978','11 97208-4453','54636525-3','16839338002','Av. Ibirapuera - Indianópolis, 2927,  São Paulo - SP, 04029-200'),
 (8,'Henrique','13/10/1985','11 3456-6543','54366362-5','14332654765','R. Vitória, 120 - Vila Sao Jorge, Barueri - SP, 06402-030'),
 (9,'João','27/08/1975','11 7656-6377','32544444-1','91305348010','R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeirão Pires - SP, 09405-380'),
 (10,'Bruno','21/03/1972','11 95436-8769','54566266-7','79799299004','Alameda dos Arapanés, 945 - Indianópolis, São Paulo - SP, 04524-001'),
 (11,'Mariana','05/03/2018',NULL,'54566266-8','13771913039','R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140');
 GO

 --SITUACAO
 INSERT INTO SITUACAO(TipoSituacao)
VALUES
('Realizada'),('Cancelada'),('Agendada');
GO
SELECT * FROM SITUACAO

-- CONSULTA
INSERT INTO CONSULTA(idMedico,idPaciente,idSituacao,data_hora,descricao)
VALUES
(3,7,1,'20-01-2020 15:00','Remédio'),(2,2,2,'06-01-2020 10:00',NULL),(2,3,1,'07-02-2020 11:00','Precisa de uma nova consulta'),
(2,2,2,'06-02-2018 10:00','Remédio'),(3,4,3,'07-02-2019 11:00',NULL),
(1,7,3,'08-03-2020 15:00',NULL),(3,4,3,'03-09-2020 11:00',NULL);
GO
SELECT * FROM CONSULTA