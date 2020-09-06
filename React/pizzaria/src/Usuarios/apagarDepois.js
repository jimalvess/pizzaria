import React, { Component } from 'react';

export default class TabelaPizzas extends Component {

    render() { 
        return <table border="0" align="center" cellSpacing="10" cellPadding="4">

        {/* MONTA A TEBELA: */}

            <tbody>
                {this.props.itens.map(
                    (pizza)=><tr key={pizza.id}>
                                <td>{pizza.nome}</td>
                                <td>{pizza.valor}</td>
                                <td>{pizza.tamanho}</td>
                                </tr>
                )}
            </tbody>
        </table>;
    }
}