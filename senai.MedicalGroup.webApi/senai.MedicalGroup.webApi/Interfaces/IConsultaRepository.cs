﻿using senai.MedicalGroup.webApi.Domains;
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

        //Mudar a situação da consulta
        void Agendamento(int idConsulta, string status);

        void Descricao(short idConsulta, Consulta statusP);


    }
}