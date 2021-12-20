import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assents/css/tela_medico.css';
import { Link } from 'react-router-dom';
import Logo from '../../assents/imagem/logo.png'
import iconeMedico from '../../assents/imagem/medico-icone.png'
import medicos from '../../assents/imagem/medicos.png'
import Imglista from '../../assents/imagem/imagem-lista.png'

export default function MeicoListar() {

    const [ListarConsultas, setListarConsultas] = useState([]);
    const [idConsulta, setIdConsulta] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function Consultas() {
        axios('http://192.168.0.109:5000/api/Consultas/medico', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setListarConsultas(response.data);
                }

            }).catch(erro => console.log(erro));

    };
    

    function Alterardescricao(evento) {
        setIsLoading(true);

        evento.preventDefault()

        axios
            .patch('http://192.168.0.109:5000/api/Consultas/prontuario/' + idConsulta, {
                Descricao: descricao

            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
            .then(resposta => {

                if (resposta.status === 200) {
                    Consultas();
                    setIsLoading(false);
                }
            })
            .catch(erro => console.log(erro), setInterval(() => {
                setIsLoading(false)
            }, 5000));
    }

   


    useEffect(Consultas, []);



    return (
        <div>
            <body className="cor-body">
                <div>
                    <header className="cabecalhoPrincipal">
                        <div className="container">
                            <div className="logo_e_letra">
                                <img src={Logo} alt="Logo Sp Medical group" />
                                <p>SP Medical Group</p>
                            </div>


                            <nav className="cabecalhoPrincipal-nav">
                                <img src={iconeMedico} alt="icone do medico" />
                                <a  className="cabecalhoPrincipal-a">Área Do Médico</a>
                                <Link to="/"> <a className="sair" href="">Sair</a></Link>
                            </nav>
                        </div>
                    </header>
                </div>

                <main>
                    <div className="titulo-e-imagem">
                        <div className="titulo-linha">
                            <h1 className="nome">Listagem</h1>
                            <hr className="linha"></hr>

                            <div className="titulo-linha-2">
                                <h1> Minhas Consultas</h1>
                                <hr className="linha"></hr>
                            </div>

                        </div>

                        <div className="medico-botao">
                            <img src={medicos} alt="" />                         </div>

                    </div>
                            <form className="prontuario" onSubmit={Alterardescricao}>
                                <h3 className="h3">Alterar Prontuário</h3>
                                <div className="inputs-select">
                                <div className="div-consulta-label" >
                                    <label className="consulta-label" >Consulta</label>
                                    <select
                                        name="consulta"
                                        id="consulta"
                                        value={idConsulta}
                                        onChange={(campo) => setIdConsulta(campo.target.value)}
                                    >
                                        <option value='0'>Selecione a Consulta</option>

                                        {ListarConsultas.map((consulta) => {
                                            return (
                                                <option key={consulta.idConsulta} value={consulta.idConsulta}>
                                                    {consulta.idPacienteNavigation.nomePaciente}/Data:{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: true
                                                }).format(new Date(consulta.dataHora))}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div  className="div-label-descricao">
                                    <label className="label-descricao">Descrição</label>
                                    <input
                                        className="descricao"
                                        type="text" 
                                        name="descricao"
                                        value={descricao}
                                        onChange={(campo) => setDescricao(campo.target.value)}
                                    />
                                </div>
                                </div>
                                {isLoading && (
                                    <button disabled className='btn-form-prontaurio' type = 'submit'>
                                        Carregando...
                                    </button>
                                )}
                                {!isLoading &&(
                                    <button className='btn-form-prontaurio' type='submit'>
                                        Alterar
                                    </button>
                                )}
                            </form>
                {
                        ListarConsultas.map((consulta) => {

                            return (
                                <div className="juntar" key={consulta.idConsulta}>

                                    <div className="section-lista">

                                        <section className="lista">
                                            <ul>
                                                <li>Paciente: {consulta.idPacienteNavigation.nomePaciente}</li>
                                                <li>Médico: {consulta.idMedicoNavigation.nomeMedico} </li>
                                                <li>Especialidade: {consulta.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</li>
                                                <li>Data/Hora: {Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: true
                                                }).format(new Date(consulta.dataHora))}</li>
                                                <li>Descrição: {consulta.descricao}</li>
                                                <li>Situação: {consulta.idSituacaoNavigation.tipoSituacao}</li>

                                            </ul>
                                            <img className="imagem" src={Imglista} alt="imagem de um estetoscópio" />

                                        </section>


                                    </div>
                                    <div className="div-separar">
                                        <img className="separar-img" src={Logo} alt="Logo Sp Medical group" />
                                    </div>

                                </div>
                            )
                        })
                    }


                </main>


                <footer>
                    <img src={Logo} alt="Logo Sp Medical group" />
                    <p>SP Medical Group</p>
                </footer>

            </body>


        </div>)

}


