import ApiService from '../apiservice'

import ErroValdacao from '../exception/ErroValidacao'

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticate', credenciais);
    }

    obterSaldoPorUsuario(id) {
        return this.get(`/${id}/saldo`);
    }

    salvar(usuario) {
        return this.post('/', usuario)

    }

    validar(usuario) {


        const erros = []

        if (!usuario.nome) {
            erros.push('Nome Obrigatorio.')
        }
        if (!usuario.email) {
            erros.push('Email Obrigatorio.');
        }
        else if (!usuario.email.match(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/)) {


            erros.push('Informe um Email válido');
        }

        if (!usuario.senha || !usuario.senhaRepeticao) {
            erros.push('Preencha a confirmação da senha')
        } else if (usuario.senha !== usuario.senhaRepeticao) {
            erros.push('As senhas não conferem.')
        }

        if (erros && erros.length > 0) {
            throw new ErroValdacao(erros);
        }



        return erros;

    }
}
export default UsuarioService;
