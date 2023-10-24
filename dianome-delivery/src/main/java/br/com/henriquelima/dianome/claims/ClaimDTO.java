package br.com.henriquelima.dianome.claims;

import java.time.LocalDateTime;
import java.util.UUID;

import br.com.henriquelima.dianome.packages.PackageModel;
import lombok.Data;

@Data
public class ClaimDTO {
    private UUID id;
    private String claimantName;
    private Long phoneNumber;
    private String claimDescription;
    private String claimSolutionDescription;
    private PackageModel packageItem;
    private LocalDateTime createdAt;

    public ClaimDTO(ClaimModel claimModel) {
        this.id = claimModel.getId();
        this.claimantName = claimModel.getClaimantName();
        this.phoneNumber = claimModel.getPhoneNumber();
        this.claimDescription = claimModel.getClaimDescription();
        this.claimSolutionDescription = claimModel.getClaimSolutionDescription();
        this.packageItem = claimModel.getPackageModel();
        this.createdAt = claimModel.getCreatedAt();
    }

}
