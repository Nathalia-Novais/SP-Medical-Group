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
    public class MedicoRepository : IMedicoRepository
    {
        SpMedicalContex ctx = new();

        public void Atualizar(short idMedico, Medico MedicoAtualizado)
        {
            Medico medicoBuscado = ctx.Medicos.Find(idMedico);

            if (MedicoAtualizado != null)
            {
                medicoBuscado.IdEspecialidade = MedicoAtualizado.IdEspecialidade;
                medicoBuscado.IdClinica = MedicoAtualizado.IdClinica;
                medicoBuscado.Crm = MedicoAtualizado.Crm;
                medicoBuscado.NomeMedico = MedicoAtualizado.NomeMedico;

                ctx.Medicos.Update(medicoBuscado);

                ctx.SaveChanges();
            }
        }

        public Medico BuscarPorId(int idMedico)
        {
            return ctx.Medicos.FirstOrDefault(m => m.IdMedico == idMedico);
        }

        public void Cadastrar(Medico novoMedico)
        {
            ctx.Medicos.Add(novoMedico);

            ctx.SaveChanges();
        }

        public void Deletar(int idMedico)
        {
            ctx.Medicos.Remove(BuscarPorId(idMedico));

            ctx.SaveChanges();
        }

        public List<Medico> Listar()
        {
            return ctx.Medicos.Include(m => m.IdEspecialidadeNavigation).ToList();
        }
    }
}
