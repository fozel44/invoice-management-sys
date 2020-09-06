package com.ms.invcms.base;

import com.ms.invcms.security.user_details.CustomUserDetails;
import com.ms.invcms.security.user_details.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationProvider {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    public CustomUserDetails getCustomUserDetails(){
        return customUserDetailsService.getCurrentUser();
    }
}
