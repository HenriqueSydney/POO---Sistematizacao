package br.com.henriquelima.dianome.deliveryMen;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import br.com.henriquelima.dianome.enums.VehicleCapacityEnum;
import br.com.henriquelima.dianome.packages.PackageModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity(name = "tb_delivery_man")
public class DeliveryManModel {   

    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;

    @Column(unique = true)
    private String cpf;

    @Column(length = 100)
    private String name;
    
    @Column()
    private Integer logicalDelete;

    @Enumerated
    private VehicleCapacityEnum vehicleCapacity;
    

    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "deliveryMan")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    private List<PackageModel> packages; 

    public void setName(String name) throws Exception {
        if(name.length() > 100){
            throw new Exception("O campo Nome do Entregador (name) deve conter no máximo 100 caracteres");
        }

        this.name = name;
    }

    public void setCpf(String cpf) throws Exception {
        if(cpf.length() != 11){
            throw new Exception("O campo CPF deve ter no 11 dígitos");
        }

        this.cpf = cpf;
    }

    public void startApplication(){
        Random random = new Random();
        int randomNumber = random.nextInt(9000) + 1;
        long randomCpfLong = (long) (Math.random() * (99999999999L - 11111111111L + 1) + 11111111111L);
        String randomCpf = String.valueOf(randomCpfLong);
        try {
            this.setName("Entregador " + randomNumber);          
            
            this.setCpf(randomCpf);
        } catch (Exception e){
            System.out.println(e.getMessage());
        }
       
        this.setVehicleCapacity(VehicleCapacityEnum.BIG); 
          
    }


}
