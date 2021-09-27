using senai.MedicalGroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.MedicalGroup.webApi.Interfaces
{
    interface IMedicoRepository
    {
        //Mudar A Descrição da consulta
        void descricao(int idConsulta, string statusP);


        List<Consulta> ListarMinhas(int idUsuario);
    }
}
