using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public IActionResult ListarMinhas()
        {
            try
            {
                int idPaciente = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(_pacienteRepository.ListarMinhas(idPaciente));
            }
            catch (Exception error)
            {
                return BadRequest(new
                {
                    mensagem = "Não é possível mostrar as presenças se o usuário não estiver logado!",
                    error
                });
            }
        }
    }
}
