using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai.MedicalGroup.webApi.Domains;
using senai.MedicalGroup.webApi.Interfaces;
using senai.MedicalGroup.webApi.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace senai.MedicalGroup.webApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class PacientesController : ControllerBase
    {
        private IPacienteRepository _pacienteRepository { get; set; }

        public PacientesController()
        {
            _pacienteRepository = new PacienteRepository();
        }

       
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(_pacienteRepository.Listar());
        }

        [HttpGet("{idPaciente}")]
        public IActionResult BuscarPorId(int idPaciente)
        {
            return Ok(_pacienteRepository.BuscarPorId(idPaciente));
        }

        [HttpPost]
        public IActionResult Cadastrar(Paciente novoPaciente)
        {
            _pacienteRepository.Cadastrar(novoPaciente);

            return StatusCode(201);
        }

        [HttpPut("{idPaciente}")]
        public IActionResult Atualizar(short idPaciente, Paciente PacienteAtualizado)
        {
            _pacienteRepository.Atualizar(idPaciente, PacienteAtualizado);

            return StatusCode(204);
        }

        [HttpDelete("{idPaciente}")]
        public IActionResult Deletar(int idPaciente)
        {
            _pacienteRepository.Deletar(idPaciente);

            return StatusCode(204);
        }
    }
}
