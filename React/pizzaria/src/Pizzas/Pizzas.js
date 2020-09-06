import React, { Component } from 'react';
import axios from 'axios';
import Cadastro from './CadastroPizzas';
import Tabela from './TabelaPizzas';

export default class Pizzas extends Component {

    constructor() { 
        super();
        this.state={
            pizzas:[],
            pizzaParaEditar:null
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
        pizzas:[]           
      });    
        axios.get("/api/pizzas/").then(
            (retorno)=>this.setState({ 
                carregandoLista:false, 
                pizzas:retorno.data 
            }) 
        ).catch((erro) => this.tratarErro(erro));
      }
    componentDidMount() { 
      this.load();
    }

    confirmarEdicao(pizza) { 
        axios.put("/api/pizzas/"+pizza.id,pizza).then( 
            ()=>this.load()   
        ).catch((erro) => this.tratarErro(erro));
    }

    adicionarPizza(pizza) { 
        axios.post("/api/pizzas/",pizza).then( 
            (retorno)=>this.setState(
                {
                pizzas:[...this.state.pizzas, retorno.data] 
                }
            )
        ).catch((erro) => this.tratarErro(erro));
        }
    
    editar(pizza) {   
        this.setState({
            pizzaParaEditar:pizza 
        });
    }

    excluir(pizza) {
        axios.delete("/api/pizzas/" + pizza.id).then(
            () => this.load()
        ).catch((erro)=>this.tratarErro(erro));
    }

    render() {

        return (
          <div >
          {/*Se for pra editar, pega a key (id, se não, a id é uma string*/}
              <h1>Cadastro de Pizzas:</h1>
           <Cadastro  
              key={this.state.pizzaParaEditar?
                      this.state.pizzaParaEditar.id:"novo"}
              editar={this.state.pizzaParaEditar}  
              onEditar={(pizza)=>this.confirmarEdicao(pizza)}
              onAdicionar={(pizza)=>this.adicionarPizza(pizza)} 
              onExcluirPizza={(pizza) => this.excluirPizza(pizza)} />   
          <h3>Lista de Pizzas atuais:</h3>
          {/*se tá carregando a lista escreve, se não, monta a tabela*/}
          {this.state.carregandoLista?"Carregando Lista":<Tabela 
              itens={this.state.pizzas} 
              onEditar={(pizza)=>this.editar(pizza)}
              onExcluir={(pizza)=>this.excluir(pizza)}
          />} 
          <br/>
          <br/>
          </div>
        );
      }
    }
    