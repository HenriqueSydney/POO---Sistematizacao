package br.com.henriquelima.dianome.deliveryMen;

import java.util.List;
import java.util.UUID;

import br.com.henriquelima.dianome.packages.PackageModel;
import lombok.Data;

@Data
public class DeliveryManDTO {
    private UUID id;
    private String name;
    private String cpf;
    private String vehicleCapacity;
    private List<PackageModel> packages;

    public DeliveryManDTO(DeliveryManModel deliveryManModel) {
        this.id = deliveryManModel.getId();
        this.name = deliveryManModel.getName();
        this.cpf = deliveryManModel.getCpf();
        this.vehicleCapacity = deliveryManModel.getVehicleCapacity().getValue();
        this.packages = deliveryManModel.getPackages();
    }

}
