import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assents/css/tela_adm.css';
import { Link } from 'react-router-dom';
import Logo from '../../assents/imagem/logo.png'
import iconeMedico from '../../assents/imagem/medico-icone.png'
import medicos from '../../assents/imagem/medicos.png'
import Imglista from '../../assents/imagem/imagem-lista.png'

export default function MeicoListar() {

    const [ListarConsultas, setListarConsultas] = useState([]);

    function Consultas() {
        axios('http://localhost:5000/api/Consultas/medico', {
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

    useEffect(Consultas, []);

    // function mudardescricao(event) {
    //     setIsLoading(true);

    //     evento.preventDefault()

    //     axios
    //         .patch('http://spmedgroup-kaue.azurewebsites.net/api/consultas/descricao/' + idConsulta, {


    //         }, {
    //             headers: {
    //                 'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
    //             }
    //         })
    //         .then(resposta => {
    //             if (resposta.status === 201) {
    //                 console.log('Consulta cadastrada');

    //                 listarConsultas();
    //                 setIsLoading(false);
    //             }
    //         })
    //         .catch(erro => console.log(erro), setInterval(() => {
    //             setIsLoading(false)
    //         }, 5000));
    // }

    return (
        <div>
            <body className="cor-body">
                <div>
                    <header class="cabecalhoPrincipal">
                        <div class="container">
                            <div class="logo_e_letra">
                                <img src={Logo} alt="Logo Sp Medical group" />
                                <p>SP Medical Group</p>
                            </div>


                            <nav class="cabecalhoPrincipal-nav">
                                <img src={iconeMedico} alt="icone do medico" />
                                <a>Área Do Médico</a>
                                <Link to="/"> <a className="sair" href="">Sair</a></Link>
                            </nav>
                        </div>
                    </header>
                </div>

                <main>
                    <div class="titulo-e-imagem">
                        <div class="titulo-linha">
                            <h1 class="nome">Listagem</h1>
                            <hr class="linha"></hr>

                            <div class="titulo-linha-2">
                                <h1> Minhas Consultas</h1>
                                <hr class="linha"></hr>
                            </div>

                        </div>

                        <div class="medico-botao">
                            <img src={medicos} alt="" />
                        </div>

                    </div>

                    {
                        ListarConsultas.map((consulta) => {

                            return (
                                <div className="juntar" key={consulta.idPaciente}>
                                    <div className="section-lista">
                                    <button>Atualizar</button>
                                     <section className="lista">
                                            <ul>


                                                <li>Paciente: {consulta.idPacienteNavigation.nomePaciente}</li>
                                                <li>Médico: {consulta.idMedicoNavigation.nomeMedico} </li>
                                                <li>Especialidade:{consulta.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</li>
                                                <li>Data/Hora:{Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: true
                                                }).format(new Date(consulta.dataHora))}</li>
                                                <li>Descrição:{consulta.descricao}</li>
                                                <li>Situação:{consulta.idSituacaoNavigation.tipoSituacao}</li>

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