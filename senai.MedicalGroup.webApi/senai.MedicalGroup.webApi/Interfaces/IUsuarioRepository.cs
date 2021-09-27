using Microsoft.AspNetCore.Http;
using senai.MedicalGroup.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.MedicalGroup.webApi.Interfaces
{
    interface IUsuarioRepository
    {
        List<Usuario> Listar();

        Usuario BuscarPorId(int idUsuario);

        void Cadastrar(Usuario novoUsuario);

        void Atualizar(short idUsuario, Usuario UsuarioAtualizado);

        void Deletar(int idUsuario);

        Usuario Login(string email, string senha);

        string SalvarPerfilDir(IFormFile foto, int id_usuario);

        string ConsultarPerfilDir(int id_usuario);
    }
}
