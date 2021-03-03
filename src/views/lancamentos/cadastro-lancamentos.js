import React from 'react';
import Card from '../../Components/card'
import { withRouter } from 'react-router-dom';
import FormGroup from '../../Components/form-group';
import SelectMenu from '../../Components/selectMenu';
import LancamentoService from '../../app/service/lancamentoService';


import * as messages from '../../Components/toastr'
import LocalStorageService from '../../app/service/localStorageService';

class CadastroLancamentos extends React.Component {


    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false

    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }


    // É executado depois da renderização do formulário
    componentDidMount() {

        const params = this.props.match.params
        if (params.id) {
            this.service.obterPorId(params.id).then(response => {
                this.setState({ ...response.data, atualizando: true })
            }).catch(errors => {
                messages.mensagemErro(errors.response.data)
            })
        }
    }


    submit = () => {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id }

        try {
            this.service.validar(lancamento);

        } catch (erro) {
            const msg = erro.mensagens;

            msg.forEach(msg => {
                messages.mensagemErro(msg);
                return false;
            });
        }

        this.service.salvar(lancamento).then(response => {
            this.props.history.push('/consulta-lancamentos')
            messages.mensagemSucesso('Lançamento Cadastrado com Sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data)
        })

    }


    atualizar = () => {

        const { descricao, valor, mes, ano, tipo, status, usuario, id } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario, status, id }


        this.service.atualizar(lancamento).then(response => {
            this.props.history.push('/consulta-lancamentos')
            messages.mensagemSucesso('Lançamento atualizado com Sucesso!')
        }).catch(error => {
            messages.mensagemErro(error.response.data)
        })


    }

    handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({ [name]: value })
    }


    render() {

        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();



        return (
            <Card title={this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamentos'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descricao: *">
                            <input
                                id="inputDescricao"
                                type="text"
                                className="form-control"
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChange}
                            />

                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: ">
                            <input
                                id="inputAno"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.ano}
                                name="ano"
                                label="Ano :"
                                className="form-control"
                            />

                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: ">
                            <SelectMenu
                                id="inputMes"
                                lista={meses}
                                className="form-control"
                                name="mes"
                                value={this.state.mes}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input
                                id="inputValor"
                                type="text"
                                className="form-control"
                                name="valor"
                                value={this.state.valor}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu
                                id="inputTipo"
                                lista={tipos}
                                className="form-control"
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">
                            <input
                                id="inputStatus"
                                type="text"
                                className="form-control"
                                name="status"
                                value={this.state.status}
                                disabled />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this.state.atualizando ?
                            (< button onClick={this.atualizar} className="btn btn-primary">
                                <i className="pi pi-refresh"></i>  Atualizar
                            </button>) :
                            (<button onClick={this.submit} className="btn btn-success">
                                <i className="pi pi-save"></i> Salvar
                            </button>)
                        }
                        <button onClick={e => this.props.history.push('/consulta-lancamentos')} className="btn btn-danger" >
                            <i className="pi pi-times"></i> Cancelar
                        </button>
                    </div>
                </div>
            </Card >
        )
    }

}

export default withRouter(CadastroLancamentos);