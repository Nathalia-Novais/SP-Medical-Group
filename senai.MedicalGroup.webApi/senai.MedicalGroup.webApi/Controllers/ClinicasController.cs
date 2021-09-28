using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai.MedicalGroup.webApi.Domains;
using senai.MedicalGroup.webApi.Interfaces;
using senai.MedicalGroup.webApi.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.MedicalGroup.webApi.Controllers
{
    [Produces("application/json")]

    [Route("api/[controller]")]

    [ApiController]
    public class ClinicasController : ControllerBase
    {
        private IClinicaRepository _clinicaRepository { get; set; }

        public ClinicasController()
        {
            _clinicaRepository = new ClinicaRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(_clinicaRepository.Listar());
        }

        [HttpGet("{idClinica}")]
        public IActionResult BuscarPorId(int idClinica)
        {
            return Ok(_clinicaRepository.BuscarPorId(idClinica));
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Cadastrar(Clinica novaClinica)
        {
            _clinicaRepository.Cadastrar(novaClinica);

            return StatusCode(201);
        }

        [Authorize(Roles = "1")]
        [HttpPut("{idClinica}")]
        public IActionResult Atualizar(short idClinica, Clinica ClinicaAtualizada)
        {
            _clinicaRepository.Atualizar(idClinica, ClinicaAtualizada);

            return StatusCode(204);
        }

        [Authorize(Roles = "1")]
        [HttpDelete("{idClinica}")]
        public IActionResult Deletar(int idClinica)
        {
            _clinicaRepository.Deletar(idClinica);

            return StatusCode(204);
        }
    }
}
