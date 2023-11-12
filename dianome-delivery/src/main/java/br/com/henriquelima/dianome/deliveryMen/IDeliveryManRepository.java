package br.com.henriquelima.dianome.deliveryMen;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IDeliveryManRepository extends JpaRepository<DeliveryManModel, UUID>{
    List<DeliveryManModel> findManyByName(String name);
    DeliveryManModel findByName(String name);
    DeliveryManModel findByCpf(String cpf);
    boolean existsByCpfAndIdNot(String cpf, UUID id);

}
