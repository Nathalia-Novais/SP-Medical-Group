import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assents/css/tela_adm.css';
import { Link } from 'react-router-dom';
import Logo from '../../assents/imagem/logo.png'
import iconeAdm from '../../assents/imagem/adm-icone.png'
import medicos from '../../assents/imagem/medicos.png'
import Imglista from '../../assents/imagem/imagem-lista.png'

export default function AdmListar() {

    const [ListarConsultas, setListarConsultas] = useState([]);

    function Consultas() {
        axios('http://192.168.0.109:5000/api/Consultas', {
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
                            <img src={iconeAdm} alt="" />
                            <a>Área Do Adm</a>
                            <Link to="/"> <a className="sair" href="">Sair</a></Link>
                        </nav>
                    </div>
                </header>
            </div>

            <main >
                <div className="titulo-e-imagem">
                    <div className="titulo-linha">
                        <h1 className="nome">Listagem</h1>
                        <div className="linha"></div>

                        <div className="titulo-linha-2">
                            <h1>Consultas</h1>
                            <div className="linha"></div>
                        </div>

                    </div>

                    <div className="medico-botao">
                        <img src={medicos} alt="" />
                        <Link to="/cadastroadm"><button className="btn">Nova Consultas</button></Link>
                    </div>

                </div>

                {
                    ListarConsultas.map((consulta) => {
                        return (
                            <div className="juntar" key={consulta.idPaciente}>
                                <div className="section-lista">

                                    <section className="lista">
                                        <ul>
                                        <li>Paciente: {consulta.idPacienteNavigation.nomePaciente}</li>
                                        <li>Médico: {consulta.idMedicoNavigation.nomeMedico} </li>
                                        <li>Especialidade: {consulta.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</li>
                                        <li>Data/Hora: { Intl.DateTimeFormat("pt-BR", {
                                                    year: 'numeric', month: 'numeric', day: 'numeric',
                                                    hour: 'numeric', minute: 'numeric', hour12: true
                                                }).format(new Date(consulta.dataHora)) }</li>
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