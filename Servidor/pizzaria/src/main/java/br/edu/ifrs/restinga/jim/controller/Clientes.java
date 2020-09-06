//LOCALHOST:8080/api/clientes/

package br.edu.ifrs.restinga.jim.controller;

import br.edu.ifrs.restinga.jim.erros.NaoEncontrado;
import br.edu.ifrs.restinga.jim.erros.RequisicaoInvalida;
import br.edu.ifrs.restinga.jim.modelo.Cliente;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import br.edu.ifrs.restinga.jim.dao.ClienteDao;
import br.edu.ifrs.restinga.jim.dao.EncomendaDao;
import br.edu.ifrs.restinga.jim.erros.Proibido;
import br.edu.ifrs.restinga.jim.modelo.Encomenda;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping(path = "/api")
public class Clientes {

    @Autowired
    ClienteDao clienteDAO;
    @Autowired
    EncomendaDao encomendaDAO;
    
///////////// VALIDAÇÕES ////////////////////////       
    
    public void validaCliente(Cliente cliente){
        if (cliente.getNome() == null || cliente.getNome().trim().isEmpty()){
            throw new RequisicaoInvalida("NOME do cliente é obrigatório");
        }
        if (cliente.getEndereco()== null || cliente.getEndereco().isEmpty()){
            throw new RequisicaoInvalida("ENDEREÇO do cliente é obrigatório");
        }
        if (cliente.getTelefone() == null || cliente.getTelefone().isEmpty()){
            throw new RequisicaoInvalida("TELEFONE do cliente é obrigatório");
        }
    }
    
///////////// LISTAR CLIENTES ////////////////////////       

    @RequestMapping(path = "/clientes/", method = RequestMethod.GET)
    public Iterable<Cliente> listar() {
        return clienteDAO.findAll();
    }
    
///////////// INSERIR CLIENTE ////////////////////////       

    @RequestMapping(path = "/clientes/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente inserir(@RequestBody Cliente cliente) {
        cliente.setId(0);
        validaCliente(cliente);
        return clienteDAO.save(cliente);   
    }
    
///////////// RECUPERAR CLIENTE PELA ID ////////////////////////       

    @RequestMapping(path = "/clientes/{id}", method = RequestMethod.GET)
    public Cliente recuperar(@PathVariable int id) {
        Optional<Cliente> findById = clienteDAO.findById(id);
        if (findById.isPresent()) {
            return findById.get();
        } else {
            throw new NaoEncontrado("CLIENTE não encontrado");
        }
    }
    
///////////// ATUALIZAR CLIENTE PELA ID ////////////////////////       

    @RequestMapping(path = "/clientes/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void atualizar(@PathVariable int id, @RequestBody Cliente cliente) {
        if (clienteDAO.existsById(id)) {
            cliente.setId(id);
            validaCliente(cliente);
            clienteDAO.save(cliente);
        } else {
            throw new NaoEncontrado("CLIENTE não encontrado");
        }
    }

///////////// APAGAR CLIENTE PELA ID ////////////////////////               
    
    @RequestMapping(path = "/clientes/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void apagar(@PathVariable int id){
         List<Encomenda> encomendas = (List<Encomenda>) encomendaDAO.findAll();
         encomendas.stream().filter((listaEncomendas) -> (listaEncomendas.getCliente().getId() == id)).forEachOrdered((_item) -> {
             throw new Proibido("ATENÇÃO: Cliente com encomenda ativa. Exclua a encomenda antes de remover este cliente");
        });
        if (clienteDAO.existsById(id)){
            clienteDAO.deleteById(id);
        }else {
            throw new NaoEncontrado("CLIENTE não encontrado");
        }
    } 
    
/////////////// PESQUISA PIZZAS POR NOME DO CLIENTE ////////////////////////   
    //LOCALHOST:8080/api/pizzas/pesquisar/pizzasDoCliente/?nome=cliGuasca
    
     @RequestMapping( path = "/clientes/pesquisar/clientesDumaPizza/", method = RequestMethod.GET)
     public List <Cliente> buscarClientesDumaPizza(@RequestParam(required = true) String nome){
         
         if(nome !=null){
            return clienteDAO.listarClientesDumaPizza(nome);
        } else{
        throw new RequisicaoInvalida("Escolha o NOME DE UMA PIZZA para pesquisar...");
         
        }
     }         

}