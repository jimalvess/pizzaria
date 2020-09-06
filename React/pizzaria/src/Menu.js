import React, { Component } from 'react';
import Usuarios from './Usuarios/Usuarios';
import Clientes from './Clientes/Clientes';
import Encomendas from './Encomendas/Encomendas';
import Pizzas from './Pizzas/Pizzas';
import Logo from "./Imagem/pizzalogo.png";
import Linhazita from "./Imagem/linhazita.png";
import Relatorios from "./Pesquisas/Relatorios.js";


export default class Menu extends Component {
    constructor() {
        super();
        this.state={
            selecionado:""
        };
    }
    render() {
        return <div align="center">
            <img src={Logo} alt="pizza delivery"/>
            <h3>Escolha abaixo o que deseja cadastrar:</h3>
        <button className="button"
            style={{
                backgroundColor:this.state.selecionado =="Usuarios"?"#953906":"red"
            }}
            onClick={()=>this.setState({selecionado:"Usuarios"})}>Usuários</button>            
        <button className="button"
            style={{
                backgroundColor:this.state.selecionado =="Clientes"?"#953906":"red"
            }}
            onClick={()=>this.setState({selecionado:"Clientes"})}>Clientes</button>            
        <button className="button"
            style={{
                backgroundColor:this.state.selecionado =="Pizzas"?"#953906":"red"
            }}
            onClick={()=>this.setState({selecionado:"Pizzas"})}>Pizzas</button>            
        <button className="button"
            style={{
                backgroundColor:this.state.selecionado =="Encomendas"?"#953906":"red"
            }}
            onClick={()=>this.setState({selecionado:"Encomendas"})}>Encomendas</button>
                    
        <button className="button"
            style={{
                backgroundColor:this.state.selecionado =="Relatorios"?"#953906":"red"
            }}
            onClick={()=>this.setState({selecionado:"Relatorios"})}>Relatórios</button>
            <br/>
            <img src={Linhazita} alt="linha separadora"/>
            {this.state.selecionado =="Usuarios"?<Usuarios />
            :this.state.selecionado =="Encomendas"?<Encomendas />
            :this.state.selecionado =="Clientes"?<Clientes />
            :this.state.selecionado =="Pizzas"?<Pizzas />
            :this.state.selecionado =="Relatorios"?<Relatorios />:""}
        </div>

    }
}