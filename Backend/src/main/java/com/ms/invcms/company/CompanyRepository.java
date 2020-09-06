package com.ms.invcms.company;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {

    Company findByTaxIdentificationNumber(String tin);
}
