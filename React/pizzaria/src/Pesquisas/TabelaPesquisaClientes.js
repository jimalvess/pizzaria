import React, { Component } from 'react';

export default class TabelaPesquisaClientes extends Component {

    render() { 
        return <table className="redTable">

        {/* MONTA A TEBELA: */}

            <tbody>
                {this.props.itens.map(
                    (cliente)=><tr key={cliente.id}>
                                <td>{cliente.nome}</td>
                                </tr>
                )}
            </tbody>
        </table>;
    }
}