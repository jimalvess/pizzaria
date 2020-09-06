import React, { Component } from 'react';
export default class CadastroClientes extends Component {

    constructor(props) {
        super(props);
        if (this.props.editar) {     
            this.state = {           
                id: this.props.editar.id,
                nome: this.props.editar.nome,
                endereco: this.props.editar.endereco,
                telefone: this.props.editar.telefone
                
            };
        }
            else {      
                this.state = { nome: "", endereco: "", telefone: ""};
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
                endereco: this.state.endereco,
                telefone: this.state.telefone,
            });
        } else {        
            this.props.onAdicionar({
                nome: this.state.nome,
                endereco: this.state.endereco,
                telefone: this.state.telefone,
            });

        }

        //Estados iniciais:
        this.setState({
            id: "",
            nome: "",
            endereco: "",
            telefone:"",
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
                <input size="21" value={this.state.nome}
                    onChange={(
                        evento) =>
                        this.setParam("nome", evento.target.value)} />
                        <br />
                        <br />
                <label>Endereço:   </label>
                <input size="18" value={this.state.endereco}
                    onChange={(
                        evento) =>
                        this.setParam("endereco", evento.target.value)} />
                        <br />
                        <br />
                <label>Telefone:   </label>
                <input size="18"
                    onChange={(
                        evento) =>
                        this.setParam("telefone", evento.target.value)}
                    value={this.state.telefone} /><br /><br />

                {/*O botão muda se for pra novo ou adicionar:*/}
                                                      
                <button onClick={
                    () => this.enviar()
                } >{this.state.id ? "Confirmar" : "Adicionar"} </button>
            </div>
        );
    }
}
