package br.com.henriquelima.dianome.enums;

public enum StatusEnum {
    DELIVERED("Entregue"),
    WAITING_FOR_DISTRIBUTION("Aguardando distribuição"),
    WAITING_FOR_DELIVER("Aguardando entrega");

    private String value;

    StatusEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    
}
