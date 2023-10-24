package br.com.henriquelima.dianome.claims;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;


public interface IClaimRepository extends JpaRepository<ClaimModel, UUID>{
    List<ClaimModel> findByClaimantName(String name);
    ClaimModel findByPackageModelId(UUID idPackage);
}
