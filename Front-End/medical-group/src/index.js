import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { parseJwt, usuarioAutenticado } from './services/auth';

import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';

import Login from './pages/login/login';
import NotFound from './pages/notFound/NotFound';
import AdmListar from './pages/admlistar/admlistar';
import Paciente from './pages/pacientelistar/pacientelistar';
import Medico from './pages/medicolistar/medicolistar';
import CadastroAdm from './pages/cadastroadm/cadastroadm';

const PermissaoAdm = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '1' ? (
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const PermissaoM = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '2' ? (
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);
const PermissaoP = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '3' ? (
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);


const routing = (
  <Router>
    <div>
    <Switch>
     <Route exact path="/" component={Login} />
     <PermissaoAdm path="/admlistar" component={AdmListar} />
     <PermissaoP path="/pacientelistar" component={Paciente} />
     <PermissaoM path="/medicolistar" component={Medico} />
     <PermissaoAdm path="/cadastroadm" component={CadastroAdm} />
     <Route path="/notFound" component={NotFound} />
     <Redirect to="/notFound" />
    </Switch>
    </div>

  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
