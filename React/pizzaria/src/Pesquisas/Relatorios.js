import React, { Component } from 'react';
import PesquisaPizza from "./PesquisaPizza.js";
import PesquisaCliente from "./PesquisaCliente";

export default class Relatorios extends Component {

    render() { 
        return <div>
            <PesquisaPizza />
            <PesquisaCliente />
            <br/>
            <br/>

        </div>;
    }
}