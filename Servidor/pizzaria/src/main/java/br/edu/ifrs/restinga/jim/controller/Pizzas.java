//LOCALHOST:8080/api/pizzas/

package br.edu.ifrs.restinga.jim.controller;

import br.edu.ifrs.restinga.jim.dao.EncomendaDao;
import br.edu.ifrs.restinga.jim.erros.NaoEncontrado;
import br.edu.ifrs.restinga.jim.erros.RequisicaoInvalida;
import br.edu.ifrs.restinga.jim.modelo.Pizza;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import br.edu.ifrs.restinga.jim.dao.PizzaDao;
import br.edu.ifrs.restinga.jim.erros.Proibido;
import br.edu.ifrs.restinga.jim.modelo.Encomenda;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping(path = "/api")
public class Pizzas {

    @Autowired
    PizzaDao pizzaDAO;
    @Autowired
    EncomendaDao encomendaDAO;
    
///////////// VALIDAÇÕES ////////////////////////       
    
    public void verificaPizza(Pizza pizza){
        if (pizza.getNome() == null || pizza.getNome().isEmpty()) {
            throw new RequisicaoInvalida("NOME da PIZZA é obrigatório");
        }
        if (pizza.getValor()<= 0) {
            throw new RequisicaoInvalida("VALOR da PIZZA é obrigatório");
        }
        if (pizza.getTamanho() == null || pizza.getTamanho().isEmpty()) {
            throw new RequisicaoInvalida("TAMANHO da PIZZA é obrigatório. Escreva [pequena], [media] ou [grande]");
        }

        while (! pizza.getTamanho().equalsIgnoreCase("pequena")
                && ! pizza.getTamanho().equalsIgnoreCase("media") 
                && ! pizza.getTamanho().equalsIgnoreCase("grande")){
            throw new RequisicaoInvalida("Somente os tamanhos [pequena], [media] ou [grande] são aceitos");
        }
    }
    
///////////// LISTAR PIZZAS ////////////////////////       

    @RequestMapping(path = "/pizzas/", method = RequestMethod.GET)
    public Iterable<Pizza> listar(){
        return pizzaDAO.findAll();
    }
    
///////////// INSERIR PIZZA ////////////////////////       

    @RequestMapping(path = "/pizzas/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Pizza inserir(@RequestBody Pizza pizza){
        pizza.setId(0);
        verificaPizza(pizza);
        return pizzaDAO.save(pizza);
    }
    
///////////// RECUPERAR PIZZA PELA ID ////////////////////////       

    @RequestMapping(path = "/pizzas/{id}", method = RequestMethod.GET)
    public Pizza recuperar(@PathVariable int id){
        Optional<Pizza> findById = pizzaDAO.findById(id);
        if(findById.isPresent()){
            return findById.get();
        }else{
            throw new NaoEncontrado("PIZZA não encontrada");
        }
    }
    
///////////// ATUALIZAR PIZZA PELA ID ////////////////////////       

    @RequestMapping(path = "/pizzas/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void atualizar(@PathVariable int id, @RequestBody Pizza pizza){
        if(pizzaDAO.existsById(id)){
            pizza.setId(id);
            verificaPizza(pizza);
            pizzaDAO.save(pizza);
        }else{
            throw new NaoEncontrado("PIZZA não encontrada");
        }
    }
    
///////////// APAGAR PIZZA  PELA ID ////////////////////////               
    
    @RequestMapping(path = "/pizzas/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void apagar(@PathVariable int id){
         List<Encomenda> encomendas = (List<Encomenda>) encomendaDAO.findAll();
         encomendas.stream().filter((listaEncomendas) -> (listaEncomendas.getPizza().getId() == id)).forEachOrdered((_item) -> {
             throw new Proibido("ATENÇÃO: Pizza com encomenda ativa. Exclua a encomenda antes de remover esta pizza do cardápio!");
        });
        if (pizzaDAO.existsById(id)){
            pizzaDAO.deleteById(id);
        }else {
            throw new NaoEncontrado("PIZZA não encontrada");
        }
    }
    
    /////////////// PESQUISA PIZZAS POR NOME DO CLIENTE ////////////////////////   
    //LOCALHOST:8080/api/pizzas/pesquisar/pizzasDoCliente/?nome=cliGuasca
    
     @RequestMapping( path = "/pizzas/pesquisar/pizzasDoCliente/", method = RequestMethod.GET)
     public List <Pizza> buscarPizzasDumCliente(@RequestParam(required = true) String nome){
         
         if(nome !=null){
            return pizzaDAO.listarPizzasDumCliente(nome);
        } else{
        throw new RequisicaoInvalida("Escolha o NOME DE UM CLIENTE para pesquisar...");
         
        }
     }     

}     