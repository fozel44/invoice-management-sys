package com.ms.invcms.security.user_details;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user-security")
@CrossOrigin
public class UserController {

    @Autowired
    CustomUserDetailsService customuserDetailsService;

    @GetMapping("/current-user")
    public UserViewDto getCurrentUser(){
        return customuserDetailsService.getCurrentUserView();
    }

}
