import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

export default class TabelaPizzas extends Component {

    render() { 
        return <table className="redTable">
            <thead>
                <tr>
                    <th>Ação</th>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Tamanho</th>
                </tr>
            </thead>
            <tbody>
                {this.props.itens.map(
                    (pizza)=><tr key={pizza.id}>
                                <td>
                                <IconButton onClick={()=>this.props.onEditar(pizza)}>
                                <Icon color="primary">edit</Icon>
                                </IconButton>
                                <IconButton onClick={()=> this.props.onExcluir(pizza)}>
                                <Icon color="error">delete</Icon>
                                </IconButton>
                                </td>
                                <td>{pizza.id}</td>
                                <td>{pizza.nome}</td>
                                <td>{pizza.valor}</td>
                                <td>{pizza.tamanho}</td>
                            </tr>
                )}
            </tbody>
        </table>;
    }
}