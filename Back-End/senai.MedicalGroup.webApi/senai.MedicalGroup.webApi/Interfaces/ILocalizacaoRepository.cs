using senai.MedicalGroup.webApi.Domains;
using System.Collections.Generic;

namespace senai.MedicalGroup.webApi.Interfaces
{
    public interface ILocalizacaoRepository
    {
        List<Localizacao> ListarTodas();

        void Cadastrar (Localizacao novalocalizacao);   
    }
}
