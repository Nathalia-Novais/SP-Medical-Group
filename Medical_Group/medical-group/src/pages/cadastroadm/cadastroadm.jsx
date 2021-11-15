import { React, Component } from 'react';
import axios from 'axios';
import '../../assents/css/consuta_cadastro.css';
import Logo from '../../assents/imagem/logo.png'
import iconeAdm from '../../assents/imagem/adm-icone.png'
import prancheta from '../../assents/imagem/alternativa.png'
import { Link } from 'react-router-dom';


export default class cadastrar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nomePaciente: '',
            nomeMedico: '',
            dataConsulta: new Date(),
            situacao: 'Agendada',
            listaPacientes: [],
            listaMedicos: [],
            isLoading: false,
        };
    }


    cadastrarConsulta = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });

        let consulta = {
            nomePaciente: this.state.nomePaciente,
            nomeMedico: this.state.nomeMedico,
            dataConsulta: new Date(this.state.dataConsulta),
            situacao: 'Agendada'
        };

        axios.post('http://localhost:5000/api/Consultas', consulta, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {
                console.log(resposta)
                if (resposta.status === 201) {
                    this.setState({ isLoading: false });
                }
            })
            .catch((erro) => {
                console.log(erro);
                this.setState({ isLoading: false });
            })

    };

    atualizaStateCampo = (campo) => {
        this.setState({ [campo.target.name]: campo.target.value });
    };





    render() {
        return (
            <div>

                <body className="cor-body-c">
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

                    <main>
                        <div className="titulo-e-imagem-c">
                            <div className="btn-hr-c">
                                <div className="titulo-linha-c">
                                    <h1 className="nome-c">Nova Consulta</h1>
                                    <hr className="linha-c" />
                                </div>
                                <div className="div-btn-c">
                                    <Link to="/admlistar"><button className="btn-c">Listar Consultas</button> </Link>
                                </div>

                            </div>
                            <div className="medico-botao-c">
                                <img src={prancheta} alt="" />
                            </div>
                        </div>

                        <div className="form-cadastro-c">
                            <h2>Cadastro</h2>
                            <section className="formulario-c">
                                <form onSubmit={this.cadastrarConsulta} >

                                    <input type="text"
                                        placeholder="Paciente:"
                                        required
                                        value={this.state.nomePaciente}
                                        onChange={this.atualizaStateCampo}
                                        name="nomePaciente"
                                    />
                                    <input type="text"
                                        placeholder="Médico:"
                                        value={this.state.nomeMedico}
                                        onChange={this.atualizaStateCampo}
                                        name="nomeMedico"
                                        required />

                                    <input type="text"
                                        placeholder="Situação:"
                                        value={this.state.situacao}
                                        onChange={this.atualizaStateCampo} />
                                    <input type="datetime" placeholder="Data/Hora:" required />

                                    {this.state.isLoading && (
                                        <button type="submit" disabled>
                                            Loading...{' '}
                                        </button>
                                    )}

                                    {this.state.isLoading === false && (
                                   <div className="btn-cadastro-c">
                                   <input type="submit" value="Cadastrar" />
                               </div>

                                    )}



                                    {/* <div className="btn-cadastro-c">
                                        <input type="submit" value="Cadastrar" />
                                    </div> */}
                                </form>
                            </section>
                        </div>


                    </main>


                    <footer>
                        <img src={Logo} alt="Logo Sp Medical group" />
                        <p>SP Medical Group</p>
                    </footer>


                </body>

            </div>
        )
    }
}