import React, { Component } from 'react';

export default class TabelaPizzas extends Component {

    render() { 
        return <table className="redTable">

        {/* MONTA A TEBELA: */}

            <tbody>
                {this.props.itens.map(
                    (pizza)=><tr key={pizza.id}>
                                <td>{pizza.nome}</td>
                                <td>{pizza.tamanho}</td>
                                </tr>
                )}
            </tbody>
        </table>;
    }
}