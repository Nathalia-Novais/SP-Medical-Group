using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using senai.MedicalGroup.webApi.Context;
using senai.MedicalGroup.webApi.Domains;
using senai.MedicalGroup.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace senai.MedicalGroup.webApi.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        SpMedicalContex ctx = new();

        public void Atualizar(short idUsuario, Usuario UsuarioAtualizado)
        {
            Usuario UsuarioBuscado = ctx.Usuarios.Find(idUsuario);

            if (UsuarioAtualizado.Email != null && UsuarioAtualizado.Senha != null)
            {
                UsuarioBuscado.Email = UsuarioAtualizado.Email;
                UsuarioBuscado.Senha = UsuarioAtualizado.Senha;

                ctx.Usuarios.Update(UsuarioBuscado);

                ctx.SaveChanges();
            }

        }

        public Usuario BuscarPorId(int idUsuario)
        {
            return ctx.Usuarios.FirstOrDefault(p => p.IdUsuario == idUsuario);
        }

        public void Cadastrar(Usuario novoUsuario)
        {
            ctx.Usuarios.Add(novoUsuario);

            ctx.SaveChanges();
        }

        public string ConsultarPerfilDir(int id_usuario)
        {
            string nome = id_usuario.ToString() + ".png";

            string caminho = Path.Combine("Perfil", nome);

            if (File.Exists(caminho))
            {
                byte[] bytesArquivo = File.ReadAllBytes(caminho);

                return Convert.ToBase64String(bytesArquivo);
            }

            return null;
        }

        public void Deletar(int idUsuario)
        {
            ctx.Usuarios.Remove(BuscarPorId(idUsuario));

            ctx.SaveChanges();
        }

        public List<Usuario> Listar()
        {
            return ctx.Usuarios.Include(u => u.IdTipoUsuarioNavigation).ToList();
        }

        public Usuario Login(string email, string senha)
        {
            return ctx.Usuarios.FirstOrDefault(U => U.Email == email && U.Senha == senha);
        }

        public string SalvarPerfilDir (IFormFile foto, int id_usuario)
        {
            string arquivo = foto.FileName.Split('.').Last();

            if (arquivo == "png")
            {
                string nome = id_usuario.ToString() + ".png";

                using (var strem = new FileStream(Path.Combine("Perfil", nome), FileMode.Create))
                {
                    foto.CopyTo(strem);
                }

                return " imagem salva! ";
            }

            if (arquivo == "jpg")
            {
                string nome = id_usuario.ToString() + ".jpg";

                using (var strem = new FileStream(Path.Combine("Perfil", nome), FileMode.Create))
                {
                    foto.CopyTo(strem);
                }

                return "imagem salva! ";
            }

            return null;
        }

    }
}
