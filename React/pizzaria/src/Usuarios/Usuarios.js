import React, { Component } from 'react';
import axios from 'axios';
import Cadastro from './CadastroUsuarios';
import Tabela from './TabelaUsuarios';


export default class Usuarios extends Component {

    constructor() { 
        super();
        this.state={
            usuarios:[],
            usuarioParaEditar:null
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
        usuarios:[]           
      });

      axios.get("/api/usuarios/").then(
            (retorno)=>this.setState({ 
                carregandoLista:false, 
                usuarios:retorno.data 
            }) 
        ).catch((erro) => this.tratarErro(erro));
      }
      
    componentDidMount() { 
      this.load();
    }

    confirmarEdicao(usuario) { 
        axios.put("/api/usuarios/"+usuario.id,usuario).then( 
            ()=>this.load()   
        ).catch((erro)=>this.tratarErro(erro));
    }


    adicionarUsuario(usuario) { 
        axios.post("/api/usuarios/",usuario).then( 
            (retorno)=>this.setState(   
                {
                usuarios:[...this.state.usuarios, retorno.data] 
                }
            )
        ).catch((erro)=>this.tratarErro(erro));
        }
    
    editar(usuario) {   
        this.setState({
            usuarioParaEditar:usuario 
        });
    }

    excluir(usuario) {
      axios.delete("/api/usuarios/" + usuario.id).then(
          () => this.load()
      ).catch((erro)=>this.tratarErro(erro));
  }

  render() {

    return (
      <div >
      {/*Se for pra editar, pega a key (id, se não, a id é uma string*/}
      <h1>Cadastro de Usuários:</h1>
       <Cadastro  
          key={this.state.usuarioParaEditar? 
                  this.state.usuarioParaEditar.id:"novo"}
          editar={this.state.usuarioParaEditar}  
          onEditar={(usuario)=>this.confirmarEdicao(usuario)}
          onAdicionar={(usuario)=>this.adicionarUsuario(usuario)} 
          onExcluirUsuario={(usuario) => this.excluirUsuario(usuario)} />  
      <h3>Lista de Usuários atuais:</h3>
      {/*se tá carregando a lista escreve, se não, monta a tabela*/}
      {this.state.carregandoLista?"Carregando Lista":<Tabela 
          itens={this.state.usuarios} 
          onEditar={(usuario)=>this.editar(usuario)}
          onExcluir={(usuario)=>this.excluir(usuario)}
      />} 
      <br/>
      <br/>
      </div>
    );
  }
}
