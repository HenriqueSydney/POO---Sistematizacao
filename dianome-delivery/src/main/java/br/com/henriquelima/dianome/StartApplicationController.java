package br.com.henriquelima.dianome;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.henriquelima.dianome.deliveryMen.DeliveryManModel;
import br.com.henriquelima.dianome.deliveryMen.IDeliveryManRepository;
import br.com.henriquelima.dianome.enums.StatusEnum;
import br.com.henriquelima.dianome.errors.InternalServerErrorException;
import br.com.henriquelima.dianome.packages.IPackageRepository;
import br.com.henriquelima.dianome.packages.PackageModel;
import br.com.henriquelima.dianome.utils.RandomPackageCodeGenerator;
import br.com.henriquelima.dianome.utils.ResponseFormatter;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/start-application")
@CrossOrigin(origins = "http://localhost:5173")
public class StartApplicationController {
    
    @Autowired
    private IPackageRepository packageRepository;


     @Autowired
    private IDeliveryManRepository deliveryManRepository;

    @PostMapping("/")
    public ResponseEntity<?> create(HttpServletRequest request){
        try{
            for (int i = 0; i < 5; i++) {
                    DeliveryManModel deliveryMan = new DeliveryManModel();
                    deliveryMan.startApplication();
                    this.deliveryManRepository.save(deliveryMan);
            }
                
            for(int i = 0; i <= 5; i++){
                PackageModel packageModel = new PackageModel();
                packageModel.startApplication();

                List<DeliveryManModel> allDeliveryMen = deliveryManRepository.findAll();

                int randomIndex = (int) (Math.random() * allDeliveryMen.size());

                DeliveryManModel randomDeliveryMan = allDeliveryMen.get(randomIndex);
                RandomPackageCodeGenerator packageCode = new RandomPackageCodeGenerator();
                packageModel.setPackageCode(packageCode.getPackageCode());
                packageModel.setDeliveryMan(randomDeliveryMan);
                packageModel.setStatus(StatusEnum.WAITING_FOR_DELIVER);
                this.packageRepository.save(packageModel);
            }

            ResponseFormatter response = new ResponseFormatter("Aplicação inicializada com a criação de 5 pacotes randômicos e 5 entregadores randômicos");
            String jsonResponse = response.toJson();
            return ResponseEntity.status(HttpStatus.OK).body(jsonResponse);
        }catch (Exception e){
            throw new InternalServerErrorException(e.getMessage());
       }  
    }
}

