import React, { Component } from 'react';
import axios from 'axios';
export default class CadastroEncomendas extends Component {

    constructor(props) {
        super(props);
        if (this.props.editar) {       
            this.state = {             
                id: this.props.editar.id,
                entrega: this.props.editar.entrega,
                pizzaId:this.props.editar.pizza?  
                            this.props.editar.pizza.id:"", 
                clienteId:this.props.editar.cliente?
                            this.props.editar.cliente.id:"",                
                usuarioId:this.props.editar.usuario?
                            this.props.editar.usuario.id:"",                            
            };
        }
        else {              
            this.state = { entrega: "",pizzaId:"", clienteId:"", usuarioId:""};
        }
        this.state.pizzas = []; 
        this.state.clientes = [];
        this.state.usuarios = [];
        this.state.encomendas = [];

    }

    componentDidMount() {    
        this.listaPizzas();
        this.listaClientes();
        this.listaUsuarios();
        this.listaEncomendas();
      }

    listaPizzas() {             
        axios.get("/api/pizzas/").then(
            (resultado) => {
                this.setState({ pizzas: resultado.data });
            }
        );
    }

    listaClientes() {             
        axios.get("/api/clientes/").then(
            (resultado) => {
                this.setState({ clientes: resultado.data });
            }
        );
    }

    listaUsuarios() {             
        axios.get("/api/usuarios/").then(
            (resultado) => {
                this.setState({ usuarios: resultado.data });
            }
        );
    }

    listaEncomendas() {             
        axios.get("/api/encomendas/").then(
            (resultado) => {
                this.setState({ encomendas: resultado.data });
            }
        );
    }    

    setParam(param, valor) {
        this.setState({
            [param]: valor
        });
    }

    enviar() {          
        let pizza = this.state.pizzas.find(
            (pizzaNoArray)=>pizzaNoArray.id == this.state.pizzaId
        );
        let cliente = this.state.clientes.find(
            (clienteNoArray)=>clienteNoArray.id == this.state.clienteId
        );
        let usuario = this.state.usuarios.find(
            (usuarioNoArray)=>usuarioNoArray.id == this.state.usuarioId
        );
        if (this.state.id) {
            this.props.onEditar({
                id: this.state.id,
                entrega: this.state.entrega,
                pizza:pizza,
                cliente:cliente,
                usuario:usuario
            });
        } else {
            this.props.onAdicionar({
                entrega: this.state.entrega,
                pizza:pizza,
                cliente:cliente,
                usuario:usuario
            });

        }
        this.setState({
            entrega: "",
            pizza:"",
            cliente:"",
            usuario:""
        });
    }

    render() {
        return (
            <div>
                {this.state.id ? <div>
                    <label>Você está editando a ID número [ {this.state.id} ]: </label>
                    <br />
                    <br />
                </div> : ""}

                <label>Entrega: </label>
                <input size="13" 
                    onChange={(
                        evento) =>
                        this.setParam("entrega", evento.target.value)}
                    value={this.state.entrega} /><br /><br />

                <label>Pizza: </label>
                <select 
                    value={this.state.pizzaId} 
                    onChange={(evento)=>this.setParam("pizzaId",evento.target.value)}
                    >
                    <option value=""></option>
                    {this.state.pizzas.map(
                        (pizza) => <option value={pizza.id}>{pizza.nome}</option>
                    )
                    }
                </select>
                         
                <label>Cliente: </label>
                <select 
                    value={this.state.clienteId} 
                    onChange={(evento)=>this.setParam("clienteId",evento.target.value)}
                    >
                    <option value=""></option>
                    {this.state.clientes.map(
                        (cliente) => <option value={cliente.id}>{cliente.nome}</option>
                    )
                    }
                </select>
                     
                <label>Usuário: </label>
                <select 
                    value={this.state.usuarioId} 
                    onChange={(evento)=>this.setParam("usuarioId",evento.target.value)}
                    >
                    <option value=""></option>
                    {this.state.usuarios.map(
                        (usuario) => <option value={usuario.id}>{usuario.nome}</option>
                    )
                    }
                </select>
                <br />
                <br />
                <button onClick={
                    () => this.enviar()
                } >{this.state.id ? "Confirmar" : "Adicionar"} </button>
            </div>
        );
    }
}
