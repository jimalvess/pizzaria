//LOCALHOST:8080/api/encomendas/

package br.edu.ifrs.restinga.jim.controller;

import br.edu.ifrs.restinga.jim.erros.NaoEncontrado;
import br.edu.ifrs.restinga.jim.modelo.Encomenda;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import br.edu.ifrs.restinga.jim.erros.RequisicaoInvalida;
import br.edu.ifrs.restinga.jim.dao.EncomendaDao;

@RestController
@RequestMapping(path = "/api")
public class Encomendas {
 @Autowired
  EncomendaDao encomendaDAO;

    
///////////// VALIDAÇÕES ////////////////////////       
    
    public void verificaEncomenda(Encomenda encomenda){
        if (encomenda.getEntrega() == null) {
            throw new RequisicaoInvalida("DATA da entrega é obrigatória");
        }
        
        if (encomenda.getPizza()== null) {
            throw new RequisicaoInvalida("Que PIZZA devemos entregar?");
        }
        if (encomenda.getCliente()== null) {
            throw new RequisicaoInvalida("Para qual CLIENTE devemos entregar?");
        }
        if (encomenda.getUsuario()== null) {
            throw new RequisicaoInvalida("USUÁRIO que está efetuando a encomenda deve se identificar!");
        }
    } 
 
///////////// LISTA AS ENCOMENDAS ////////////////////////       

    @RequestMapping(path = "/encomendas/", method = RequestMethod.GET)
    public Iterable<Encomenda> listar() {
        return encomendaDAO.findAll();
    }
    
///////////// INSERE ENCOMENDA ////////////////////////       

    @RequestMapping(path = "/encomendas/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Encomenda inserir(@RequestBody Encomenda encomenda) {
        encomenda.setId(0);
        verificaEncomenda(encomenda);
        Encomenda encomendaSalva = encomendaDAO.save(encomenda);
        return encomendaSalva;
    }
    
///////////// RECUPERA ENCOMENDA PELA ID ////////////////////////       

    @RequestMapping(path = "/encomendas/{id}", method = RequestMethod.GET)
    public Encomenda recuperar(@PathVariable int id) {
        Optional<Encomenda> findById = encomendaDAO.findById(id);
        if (findById.isPresent()) {
            return findById.get();
        } else {
            throw new NaoEncontrado("ENCOMENDA não encontrada");
        }
    }
    
///////////// ATUALIZA ENCOMENDA PELA ID ////////////////////////       

    @RequestMapping(path = "/encomendas/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void atualizar(@PathVariable int id, @RequestBody Encomenda encomenda){
        if(encomendaDAO.existsById(id)) {
            encomenda.setId(id);
            verificaEncomenda(encomenda);            
            encomendaDAO.save(encomenda);
                    
        } else {
        throw new NaoEncontrado("ENCOMENDA não encontrada");
        }
    }
    
///////////// APAGA ENCOMENDA PELA ID ////////////////////////       

    @RequestMapping(path = "/encomendas/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void apagar(@PathVariable int id) {
        if (encomendaDAO.existsById(id)) {
            encomendaDAO.deleteById(id);
        } else {
            throw new NaoEncontrado("ENCOMENDA não encontrada");
        }
    }
}