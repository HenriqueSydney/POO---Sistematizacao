package br.com.henriquelima.dianome.errors;

public class InternalServerErrorException extends RuntimeException {

    public InternalServerErrorException(String message) {
        super("Ocorreu um erro interno ao processar a solicitação." + (message != null ? " " + message : ""));
    }
}