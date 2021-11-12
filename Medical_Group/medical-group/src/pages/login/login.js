
import React, { Component } from "react";
import axios from "axios";
import { parseJwt, usuarioAutenticado } from '../../services/auth';

import '../../assents/css/login.css'
import Logo from '../../assents/imagem/logo.png'


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      erroMensagem: '',
      isLoading: false,
    };
  }

  efetualogin = (event) => {
    event.preventDefault()
    this.setState({ erroMensagem: '', isLoading: true });

    axios.post('http://localhost:5000/api/Login', {
      email: this.state.email,
      senha: this.state.senha,
    })

      .then((resposta) => {
        if (resposta.status === 201) {

          localStorage.setItem('usuario-login', resposta.data.token);
          this.setState({ isLoading: false })

          let base64 = localStorage.getItem('usuario-login').split('.')[1];

          console.log(base64)

          if (parseJwt().role === '1') {

            this.props.history.push('/admlistar');
            console.log('estou logado: ' + usuarioAutenticado());
          } else if(parseJwt().role === '2'){
            this.props.history.push('/medicolistar');
          } else {
            this.props.history.push('/usuariolistar');
          }
        }
      })

      .catch(() => {
        this.setState({
          erroMensagem: 'E-mail ou senha inválidos',
          isLoading: false,
        });
      });

  }

  atualizaStateCampo = (campo) => {
    this.setState({ [campo.target.name]: campo.target.value });
  };


  render() {
    return (
      <div>
        <section className="container-login flex">
          <div className="img-login">
            <div className="img-overlay"></div>
          </div>

          <div className="item-login">
            <div className="retangulo1"></div>
            <div className="row">
              <div className="item">
                <img src={Logo} className="icone-login" alt="logo do Sp Medical Group" />
              </div>
              <form onSubmit={this.efetualogin} >
                <div className="item">
                  <input
                    value={this.state.email}
                    onChange={this.atualizaStateCampo}
                    className="input-login" placeholder="E-mail" type="text" name="username" id="login-email" />
                </div>
                <div className="item">
                  <input
                    value={this.state.email}
                    onChange={this.atualizaStateCampo}
                    className="input-login" placeholder="Senha" type="password" name="password" id="login-password" />
                </div>
                <div className="item">
                  <p style={{ color: 'red' }}>{this.state.erroMensagem}</p>
                  {this.state.isLoading === true && (<button className="btn btn-login" id="btn-login"> Loading </button>)}
                  {this.state.isLoading === false && (<button className="btn btn-login" id="btn-login"
                    disabled={
                      this.state.email === '' || this.state.senha === ''
                        ? 'none'
                        : ''
                     }
                    > Login </button>)}

                </div>
              </form>
            </div>

            <div className="retangulo2"></div>
          </div>
        </section>
      </div >
    )
  }
}

export default Login





