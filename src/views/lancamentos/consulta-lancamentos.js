import React from 'react';
import { withRouter } from 'react-router-dom'
import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localStorageService';
import Card from '../../Components/card'
import FormGroup from '../../Components/form-group'
import SelectMenu from '../../Components/selectMenu'
import LancamentosTable from './lancamentosTable';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import * as messages from '../../Components/toastr'



class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: [],
        showConfirmDialog: false,
        lancamentoDeletar: {}
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }



    buscar = () => {

        if (!this.state.ano) {
            messages.mensagemErro('Selecione o ano desejado para a realizar a consulta.')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }
        console.log(lancamentoFiltro);

        this.service
            .consultar(lancamentoFiltro)
            .then(resp => {
                this.setState({ lancamentos: resp.data })
            }).catch(error => {
                console.log(error)
            })


    }

    editar = (id) => {
        console.log('editando o lancamento', id)
    }


    abrirConfirmacaoModal = (lancamento) => {

        this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
    }


    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, lancamentoDeletar: {} })
    }




    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id)
            .then(resp => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                lancamentos.splice(index, 1);
                this.setState({ lancamentos: lancamentos, showConfirmDialog: false });
                messages.mensagemSucesso('Lancamento excluído com sucesso');
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar excluir o Lançamento');
            })
    }

    render() {
        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();

        const confirmDialogFooter = (

            <div>
                <Button label="Confirmar" icon="pi pi-times" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-check" onClick={this.cancelarDelecao} className="p-button-secondary" />
            </div>
        );


        return (
            <Card title="Consulta de Lançamentos">
                <div className="row">
                    <div className="col-md-3">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" className="form-control"
                                    id="inputAno" value={this.state.ano} onChange={e => this.setState({ ano: e.target.value })}
                                    placeholder="Digite o Ano" />
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu value={this.state.mes} onChange={e => this.setState({ mes: e.target.value })} id="imputMes" className="form-control" lista={meses} />
                            </FormGroup>
                            <FormGroup htmlFor="inputDescricao" label="Descrição: ">
                                <input type="text" className="form-control"
                                    id="inputDescricao" value={this.state.descricao} onChange={e => this.setState({ descricao: e.target.value })}
                                    placeholder="Informe uma Descrição" />
                            </FormGroup>
                            <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento:">
                                <SelectMenu value={this.state.tipo} onChange={e => this.setState({ tipo: e.target.value })} id="inputTipo" className="form-control" lista={tipos} />
                            </FormGroup>
                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable
                                lancamentos={this.state.lancamentos}
                                deleteAction={this.abrirConfirmacaoModal}
                                editAction={this.editar} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog
                        header="Confirma Exclusão"
                        footer={confirmDialogFooter}
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        modal={true}
                        onHide={() => this.setState({ showConfirmDialog: false })}>
                        <p>Gostaria de realmente excluir esse lancamento?</p>
                    </Dialog>
                </div>

            </Card>

        );
    }
}

export default withRouter(ConsultaLancamentos);