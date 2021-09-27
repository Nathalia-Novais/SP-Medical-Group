using senai.MedicalGroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.MedicalGroup.webApi.Interfaces
{
    interface IPacienteRepository
    {
        List<Consulta> ListarMinhas(int idUsuario);
    }
}
