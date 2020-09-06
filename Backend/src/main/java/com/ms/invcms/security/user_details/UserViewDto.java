package com.ms.invcms.security.user_details;

import lombok.Data;

import java.util.Collection;

@Data
public class UserViewDto {
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private Collection<Role> roles;
    private Collection<CustomGrantedAuthority> authorities;

}

