using senai.MedicalGroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.MedicalGroup.webApi.Interfaces
{
    interface IPacienteRepository
    {
        List<Paciente> Listar();

        Paciente BuscarPorId(int idPaciente);

        void Cadastrar(Paciente novoPaciente);

        void Atualizar(short idPaciente, Paciente PacienteAtualizado);

        void Deletar(int idPaciente);
    }
}
