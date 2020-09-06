package br.edu.ifrs.restinga.jim.dao;

import br.edu.ifrs.restinga.jim.modelo.Cliente;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteDao extends CrudRepository<Cliente,Integer >{
    
@Query(nativeQuery = true, value = "select * from cliente c inner join encomenda e on c.id = e.cliente_id inner join pizza p on p.id = e.pizza_id where p.nome = :nome")
    List <Cliente> listarClientesDumaPizza(@Param("nome") String nome);
    @Override
    List <Cliente> findAll();
    
}
