using Microsoft.EntityFrameworkCore;
using senai.MedicalGroup.webApi.Context;
using senai.MedicalGroup.webApi.Domains;
using senai.MedicalGroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.MedicalGroup.webApi.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        SpMedicalContex ctx = new();

        public void Atualizar(short idPaciente, Paciente PacienteAtualizado)
        {
            Paciente pacienteBuscado = ctx.Pacientes.Find(idPaciente);

            if (PacienteAtualizado != null)
            {
                pacienteBuscado.NomePaciente = PacienteAtualizado.NomePaciente;
                pacienteBuscado.DataNascimento = PacienteAtualizado.DataNascimento;
                pacienteBuscado.Telefone = PacienteAtualizado.Telefone;
                pacienteBuscado.Rg = PacienteAtualizado.Rg;
                pacienteBuscado.Cpf = PacienteAtualizado.Cpf;
                pacienteBuscado.Endereco = PacienteAtualizado.Endereco;
          

                ctx.Pacientes.Update(pacienteBuscado);

                ctx.SaveChanges();
            }
        }

        public Paciente BuscarPorId(int idPaciente)
        {
            return ctx.Pacientes.FirstOrDefault(p => p.IdPaciente == idPaciente);
        }

        public void Cadastrar(Paciente novoPaciente)
        {
            ctx.Pacientes.Add(novoPaciente);

            ctx.SaveChanges();
        }

        public void Deletar(int idPaciente)
        {
            ctx.Pacientes.Remove(BuscarPorId(idPaciente));

            ctx.SaveChanges();
        }

        public List<Paciente> Listar()
        {
            return ctx.Pacientes.ToList();
        }
    }
}
