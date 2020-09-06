package com.ms.invcms.consultant;


import com.ms.invcms.company.Company;
import com.ms.invcms.phone.Phone;
import com.ms.invcms.security.user_details.CustomUserDetails;
import lombok.Data;

import javax.persistence.Column;


@Data
public class ConsultantEditDto {

    private String id;
    private String userId;

    private String firstName;
    private String lastName;
    private String password;
    private String currentPassword;

    private String email;

    private String photo;
    private Phone phone;
    private String address;
    private String identityNo;
    private Company ownedCompany;
    private Company workedCompany;
}

