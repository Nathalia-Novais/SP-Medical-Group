using senai.MedicalGroup.webApi.Context;
using senai.MedicalGroup.webApi.Domains;
using senai.MedicalGroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.MedicalGroup.webApi.Repositories
{
    public class ClinicaRepository : IClinicaRepository
    {
        SpMedicalContex ctx = new();

        public void Atualizar(short idClinica, Clinica ClinicaAtualizada)
        {
            Clinica clinicaBuscada = ctx.Clinicas.Find(idClinica);

            if (ClinicaAtualizada.NomeClinica != null)
            {
                clinicaBuscada.NomeClinica = ClinicaAtualizada.NomeClinica;
                clinicaBuscada.Cnpj = ClinicaAtualizada.Cnpj;
                clinicaBuscada.RazaoSocial = ClinicaAtualizada.RazaoSocial;
                clinicaBuscada.Endereco = ClinicaAtualizada.Endereco;

                ctx.Clinicas.Update(clinicaBuscada);

                ctx.SaveChanges();
            }
        }

        public Clinica BuscarPorId(int idClinica)
        {
            return ctx.Clinicas.FirstOrDefault(c => c.IdClinica == idClinica);
        }

        public void Cadastrar(Clinica novaClinica)
        {
            ctx.Clinicas.Add(novaClinica);

            ctx.SaveChanges();
        }

        public void Deletar(int idClinica)
        {
            ctx.Clinicas.Remove(BuscarPorId(idClinica));

            ctx.SaveChanges();
        }

        public List<Clinica> Listar()
        {
            return ctx.Clinicas.ToList();
        }
    }
}
