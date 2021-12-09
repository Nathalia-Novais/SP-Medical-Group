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
    public class MedicosController : ControllerBase
    {
        private IMedicoRepository _medicoRepository { get; set; }
        
        public MedicosController()
        {
            _medicoRepository = new MedicoRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(_medicoRepository.Listar());
        }

        [HttpGet("{idMedico}")]
        public IActionResult BuscarPorId(int idMedico)
        {
            return Ok(_medicoRepository.BuscarPorId(idMedico));
        }

        [HttpPost]
        public IActionResult Cadastrar(Medico novaMedico)
        {
            _medicoRepository.Cadastrar(novaMedico);

            return StatusCode(201);
        }

        [HttpPut("{idMedico}")]
        public IActionResult Atualizar(short idMedico, Medico MedicoAtualizado)
        {
            _medicoRepository.Atualizar(idMedico, MedicoAtualizado);

            return StatusCode(204);
        }

        [HttpDelete("{idMedico}")]
        public IActionResult Deletar(int idMedico)
        {
            _medicoRepository.Deletar(idMedico);

            return StatusCode(204);
        }
    }

}
