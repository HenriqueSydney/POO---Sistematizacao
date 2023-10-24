package br.com.henriquelima.dianome.packages;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import br.com.henriquelima.dianome.claims.ClaimModel;
import br.com.henriquelima.dianome.deliveryMen.DeliveryManModel;
import jakarta.persistence.EnumType;
import br.com.henriquelima.dianome.enums.StatusEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity(name = "tb_package")
public class PackageModel {
    //Controlar os pacotes (código de rastreamento, data de recebimento, status, entregador e data de entrega)
    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;

    @Column(length = 50)
    private String itemName;

    private String packageCode;

    private LocalDateTime receivedDateTime;

    private LocalDateTime deliveredDateTime;

    @Enumerated(EnumType.STRING)
    private StatusEnum status;   
    
    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToOne 
    @JoinColumn(name = "idDeliveryMan", nullable = true)
    @JsonIdentityReference(alwaysAsId = true)
    private DeliveryManModel deliveryMan;

    @OneToMany(mappedBy = "packageModel")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    private List<ClaimModel> claims; 

    public void setItemName(String itemName) throws Exception {
        if(itemName.length() > 50){
            throw new Exception("O campo Nome do Item (itemName) deve conter no máximo 50 caracteres");
        }

        this.itemName = itemName;
    }

    public void updatePackageModel() throws Exception {
        var currentDate = LocalDateTime.now();   
        if(currentDate.isAfter(this.getReceivedDateTime())){
             throw new Exception("A data de recebimento do produto deve ser menor ou igual a data atual");
        }

        if(this.getDeliveredDateTime() != null && this.getDeliveredDateTime().isBefore(this.getReceivedDateTime())){
             throw new Exception("A data de entrega deve ser maior que a data de recebimento");
        }

        if(this.getDeliveredDateTime() != null){
            this.setStatus(StatusEnum.DELIVERED);
        } else if (this.getDeliveryMan() == null) {
            this.setStatus(StatusEnum.WAITING_FOR_DISTRIBUTION);
        } else {
            this.setStatus(StatusEnum.WAITING_FOR_DELIVER);
        }
    }

    public void startApplication(){
        Random random = new Random();
        int randomNumber = random.nextInt(100) + 1;
        this.itemName = "Item de exemplo " + randomNumber;
        var currentDate = LocalDateTime.now();
        this.receivedDateTime = currentDate;
        this.status = StatusEnum.WAITING_FOR_DISTRIBUTION;        
    }

}
