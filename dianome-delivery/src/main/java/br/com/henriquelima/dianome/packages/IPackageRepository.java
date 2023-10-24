package br.com.henriquelima.dianome.packages;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;


public interface IPackageRepository extends JpaRepository<PackageModel, UUID>{
    PackageModel findByPackageCode(String packageCode);
}
