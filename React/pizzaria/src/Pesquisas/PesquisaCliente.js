import React, { Component } from 'react';
import axios from 'axios';
import Tabela from './TabelaPesquisaClientes.js';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

export default class PesquisaCliente extends Component {
    constructor(props) {
        super(props);
            this.state = {
                clientes:[],
                nome: "",
            }
    }

    tratarErro(erro) {
        console.log(erro.response);
        if (erro.response.data.message)
            alert(erro.response.data.message);
        else
            alert(erro.response.data);
    }



    setParam(param, valor) {
        this.setState({
            [param]: valor
        });
    }

    componentDidMount() {
        this.pesquisar();
    }

    load() {
        this.setState({
            carregandoLista:true, 
        clientes:[]           
    });
    }
    

    pesquisar() {
        let nome =this.state.nome
        axios.get('/api/clientes/pesquisar/clientesDumaPizza/?nome='+nome ).then(
            (retorno) => this.setState({
                carregandoLista:false,
                clientes: retorno.data
            })
        ).catch((erro) => this.tratarErro(erro));
    }

    render() {
        return (
            <div>
                <h3>Descubra quem comprou a pizza!</h3>
                <label>Nome da Pizza: </label>
            <input value={this.state.nome}
                onChange={(
                    evento) =>
                    this.setParam("nome", evento.target.value)} />
            <IconButton onClick={() => this.pesquisar()} >
            <Icon color="error" fontSize="large" >pageview</Icon>
            </IconButton>
            {this.state.carregandoLista?"Carregando Lista":<Tabela 
            itens={this.state.clientes} 
                    
            
        />}
            </div>
        );
    }
}