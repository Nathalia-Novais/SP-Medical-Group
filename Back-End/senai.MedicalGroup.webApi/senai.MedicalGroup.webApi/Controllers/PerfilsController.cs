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
    [Route("api/[controller]")]
    [ApiController]
    public class PerfilsController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }

        public PerfilsController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [HttpPost("imagem")]
        public IActionResult PostarDir(IFormFile arquivo)
        {
            try
            {
                //Analisa se tamanho do arquivo é maior que 5MB
                if (arquivo.Length > 5000000)
                {
                    return BadRequest(new { mensagem = "O tamanho máximo da imagem é de 5MB!" });
                }

                string extensao = arquivo.FileName.Split('.').Last();
                if (extensao != "png" && extensao != "jpg")
                {
                    return BadRequest(new { mensagem = "Apenas arquivos .png ou .jpg são permitidos!" });
                }

                int IdUsuario = Convert.ToInt32(HttpContext.User.Claims.First(u => u.Type == JwtRegisteredClaimNames.Jti).Value);

                string resposta = _usuarioRepository.SalvarPerfilDir(arquivo, IdUsuario);

                if (resposta == null)
                {
                    return BadRequest("Não foi possível salvar a imagem!");
                }


                return Ok();

            }
            catch (Exception erro)
            {

                return BadRequest(erro.Message);
            }

        }


        [HttpGet]
        public IActionResult getDIR()
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                string base64 = _usuarioRepository.ConsultarPerfilDir(idUsuario);

                return Ok(base64);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
