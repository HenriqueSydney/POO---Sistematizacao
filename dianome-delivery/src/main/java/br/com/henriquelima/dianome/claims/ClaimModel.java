package br.com.henriquelima.dianome.claims;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIdentityReference;

import br.com.henriquelima.dianome.packages.PackageModel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity(name = "tb_claim")
public class ClaimModel {   

    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;

    @Column(length = 100)
    private String claimantName;

    @Column
    private Long phoneNumber;

    @Column(length = 1000)
    private String claimDescription;

    @Column(length = 1000)
    private String claimSolutionDescription;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToOne 
    @JoinColumn(name = "package_id", nullable = true)    
    @JsonIdentityReference(alwaysAsId = true)
    private PackageModel packageModel;

    public void setClaimantName(String claimantName) throws Exception {
        if(claimantName.length() > 100){
            throw new Exception("O campo Nome do Reclamante deve conter no máximo 100 caracteres");
        }

        this.claimantName = claimantName;
    }

     public void setClaimDescription(String claimDescription) throws Exception {
        if(claimDescription.length() > 1000){
            throw new Exception("O campo da descrição da reclamação pode ter no máximo 1000 caracteres");
        }

        this.claimDescription = claimDescription;
    }

     public void setClaimSolutionDescription(String claimSolutionDescription) throws Exception {
        if(claimSolutionDescription.length() > 1000){
            throw new Exception("O campo da descrição da solução pode ter no máximo 1000 caracteres");
        }

        this.claimSolutionDescription = claimSolutionDescription;
    }

}
