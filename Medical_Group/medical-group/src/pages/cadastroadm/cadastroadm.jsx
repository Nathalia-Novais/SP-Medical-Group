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
            IdPaciente: 0,
            IdMedico: 0,
            DataHora: new Date(),
            situacao: '',
            listaPacientes: [],
            listaMedicos: [],
            isLoading: false,
        };
    }


    cadastrarConsulta = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });

        let consulta = {
            IdPaciente: this.state.IdPaciente,
            IdMedico: this.state.IdMedico,
            DataHora: new Date(this.state.DataHora),
            IdSituacao: 3
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
                    this.props.history.push('/admlistar')
                }
            })
            .catch((erro) => {
                console.log(erro);
                this.setState({ isLoading: false });
            })

    };

    atualizaStateCampo = (campo) => {
        console.log(campo.target.name)
        console.log(campo.target.value)
        this.setState({ [campo.target.name]: campo.target.value });
    };


    PacienteLista = () => {

        axios('http://localhost:5000/api/Pacientes', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {

                if (resposta.status === 200) {

                    this.setState({ listaPacientes: resposta.data });
                    console.log(this.state.listaPacientes);
                }
            })

            .catch((erro) => console.log(erro));

    };



    MedicosLista = () => {

        axios('http://localhost:5000/api/Medicos', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            },
        })
            .then((resposta) => {

                if (resposta.status === 200) {

                    this.setState({ listaMedicos: resposta.data });
                    console.log(this.state.listaMedicos);
                }
            })

            .catch((erro) => console.log(erro));
    };



    componentDidMount(){
        this.PacienteLista();
        this.MedicosLista();  
    }



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

                                    <select
                                        required
                                        value={this.state.IdPaciente}
                                        
                                        onChange={this.atualizaStateCampo}
                                        name="IdPaciente"
                                    >

                                        <option value="0">Selecione o Paciente.</option>


                                        {this.state.listaPacientes.map((p) => {

                                            return (
                                                <option key={p.idPaciente} value={p.idPaciente}>
                                                    {p.nomePaciente}
                                                </option>
                                            );
                                        })}

                                    </select>
                                    <select 

                                        value={this.state.IdMedico}
                                        
                                        onChange={this.atualizaStateCampo}
                                        name="IdMedico"
                                        required >

                                        <option value="0">Selecione o Médico.</option>


                                        {this.state.listaMedicos.map((p) => {                                          
                                            return (
                                                
                                                <option key={p.idMedico} value={p.idMedico}>
                                                    {p.nomeMedico}
                                                </option>
                                            );
                                        })} 

                                    </select>


                                    <input type="Date" placeholder="Data:"
                                     name="DataHora" value={this.DataHora}  
                                     onChange={this.atualizaStateCampo}  required />

                                    {this.state.isLoading === true && (
                                        <button type="submit" disabled>
                                            Loading...{' '}
                                        </button>
                                    )}

                                    {this.state.isLoading === false && (
                                        <div className="btn-cadastro-c">
                                            <input type="submit" value="Cadastrar" />                                             
                                        </div>
                                    )}

            
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