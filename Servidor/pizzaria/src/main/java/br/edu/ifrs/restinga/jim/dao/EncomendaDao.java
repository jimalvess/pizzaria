package br.edu.ifrs.restinga.jim.dao;

import br.edu.ifrs.restinga.jim.modelo.Encomenda;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EncomendaDao extends CrudRepository<Encomenda, Integer>{
    
    
}
