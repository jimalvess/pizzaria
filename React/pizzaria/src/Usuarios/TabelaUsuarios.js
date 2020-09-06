import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

export default class TabelaUsuarios extends Component {

    render() { 
        return <table className="redTable">

        {/* MONTA A TEBELA: */}
            <thead>
                <tr>
                    <th>Ação</th>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Login</th>
                </tr>
            </thead>
            <tbody>
                {this.props.itens.map(
                    (usuario)=><tr key={usuario.id}>
                                <td>
                                <IconButton onClick={()=>this.props.onEditar(usuario)}>
                                <Icon color="primary">edit</Icon>
                                </IconButton>
                                <IconButton onClick={()=> this.props.onExcluir(usuario)}>
                                <Icon color="error">delete</Icon>
                                </IconButton>
                                </td>
                                <td>{usuario.id}</td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.login}</td>
                                </tr>
                )}
            </tbody>
        </table>;
    }
}