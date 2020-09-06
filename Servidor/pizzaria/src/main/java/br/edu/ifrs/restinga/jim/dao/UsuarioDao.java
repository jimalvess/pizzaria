package br.edu.ifrs.restinga.jim.dao;

import br.edu.ifrs.restinga.jim.modelo.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioDao extends CrudRepository <Usuario, Integer> {
    
}