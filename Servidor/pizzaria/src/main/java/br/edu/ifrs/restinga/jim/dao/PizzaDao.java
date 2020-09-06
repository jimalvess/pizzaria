package br.edu.ifrs.restinga.jim.dao;

import br.edu.ifrs.restinga.jim.modelo.Pizza;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PizzaDao extends CrudRepository<Pizza, Integer> {
    
    @Query(nativeQuery = true, value = "select * from pizza p inner join encomenda e on p.id = e.pizza_id inner join cliente c on c.id = e.cliente_id where c.nome = :nome")
    List <Pizza> listarPizzasDumCliente(@Param("nome") String nome);
    @Override
    List <Pizza> findAll();
    
}
