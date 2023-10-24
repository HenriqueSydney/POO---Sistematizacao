package br.com.henriquelima.dianome.claims;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.henriquelima.dianome.utils.ResponseFormatter;
import br.com.henriquelima.dianome.utils.Utils;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/claims")
@CrossOrigin(origins = "http://localhost:5173")
public class ClaimController {
    
    @Autowired
    private IClaimRepository claimRepository;

    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody ClaimModel claimModel){   
        System.out.println(claimModel);
        UUID packageId = claimModel.getPackageModel().getId();
        var isClaimForPackageExists = this.claimRepository.findByPackageModelId(packageId);

        if(isClaimForPackageExists != null && isClaimForPackageExists.getClaimSolutionDescription() == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Uma reclamação acerca do pedido já foi criada e ainda está aberta. Aguarde o encerramento para abrir uma nova reclamação");
        }
        
        var claimCreated = this.claimRepository.save(claimModel);
        var claimDTO = new ClaimDTO(claimCreated);
        return ResponseEntity.status(HttpStatus.CREATED).body(claimDTO);
    }

    @GetMapping("/")
    public ResponseEntity<List<ClaimDTO>> list( 
    @RequestParam(name = "claimantName", required = false) String claimantName,
    HttpServletRequest request){
        List<ClaimModel> claims;
        if(claimantName != null){
            claims = this.claimRepository.findByClaimantName(claimantName);          
        } else{
            claims = this.claimRepository.findAll();  
        }

        List<ClaimDTO> claimDTO = claims.stream()
        .map(claimModel -> new ClaimDTO(claimModel))
        .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(claimDTO);
    }

     @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable UUID id, HttpServletRequest request){
       
        var claim = this.claimRepository.findById(id);

        if (claim.isPresent()) {
            ClaimModel existingClaim = claim.get();
        
            ClaimDTO claimDTO = new ClaimDTO(existingClaim);

            return ResponseEntity.status(HttpStatus.OK).body(claimDTO);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Entregador não localizado");
        } 
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> patch(@RequestBody ClaimModel claimModel, @PathVariable UUID id, HttpServletRequest request) {
        var claimOptional = this.claimRepository.findById(id);

        if (claimOptional.isEmpty()) {
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Reclamação não localizada");
        }       
        
        ClaimModel claim = claimOptional.get();

        Utils.copyNonNullProperties(claimModel, claim);

        var updatedClaim = this.claimRepository.save(claim);

        ClaimDTO updatedClaimDTO = new ClaimDTO(updatedClaim);
        
        return ResponseEntity.status(HttpStatus.OK).body(updatedClaimDTO);
    }

     @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id, HttpServletRequest request) {
        var savedClaim = this.claimRepository.findById(id).orElse(null);

        if(savedClaim == null){
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Reclamação não localizada");
        }

        String claimantName = savedClaim.getClaimantName();

        this.claimRepository.delete(savedClaim);

        ResponseFormatter response = new ResponseFormatter("Reclamação do(a) Sr(a). " + claimantName + " removida com sucesso");
        String jsonResponse = response.toJson();

        return ResponseEntity.status(HttpStatus.OK).body(jsonResponse);
    }
}
