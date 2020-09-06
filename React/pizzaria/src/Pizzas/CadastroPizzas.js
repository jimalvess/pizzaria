import React, { Component } from 'react';
export default class CadastroPizzas extends Component {

    constructor(props) {
        super(props);
        if (this.props.editar) {                
            this.state = {                      
                id: this.props.editar.id,
                nome: this.props.editar.nome,
                valor: this.props.editar.valor,
                tamanho: this.props.editar.tamanho,                
            };
        }
            else {           
                this.state = { nome: "", valor: "", tamanho: ""};
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
                valor: this.state.valor,
                tamanho: this.state.tamanho
            });
        } else {                        
            this.props.onAdicionar({
                nome: this.state.nome,
                valor: this.state.valor,
                tamanho: this.state.tamanho
            });

        }

        this.setState({
            id: "",
            nome: "",
            valor:"",
            tamanho: ""
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
                <input size="19" value={this.state.nome}
                    onChange={(
                        evento) =>
                        this.setParam("nome", evento.target.value)} /><br /><br />
                <label>Valor:   </label>
                <input type="number"
                    onChange={(
                        evento) =>
                        this.setParam("valor", evento.target.value)}
                    value={this.state.valor} /><br /><br />
                <label>Tamanho:   </label>
                <input size="16"
                    onChange={(
                        evento) =>
                        this.setParam("tamanho", evento.target.value)}
                    value={this.state.tamanho} /><br /><br />

                {/*O botão muda se for pra novo ou adicionar:*/}
                                                      
                <button onClick={
                    () => this.enviar()
                } >{this.state.id ? "Confirmar" : "Adicionar"} </button>
            </div>
        );
    }
}
