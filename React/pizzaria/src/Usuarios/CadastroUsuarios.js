import React, { Component } from 'react';

export default class CadastroUsuarios extends Component {

    constructor(props) {
        super(props);
        if (this.props.editar) {                
            this.state = {                      
                id: this.props.editar.id,
                nome: this.props.editar.nome,
                login: this.props.editar.login,
                senha: this.props.editar.senha
                
            };
        }
            else {           
                this.state = { nome: "", login:"", senha:""};
            }
    }

    setParam(param, valor) {
        this.setState({
            [param]: valor
        });
    }

    enviar() {                      
        if (this.state.id) {
            this.props.onEditar({   
                id: this.state.id,
                nome: this.state.nome,
                login: this.state.login,
                senha: this.state.senha
            });
        } else {                        
            this.props.onAdicionar({
                nome: this.state.nome,
                login: this.state.login,
                senha: this.state.senha
            });

        }

        //Estados iniciais:
        this.setState({
            id: "",
            nome: "",
            login:"",
            senha: ""
        });
    }

    render() {
        return (
            <div>
                {/*se tiver ID pra mostrar, mostra*/}

                {this.state.id ? <div>
                    <label>Você está editando a ID número [ {this.state.id} ]: </label>
                    <br />
                    <br />
                </div> : ""}
                
                {/*Preenchendo os trecos:*/}
                
                <label>Nome:   </label>
                <input value={this.state.nome}
                    onChange={(
                        evento) =>
                        this.setParam("nome", evento.target.value)} />
                        <br />
                        <br />
                <label>Login:   </label>
                <input value={this.state.login}
                    onChange={(
                        evento) =>
                        this.setParam("login", evento.target.value)} />
                        <br />
                        <br />
                <label>Senha:   </label>
                <input
                    onChange={(
                        evento) =>
                        this.setParam("senha", evento.target.value)}
                    value={this.state.senha} />
                    <br />
                    <br />

                {/*O botão muda se for pra novo ou adicionar:*/}
                                                      
                <button onClick={
                    () => this.enviar()
                } >{this.state.id ? "Confirmar" : "Adicionar"} </button>
            </div>
        );
    }
}