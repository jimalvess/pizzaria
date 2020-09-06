import React, { Component } from 'react';
import axios from 'axios';
import Tabela from './TabelaPesquisaPizzas.js';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

export default class PesquisaPizza extends Component {
    constructor(props) {
        super(props);
            this.state = {
                pizzas:[],
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
        pizzas:[]           
    });
    }
    

    pesquisar() {
        let nome =this.state.nome
        axios.get('/api/pizzas/pesquisar/pizzasDoCliente/?nome='+nome ).then(
            (retorno) => this.setState({
                carregandoLista:false,
                pizzas: retorno.data
            })
        ).catch((erro) => this.tratarErro(erro));
    }

    render() {
        return (
            <div>
                <h3>Descubra quantos pedidos um cliente fez!</h3>
                <label>Nome do Cliente: </label>
            <input value={this.state.nome}
                onChange={(
                    evento) =>
                    this.setParam("nome", evento.target.value)} />
            <IconButton onClick={() => this.pesquisar()} >
            <Icon color="error" fontSize="large" >pageview</Icon>
            </IconButton>
            {this.state.carregandoLista?"Carregando Lista":<Tabela 
            itens={this.state.pizzas} 
                    
        />}
            </div>
        );
    }
}