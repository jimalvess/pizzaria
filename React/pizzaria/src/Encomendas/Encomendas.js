import React, { Component } from 'react';
import axios from 'axios';
import Cadastro from './CadastroEncomendas';
import Tabela from './TabelaEncomendas';


export default class Bailes extends Component {

    constructor() {
        super();
        this.state={
            encomendas:[],
            encomendaParaEditar:null
        };
    }

    tratarErro(erro) {
        console.log(erro.response);
        if (erro.response.data.message)
            alert(erro.response.data.message);
        else
            alert(erro.response.data);
    }

    load()
      {
      this.setState({
        carregandoLista:true,
        encomendas:[]
      });    
        axios.get("/api/encomendas/").then(
            (retorno)=>this.setState({
                carregandoLista:false,
                encomendas:retorno.data
            }) 
        ).catch((erro) => this.tratarErro(erro));
      }
    componentDidMount() {
      this.load();
    }

    confirmarEdicao(encomenda) {
        axios.put("/api/encomendas/"+encomenda.id,encomenda).then(
            ()=>this.load()
        ).catch((erro) => this.tratarErro(erro));
    }


    adicionarEncomenda(encomenda) {
        axios.post("/api/encomendas/",encomenda).then(
            (retorno)=>this.setState(
                {
                encomendas:[...this.state.encomendas, retorno.data]
                }
            )
        ).catch((erro) => this.tratarErro(erro));


        }
    
    editar(encomenda) {
        this.setState({
            encomendaParaEditar:encomenda
        });
    }

    excluir(encomenda) {
        axios.delete("/api/encomendas/"+encomenda.id).then(
            ()=>this.load()
        );

    }    
    render() {
        return (
          <div>
          <h1>Cadastrar Encomendas</h1>
          <Cadastro key={this.state.encomendaParaEditar?
                  this.state.encomendaParaEditar.id:"novo"}
          editar={this.state.encomendaParaEditar}  
          onEditar={(encomenda)=>this.confirmarEdicao(encomenda)}
          onAdicionar={(encomenda)=>this.adicionarEncomenda(encomenda)}  /> 
          <h3>Encomendas Cadastradas</h3>
              {this.state.carregandoLista?"Carregando Lista":<Tabela 
              itens={this.state.encomendas} 
              onExcluir={(encomenda)=>this.excluir(encomenda)}
              onEditar={(encomenda)=>this.editar(encomenda)}
          />} 
          <br/>
          <br/>
          </div>
        );
      }
    }
    