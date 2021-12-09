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
    public class ConsultasController : ControllerBase
    {
        
        private IConsultaRepository _consultaRepository { get; set; }

        public ConsultasController()
        {
            _consultaRepository = new ConsultaRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(_consultaRepository.Listar());
        }

        [HttpGet("{idConsulta}")]
        public IActionResult BuscarPorId(int idConsulta)
        {
            return Ok(_consultaRepository.BuscarPorId(idConsulta));
        }

        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Cadastrar(Consulta novaConsulta)
        {
            _consultaRepository.Cadastrar(novaConsulta);

            return StatusCode(201);
        }

        [Authorize(Roles = "1")]
        [HttpPut("{idConsulta}")]
        public IActionResult Atualizar(short idConsulta, Consulta ConsultaAtualizada)
        {
            _consultaRepository.Atualizar(idConsulta, ConsultaAtualizada);

            return StatusCode(204);
        }

        [Authorize(Roles = "1")]
        [HttpDelete("{idConsulta}")]
        public IActionResult Deletar(int idConsulta)
        {
            _consultaRepository.Deletar(idConsulta);

            return StatusCode(204);
        }

        [Authorize(Roles = "1")]
        [HttpPatch("{idConsulta}")]
        public IActionResult Agendamento(int idConsulta, Consulta status)
        {
            try
            {
                _consultaRepository.Agendamento(idConsulta, status.IdSituacao.ToString());

                return StatusCode(204);
            }
            catch (Exception error)
            {
                return BadRequest(error);
            }
        }

        [Authorize(Roles = "2")]
        [HttpPatch("prontuario/{idConsulta}")]
        public IActionResult Descricao(short idConsulta, Consulta statusP)
        {
            try
            {
                _consultaRepository.Descricao(idConsulta, statusP);

                return Ok();
            }
            catch (Exception erro)
            {

                return BadRequest(erro);
            }
        }

        [Authorize(Roles = "2")]
        [HttpGet("medico")]
        public IActionResult ListarM()
        {
            try
            {
                int idMedico = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                List<Consulta> lista = _consultaRepository.ListarM(idMedico);
                if (lista.Count == 0)
                {
                    
                    return BadRequest(new
                    {
                        Mensagem = "Esse Medico não tem consultas relacionada a ele "
                    });
                }

                return Ok(_consultaRepository.ListarM(idMedico));

            }
            catch (Exception erro)
            {

                return BadRequest(new
                { mensagem = "Não é possível visualizar as consultas se o usuário não estiver logado!",
                    erro 
                });
            }
        }

        [Authorize(Roles = "3")]
        [HttpGet("paciente")]
        public IActionResult ListarP()
        {

            try
            {
                int idPaciente = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                List<Consulta> lista = _consultaRepository.ListarP(idPaciente);
                if (lista.Count == 0)
                {
                    return BadRequest(new
                    {
                        Mensagem = "O paciente não tem consulta "
                    });
                }

                return Ok(lista);
            }
            catch (Exception erro)
            {

                return BadRequest(new
                {
                    mensagem = "Não é possível visualizar as consultas se o usuário não estiver logado!", erro
                });
            }
        }
    }
}

