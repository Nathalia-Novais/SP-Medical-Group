using MongoDB.Driver;
using senai.MedicalGroup.webApi.Domains;
using senai.MedicalGroup.webApi.Interfaces;
using System.Collections.Generic;

namespace senai.MedicalGroup.webApi.Repositories
{
    public class LocalizacaoRepository : ILocalizacaoRepository
    {

        private readonly IMongoCollection<Localizacao> _localizacoes;

        public LocalizacaoRepository()
        {
            var Client = new MongoClient("mongodb://localhost:27017");
            var database = Client.GetDatabase("SpMedical");
            _localizacoes = database.GetCollection<Localizacao>("mapas");
        }
        public void Cadastrar(Localizacao novalocalizacao)
        {
           _localizacoes.InsertOne(novalocalizacao);
        }

        public List<Localizacao> ListarTodas()
        {
            return _localizacoes.Find(localizacao => true).ToList();
        }
    }
}
