using senai.MedicalGroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.MedicalGroup.webApi.Interfaces
{
    interface IConsultaRepository
    {
        List<Consulta> Listar();

        Consulta BuscarPorId(int idConsulta);

        void Cadastrar(Consulta novaConsulta);

        void Atualizar(short idConsulta, Consulta ConsultaAtualizada);

        void Deletar(int idConsulta);

       

        /// <summary>
        /// Mudar a situação da consulta
        /// </summary>
        /// <param name="idConsulta">id da consulta que será mudado </param>
        /// <param name="status">o status que será mudado</param>
        void Agendamento(int idConsulta, string status);

        void Descricao(short idConsulta, Consulta statusP);

        /// <summary>
        /// Listar Todas as consultas de um médico
        /// </summary>
        /// <param name="idUsuario">id do Usuario que está logado</param>
        /// <returns></returns>
        List<Consulta> ListarM(int idUsuario);

        /// <summary>
        /// Listar Todas as consultas de um paciente
        /// </summary>
        /// <param name="idUsuario">id do Usuario que está logado</param>
        /// <returns></returns>
        List<Consulta> ListarP(int idUsuario);

    }
}
