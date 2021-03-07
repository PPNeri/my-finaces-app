import React from 'react';
import Card from '../Components/card';
import FormGroup from '../Components/form-group';
import { withRouter } from 'react-router-dom';

import { AuthContext } from '../Main/provedorAutenticacao'


import axios from 'axios'
import UsuarioService from '../app/service/usuarioService';
import LocalStorageService from '../app/service/localStorageService';
import { mensagemErro } from '../Components/toastr'

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            // LocalStorageService.adicinoarItem('_usuario_logado', response.data);
            this.context.iniciarSessao(response.data);
            this.props.history.push('home')
        }).catch(erro => {
            mensagemErro(erro.response.data)
        })

    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
    }


    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email" onChange={(e) => this.setState({ email: e.target.value })} value={this.state.email} className="form-control"
                                                    id="exampleInputEmail1" aria-describedby="emailHelp"
                                                    placeholder="Digite o Email"></input>
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input value={this.state.senha} type="password" className="form-control"
                                                    id="exampleInputPassword1" onChange={(e) => this.setState({ senha: e.target.value })}
                                                    placeholder="Password"></input>
                                            </FormGroup>
                                            <button onClick={this.entrar} type="button" className="btn btn-success"><i className="pi pi-sign-in"></i> Entrar</button>
                                            <button onClick={this.prepareCadastrar} type="button" className="btn btn-danger"><i className="pi pi-user"></i> Cadastrar</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext;

export default withRouter(Login);//Decorator para poder navegar para outros componentes