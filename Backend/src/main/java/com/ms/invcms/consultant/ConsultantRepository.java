package com.ms.invcms.consultant;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultantRepository extends JpaRepository<Consultant, String> {

    Consultant findByIdentityNo(String tc);
    Consultant findByUserId(String id);
}
