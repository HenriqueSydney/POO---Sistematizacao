package br.com.henriquelima.dianome.enums;

public enum VehicleCapacityEnum {
    SMALL("Pequenos Volumes"),
    MEDIUM("Médio Volumes"),
    BIG("Grandes Volumes");

    private String value;

    VehicleCapacityEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
