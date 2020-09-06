package com.ms.invcms.security.user_details;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomGrantedAuthorityRepository extends JpaRepository<CustomGrantedAuthority,Long> {
    CustomGrantedAuthority findByAuthCode(String authCode);
}
