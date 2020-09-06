package com.ms.invcms.consultant;


import com.ms.invcms.company.Company;
import com.ms.invcms.phone.Phone;
import com.ms.invcms.security.user_details.Role;
import lombok.Data;

import java.util.Collection;
import java.util.List;

@Data
public class ConsultantAddDto {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String photo;
    private Phone phone;
    private String address;
    private String identityNo;
    private Company ownedCompany;
    private Company workedCompany;

}