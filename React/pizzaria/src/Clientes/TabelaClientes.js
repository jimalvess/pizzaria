
import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

export default class TabelaClientes extends Component {

    render() { 
        return <table className="redTable">
            <thead>
                <tr>
                    <th>Ação</th>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Endereço</th>
                    <th>Telefone</th>
                </tr>
            </thead>
            <tbody>
                {this.props.itens.map(
                    (cliente)=><tr key={cliente.id}>
                                <td>
                                <IconButton onClick={()=>this.props.onEditar(cliente)}>
                                <Icon color="primary">edit</Icon>
                                </IconButton>
                                <IconButton onClick={()=> this.props.onExcluir(cliente)}>
                                <Icon color="error">delete</Icon>
                                </IconButton>
                                </td>
                                <td>{cliente.id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.endereco}</td>
                                <td>{cliente.telefone}</td>
                            </tr>
                )}
            </tbody>
        </table>;
    }
}