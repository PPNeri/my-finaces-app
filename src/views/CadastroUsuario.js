import React, { Component } from 'react';
import Card from '../Components/card'
import FormGroup from '../Components/form-group';
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import { mensagemSucesso, mensagemAlerta, mensagemErro } from '../Components/toastr'

class CadastroUsuario extends Component {
    state = {
        email: '',
        nome: '',
        senha: '',
        senhaRepeticao: ''

    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    validar() {

        const msgs = []
        if (!this.state.nome) {
            msgs.push('Nome obrigatorio.')
        }
        if (!this.state.email) {
            msgs.push('Email obrigatorio.');

        }
        else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]'/)) {
            msgs.push('Informe um Email válido');

        }


        if (!this.state.senha || !this.state.senhaRepeticao) {
            msgs.push('Preencha a confirmação da senha')
        } else if (this.state.senha !== this.state.senhaRepeticao) {
            msgs.push('As senhas não conferem.')
        }

        return msgs;

    }

    cadastrar = () => {

        const msgs = this.validar();

        if (msgs && msgs.length > 0) {

            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            });
            return false;

        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso("Usuario Cadastrado com sucesso! Façao Login para acessar o sistema.")
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <Card title="Cadastro de Usuario">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text"
                                    id="inutNome"
                                    className="form-control"
                                    name="nome"
                                    onChange={e => this.setState({ nome: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email"
                                    className="form-control"
                                    id="inputEmail"
                                    name="email"
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                    className="form-control"
                                    id="inputSenha"
                                    name="senha"
                                    onChange={e => this.setState({ senha: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlFor="inputReptaSenha">
                                <input type="password"
                                    className="form-control"
                                    id="inputRepitaSenha"
                                    name="senha"
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                            </FormGroup>
                            <button type="button" onClick={this.cadastrar} className="btn btn-success">Salvar</button>
                            <button type="button" onClick={this.cancelar} className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(CadastroUsuario);