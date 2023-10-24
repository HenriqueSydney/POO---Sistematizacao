package br.com.henriquelima.dianome.packages;

import java.util.Collections;
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

import br.com.henriquelima.dianome.utils.RandomPackageCodeGenerator;
import br.com.henriquelima.dianome.utils.ResponseFormatter;
import br.com.henriquelima.dianome.utils.Utils;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/packages")
@CrossOrigin(origins = "http://localhost:5173")
public class PackageController {
    
    @Autowired
    private IPackageRepository packageRepository;

    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody PackageModel packageModel, HttpServletRequest request){
               
        try {
            packageModel.updatePackageModel();
        } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        

        RandomPackageCodeGenerator packageCode = new RandomPackageCodeGenerator();
        packageModel.setPackageCode(packageCode.getPackageCode());
                
        var createdPackage = this.packageRepository.save(packageModel);

        return ResponseEntity.status(HttpStatus.OK).body(createdPackage);
    }

    @GetMapping("/")
    public ResponseEntity<List<PackageDTO>> list(@RequestParam(required = false) String query, HttpServletRequest request){
        List<PackageModel> packages;
        if(query != null){
            PackageModel packageItem = this.packageRepository.findByPackageCode(query);
            if (packageItem != null) {
                packages = Collections.singletonList(packageItem);
            } else {
                packages = Collections.emptyList();
            }
        } else {
             packages = this.packageRepository.findAll();
        }
        
        List<PackageDTO> packageDTO = packages.stream()
            .map(packageModel -> new PackageDTO(packageModel))
            .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(packageDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable UUID id, HttpServletRequest request) {
        var savedPackage = this.packageRepository.findById(id).orElse(null);

        if(savedPackage == null){
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Pacote não encontrado");
        }

        return ResponseEntity.status(HttpStatus.OK).body(savedPackage);
    }

    @GetMapping("/byCode/{packageCode}")
    public ResponseEntity<?> getByPackageCode(@PathVariable String packageCode, HttpServletRequest request) {
        var savedPackage = this.packageRepository.findByPackageCode(packageCode);

        if(savedPackage == null){
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Pacote não encontrado");
        }

        return ResponseEntity.status(HttpStatus.OK).body(savedPackage);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody PackageModel packageModel, @PathVariable UUID id, HttpServletRequest request) {
        var savedPackage = this.packageRepository.findById(id).orElse(null);

        if(savedPackage == null){
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Pacote não encontrado");
        }

        try {
            packageModel.updatePackageModel();
        } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        Utils.copyNonNullProperties(packageModel, savedPackage);
        var updatedTask = this.packageRepository.save(savedPackage);

        return ResponseEntity.status(HttpStatus.OK).body(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id, HttpServletRequest request) {
        var savedPackage = this.packageRepository.findById(id).orElse(null);

        if(savedPackage == null){
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Pacote não encontrado");
        }

        String packageName = savedPackage.getItemName();

        this.packageRepository.delete(savedPackage);

        ResponseFormatter response = new ResponseFormatter("Pacote " + packageName + " removido com sucesso");
        String jsonResponse = response.toJson();

        return ResponseEntity.status(HttpStatus.OK).body(jsonResponse);
    }
}