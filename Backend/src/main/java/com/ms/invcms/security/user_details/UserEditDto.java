package com.ms.invcms.security.user_details;

import lombok.Data;

import java.util.Collection;
@Data
public class UserEditDto {
    private String id;
    private String email;
    private String password;
    private String currentPassword;
    private String firstName;
    private String lastName;
    private Collection<Role> roles;
}
