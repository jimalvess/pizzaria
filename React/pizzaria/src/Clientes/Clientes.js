import React, { Component } from 'react';
import axios from 'axios';
import Cadastro from './CadastroClientes';
import Tabela from './TabelaClientes';

export default class Clientes extends Component {

    constructor() { 
        super();
        this.state={
            clientes:[],
            clienteParaEditar:null
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
        clientes:[]           
      });    
        axios.get("/api/clientes/").then(
            (retorno)=>this.setState({ 
                carregandoLista:false, 
                clientes:retorno.data 
            }) 
        ).catch((erro) => this.tratarErro(erro));
      }
    componentDidMount() { 
      this.load();
    }

    confirmarEdicao(cliente) { 
        axios.put("/api/clientes/"+cliente.id,cliente).then( 
            ()=>this.load()   
        ).catch((erro) => this.tratarErro(erro));
    }


    adicionarCliente(cliente) { 
        axios.post("/api/clientes/",cliente).then( 
            (retorno)=>this.setState(
                {
                clientes:[...this.state.clientes, retorno.data] 
                }
            )
        ).catch((erro) => this.tratarErro(erro));
        }
    
    editar(cliente) {   
        this.setState({
            clienteParaEditar:cliente 
        });
    }

    excluir(cliente) {
      axios.delete("/api/clientes/" + cliente.id).then(
          () => this.load()
      ).catch((erro)=>this.tratarErro(erro));
  }

  render() {

    return (
      <div > 
      {/*Se for pra editar, pega a key (id, se não, a id é uma string*/}
      <h1>Cadastro de Clientes:</h1>
       <Cadastro  
          key={this.state.clienteParaEditar?
                  this.state.clienteParaEditar.id:"novo"}
          editar={this.state.clienteParaEditar}  
          onEditar={(cliente)=>this.confirmarEdicao(cliente)}
          onAdicionar={(cliente)=>this.adicionarCliente(cliente)}
          onExcluirCliente={(cliente) => this.excluirUsuario(cliente)} /> 
      <h3>Lista de Clientes atuais:</h3>
      {/*se tá carregando a lista escreve, se não, monta a tabela*/}
      {this.state.carregandoLista?"Carregando Lista":<Tabela 
          itens={this.state.clientes} 
          onEditar={(cliente)=>this.editar(cliente)}
          onExcluir={(cliente)=>this.excluir(cliente)}
      />} 
      <br/>
      <br/>
      </div>
    );
  }
}
