package br.com.henriquelima.dianome.packages;

import java.time.LocalDateTime;
import java.util.UUID;

import br.com.henriquelima.dianome.deliveryMen.DeliveryManModel;
import lombok.Data;

@Data
public class PackageDTO {
    private UUID id;
    private String itemName;
    private String status;
    private LocalDateTime deliveredDateTime;
    private LocalDateTime receivedDateTime;
    private DeliveryManModel deliveryMan;
    private String packageCode;

    public PackageDTO(PackageModel packageModel) {
        this.id = packageModel.getId();
        this.itemName = packageModel.getItemName();
        this.status = packageModel.getStatus().getValue();
        this.packageCode = packageModel.getPackageCode();
        this.deliveredDateTime = packageModel.getDeliveredDateTime();
        this.receivedDateTime = packageModel.getReceivedDateTime();
        if(packageModel.getDeliveryMan() != null){
            this.deliveryMan = packageModel.getDeliveryMan();
        } else {
            this.deliveryMan = null;
        }
        
    }

}
