
import React, { Component } from "react";
import axios from "axios";
import '../../src/assents/css/login.css'


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
        }
      })

      .catch(() => {
        this.setState({
          erroMensagem: 'E-mail ou senha inválidos',
          isLoading: false,
        });
      });

  }
  atualizaState = (campo) => {
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
                <img src="imagem/logo_spmedgroup_v2 1.png" className="icone-login" alt="logo do Sp Medical Group" />
              </div>
              <form onSubmit={() => this.efetualogin()} >
                <div className="item">
                  <input
                    value={this.state.email}
                    onChange={() => this.atualizaState()}
                    className="input-login" placeholder="E-mail" type="text" name="username" id="login-email" />
                </div>
                <div className="item">
                  <input value={this.state.email}
                    onChange={() => this.atualizaState()}
                    className="input-login" placeholder="Senha" type="password" name="password" id="login-password" />
                </div>
                <div className="item">
                  <button className="btn btn-login" id="btn-login"> Login </button>
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





