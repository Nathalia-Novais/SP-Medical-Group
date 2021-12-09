using System;
using System.Collections.Generic;

#nullable disable

namespace senai.MedicalGroup.webApi.Domains
{
    public partial class Consulta
    {
        public short IdConsulta { get; set; }
        public short? IdMedico { get; set; }
        public short? IdPaciente { get; set; }
        public short? IdSituacao { get; set; }
        public DateTime DataHora { get; set; }
        public string Descricao { get; set; }

        public virtual Medico IdMedicoNavigation { get; set; }
        public virtual Paciente IdPacienteNavigation { get; set; }
        public virtual Situacao IdSituacaoNavigation { get; set; }
    }
}
