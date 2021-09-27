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

        public List<Consulta> ListarMinhas(int idPaciente)
        {
            return ctx.Consulta.Include(p => p.IdPacienteNavigation.IdUsuarioNavigation.IdTipoUsuarioNavigation)
                .Where(p => p.IdPaciente == idPaciente)
                .ToList();
        }
    }
}
