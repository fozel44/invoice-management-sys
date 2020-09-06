package com.ms.invcms.consultant;


import com.ms.invcms.company.Company;
import com.ms.invcms.phone.Phone;
import com.ms.invcms.security.user_details.CustomUserDetails;
import com.ms.invcms.security.user_details.Role;
import com.ms.invcms.security.user_details.UserViewDto;
import lombok.Data;

import java.util.Collection;

@Data
public class ConsultantViewDto {
    private String id;
    private UserViewDto user;
    private String photo;
    private Phone phone;
    private String address;
    private String identityNo;
    private Company ownedCompany;
    private Company workedCompany;
}