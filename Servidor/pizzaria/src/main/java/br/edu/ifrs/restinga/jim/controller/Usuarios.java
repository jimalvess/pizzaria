//LOCALHOST:8080/api/usuarios/
package br.edu.ifrs.restinga.jim.controller;

import br.edu.ifrs.restinga.jim.dao.EncomendaDao;
import br.edu.ifrs.restinga.jim.dao.UsuarioDao;
import br.edu.ifrs.restinga.jim.erros.NaoEncontrado;
import br.edu.ifrs.restinga.jim.erros.Proibido;
import br.edu.ifrs.restinga.jim.erros.RequisicaoInvalida;
import br.edu.ifrs.restinga.jim.modelo.Encomenda;
import br.edu.ifrs.restinga.jim.modelo.Usuario;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api")
public class Usuarios {

    @Autowired
    UsuarioDao usuarioDAO;
    
    @Autowired
    EncomendaDao encomendaDAO;
    
///////////// VALIDAÇÕES ////////////////////////    
    
    public void validaUsuario(Usuario usuario){
        if (usuario.getNome() == null || usuario.getNome().isEmpty()){
            throw new RequisicaoInvalida("NOME do usuário é obrigatório");
        }
        if (usuario.getLogin()== null || usuario.getLogin().isEmpty()){
            throw new RequisicaoInvalida("LOGIN do usuário é obrigatório");
        }
        if (usuario.getSenha() == null || usuario.getSenha().isEmpty()){
            throw new RequisicaoInvalida("SENHA do usuário é obrigatória");
        }
    }
    
///////////// LISTAR USUÁRIOS ////////////////////////       

    @RequestMapping(path = "/usuarios/", method = RequestMethod.GET)
    public Iterable<Usuario> listar() {
        return usuarioDAO.findAll();
    }

///////////// INSERIR USUÁRIO ////////////////////////           
    
    @RequestMapping(path = "/usuarios/", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario inserir(@RequestBody Usuario usuario) {
        usuario.setId(0);
        validaUsuario(usuario);
        Iterable<Usuario> usuarios = usuarioDAO.findAll();
        boolean loginIgual = false;
        for (Usuario loginEntrada : usuarios) {
            if (loginEntrada.getLogin().equals(usuario.getLogin())) {
                loginIgual = true;
                break;
            }
        }
        if (loginIgual== true) {
            throw new RequisicaoInvalida("Este login JÁ EXISTE. Escolha outro");
            
        }
        return usuarioDAO.save(usuario);
    }
    
///////////// RECUPERAR USUÁRIO PELA ID ////////////////////////               

    @RequestMapping(path = "/usuarios/{id}", method = RequestMethod.GET)
    public Usuario recuperar(@PathVariable int id) {
        Optional<Usuario> findById = usuarioDAO.findById(id);
        if (findById.isPresent()) {
            return findById.get();
        } else {
            throw new NaoEncontrado("USUÁRIO não encontrado");
        }
    }
    
///////////// ATUALIZAR USUÁRIO PELA ID ////////////////////////               

    @RequestMapping(path = "/usuarios/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public void atualizar(@PathVariable int id, @RequestBody Usuario usuario){
        if (usuarioDAO.existsById(id)){
            usuario.setId(id);
            validaUsuario(usuario);
            usuarioDAO.save(usuario);
        }else{
            throw new NaoEncontrado("USUÁRIO não encontrado");
        }
    }
    
///////////// APAGAR USUÁRIO PELA ID ////////////////////////               
    
    @RequestMapping(path = "/usuarios/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void apagar(@PathVariable int id){
         List<Encomenda> encomendas = (List<Encomenda>) encomendaDAO.findAll();
         encomendas.stream().filter((listaEncomendas) -> (listaEncomendas.getUsuario().getId() == id)).forEachOrdered((_item) -> {
             throw new Proibido("ATENÇÃO: Usuário com encomenda ativa. Exclua a encomenda antes de remover este usuário");
        });
        if (usuarioDAO.existsById(id)){
            usuarioDAO.deleteById(id);
        }else {
            throw new NaoEncontrado("USUÁRIO não encontrado");
        }
    } 
}