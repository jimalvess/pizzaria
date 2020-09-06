import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

export default class TabelaEncomendas extends Component {

    render() {
        
        return <table className="redTable">
            <thead>
                <tr>
                    <th>Ação</th>
                    <th>ID</th>
                    <th>Entrega</th>
                    <th>Pizza</th>
                    <th>Cliente</th>
                    <th>Usuário</th>
                </tr>
            </thead>
            <tbody>
                {this.props.itens.map(
                    (encomenda)=><tr key={encomenda.id}>
                        <td><IconButton onClick={()=>this.props.onEditar(encomenda)}>
                                <Icon color="primary">edit</Icon>
                                </IconButton>
                                <IconButton onClick={()=> this.props.onExcluir(encomenda)}>
                                <Icon color="error">delete</Icon>
                                </IconButton> 
                        </td>
                        <td>{encomenda.id}</td>
                        <td>{encomenda.entrega}</td>
                        <td>{encomenda.pizza.nome}</td>
                        <td>{encomenda.cliente.nome}</td>
                        <td>{encomenda.usuario.nome}</td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}