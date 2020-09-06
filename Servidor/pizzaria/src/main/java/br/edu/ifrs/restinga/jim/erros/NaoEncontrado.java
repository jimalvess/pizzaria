package br.edu.ifrs.restinga.jim.erros;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NaoEncontrado extends RuntimeException{
    public NaoEncontrado(String msg){
        super(msg);
    }
}