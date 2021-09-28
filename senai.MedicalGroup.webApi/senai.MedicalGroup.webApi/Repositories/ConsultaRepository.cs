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
    public class ConsultaRepository : IConsultaRepository
    {
        SpMedicalContex ctx = new();

        public void Agendamento(int idConsulta, string status)
        {
            Consulta consultaBuscada = ctx.Consulta.FirstOrDefault(c => c.IdConsulta == idConsulta);

            switch (status)
            {
                case "1":
                    consultaBuscada.IdSituacao = 1;
                    break;

                case "2":
                    consultaBuscada.IdSituacao = 2;
                    break;

                case "3":
                    consultaBuscada.IdSituacao = 3;
                    break;

                default:
                    consultaBuscada.IdSituacao = consultaBuscada.IdSituacao;
                    break;
            }

            ctx.Consulta.Update(consultaBuscada);

            ctx.SaveChanges();
        } 

        public void Atualizar(short idConsulta, Consulta ConsultaAtualizada)
        {
            Consulta consultaBuscada = ctx.Consulta.Find(idConsulta);

            if (ConsultaAtualizada != null)
            {
                consultaBuscada.IdMedico = ConsultaAtualizada.IdMedico;
                consultaBuscada.IdPaciente = ConsultaAtualizada.IdPaciente;
                consultaBuscada.IdSituacao = ConsultaAtualizada.IdSituacao;
                consultaBuscada.DataHora = ConsultaAtualizada.DataHora;
                consultaBuscada.Descricao = ConsultaAtualizada.Descricao;

                ctx.Consulta.Update(consultaBuscada);

                ctx.SaveChanges();
            }
        }

        public Consulta BuscarPorId(int idConsulta)
        {
            return ctx.Consulta.FirstOrDefault(c => c.IdConsulta == idConsulta);
        }

        public void Cadastrar(Consulta novaConsulta)
        {
            ctx.Consulta.Add(novaConsulta);

            ctx.SaveChanges();
        }

        public void Deletar(int idConsulta)
        {
            ctx.Consulta.Remove(BuscarPorId(idConsulta));

            ctx.SaveChanges();
        }

        public void Descricao(short idConsulta, Consulta statusP)
        {
            Consulta consultaBuscada = BuscarPorId(idConsulta);

            if (consultaBuscada != null)
            {
                if (consultaBuscada.Descricao != null)
                {
                    consultaBuscada.Descricao = statusP.Descricao;

                    ctx.Consulta.Update(consultaBuscada);

                    ctx.SaveChanges();
                }

            }

        }


        public List<Consulta> Listar()
        {
               return ctx.Consulta.Include(c => c.IdPacienteNavigation)
              .Include(c => c.IdMedicoNavigation.IdEspecialidadeNavigation).ToList();

           // return ctx.Consulta.ToList();


        }

        public List<Consulta> ListarM(int idUsuario)
        {
            return ctx.Consulta.Include(c => c.IdMedicoNavigation.IdUsuarioNavigation)
              .Where(c => c.IdMedicoNavigation.IdUsuarioNavigation.IdUsuario == idUsuario)
              .ToList();

        }

        public List<Consulta> ListarP(int idUsuario)
        {
            return ctx.Consulta.Include(c => c.IdPacienteNavigation.IdUsuarioNavigation)
                .Where(c => c.IdPacienteNavigation.IdUsuarioNavigation.IdUsuario == idUsuario)
                .ToList();
        }
    }
}
