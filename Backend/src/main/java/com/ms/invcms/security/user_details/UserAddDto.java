package com.ms.invcms.security.user_details;

import lombok.Data;


import java.util.Collection;

@Data
public class UserAddDto {

    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private Collection<Role> roles;

}
