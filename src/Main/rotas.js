import React, { Component } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom'
import CadastroUsuario from '../Views/CadastroUsuario';
import Login from '../Views/login';
import Home from '../Views/home'
import ConsultaLancamentos from '../Views/lancamentos/consulta-lancamentos';

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos} />
            </Switch>
        </HashRouter>
    )
}
export default Rotas;