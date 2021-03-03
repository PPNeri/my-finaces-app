import React, { Component } from 'react';
import UsuarioService from '../app/service/usuarioService'

import { AuthContext } from '../Main/provedorAutenticacao'

class Home extends Component {
    state = {
        saldo: 10
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {
        // const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const usuarioLogado = this.context.usuarioAutenticado;
        // Utilizando as crases no templateString
        this.usuarioService
            .obterSaldoPorUsuario(usuarioLogado.id)
            .then(response => {
                this.setState({ saldo: response.data })

            }).catch(error => {
                console.error(error.response)
            });
    }


    render() {
        return (
            <div className="jumbotron">
                <div style={{ display: "flex", alignItems: "baseline" }}>
                    <h1 className="display-5">Olá ... </h1>
                </div>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo} reais</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="https://bootswatch.com/flatly/#" role="button">
                        <i className="pi pi-users"></i>  Cadastrar Usuário
                    </a>
                    <a
                        className="btn btn-danger btn-lg"
                        href="#/cadastro-lancamentos"
                        role="button">
                        <i className="pi pi-money-bill"></i> Cadastrar Lançamento
                    </a>
                </p>
            </div>

        );
    }
}

Home.contextType = AuthContext;

export default Home;