package br.com.henriquelima.dianome.deliveryMen;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.henriquelima.dianome.enums.VehicleCapacityEnum;
import br.com.henriquelima.dianome.errors.InternalServerErrorException;
import br.com.henriquelima.dianome.utils.ResponseFormatter;
import br.com.henriquelima.dianome.utils.Utils;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/deliverymen")
@CrossOrigin(origins = "http://localhost:5173")
public class DeliveryManController {
    
    @Autowired
    private IDeliveryManRepository deliveryManRepository;

    private boolean isValidVehicleCapacity(VehicleCapacityEnum vehicleCapacity) {
        for (VehicleCapacityEnum validVehicleCapacity : VehicleCapacityEnum.values()) {           
            if (validVehicleCapacity.name().equals(vehicleCapacity)) {
                return true;
            }
        }
        return false;
    }
    
    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody DeliveryManModel deliveryManModel){
        var isDeliveryManAlreadyExists = this.deliveryManRepository.findByCpf(deliveryManModel.getCpf());

        if(isDeliveryManAlreadyExists != null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Entregador já cadastrado");
        }        
       
        if (isValidVehicleCapacity(deliveryManModel.getVehicleCapacity())) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Capacidade de veículo informada inválida");
        } 

        try {               
            var deliveryManCreated = this.deliveryManRepository.save(deliveryManModel);
            var deliveryManDTO = new DeliveryManDTO(deliveryManCreated);  
            return ResponseEntity.status(HttpStatus.CREATED).body(deliveryManDTO);
        } catch (Exception e) {
            throw new InternalServerErrorException(e.getMessage(), e);
        }
    }

    @GetMapping("/")
    public ResponseEntity<?> list(@RequestParam(required = false) String query, HttpServletRequest request){
       
        try {
            List<DeliveryManModel> deliveryMen;
            if(query != null){
                deliveryMen = this.deliveryManRepository.findManyByName(query);
            } else {
                deliveryMen = this.deliveryManRepository.findAll();
            }

            List<DeliveryManModel> filteredDeliveryMen = deliveryMen.stream()
            .filter(deliveryMenModel -> deliveryMenModel.getLogicalDelete() == null)
            .collect(Collectors.toList());

            List<DeliveryManDTO> deliveryMenDTO = filteredDeliveryMen.stream()
            .map(deliveryMenModel -> new DeliveryManDTO(deliveryMenModel))
            .collect(Collectors.toList());

            return ResponseEntity.status(HttpStatus.OK).body(deliveryMenDTO);
        } catch (Exception e){
             throw new InternalServerErrorException(e.getMessage(), e);
        }        
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable UUID id, HttpServletRequest request){
       
        try {
            var deliveryMan = this.deliveryManRepository.findById(id);

            if (!deliveryMan.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Entregador não localizado");
            } 

            return ResponseEntity.status(HttpStatus.OK).body(deliveryMan.get());
        } catch (Exception e) {
            throw new InternalServerErrorException(e.getMessage(), e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody DeliveryManModel deliveryManModel, @PathVariable UUID id, HttpServletRequest request) {
        var deliveryMan = this.deliveryManRepository.findById(id);

        if (deliveryMan.isPresent()) {
            DeliveryManModel existingDeliveryMan = deliveryMan.get();
        
            if (isValidVehicleCapacity(deliveryManModel.getVehicleCapacity())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Capacidade de veículo informada inválida");
            }
        
            Utils.copyNonNullProperties(deliveryManModel, existingDeliveryMan);

            try {
                var updatedDeliveryMan = this.deliveryManRepository.save(existingDeliveryMan);            
                return ResponseEntity.status(HttpStatus.OK).body(updatedDeliveryMan);
            } catch (Exception e) {
                throw new InternalServerErrorException(e.getMessage(), e);
            }
            
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Entregador não localizado");
        }
       
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id, HttpServletRequest request) {
        var savedDeliveryMan = this.deliveryManRepository.findById(id).orElse(null);

        if(savedDeliveryMan == null){
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Pacote não encontrado");
        }

        String deliveryManName = savedDeliveryMan.getName();
        savedDeliveryMan.setLogicalDelete(1);

       this.deliveryManRepository.save(savedDeliveryMan);


        ResponseFormatter response = new ResponseFormatter("Entregador " + deliveryManName + " removido com sucesso");
        String jsonResponse = response.toJson();

        return ResponseEntity.status(HttpStatus.OK).body(jsonResponse);
    }
}
