package com.ms.invcms.security.user_details;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomUserDetailsRepository extends JpaRepository<CustomUserDetails,String> {

     CustomUserDetails findByEmail(String email);




}
