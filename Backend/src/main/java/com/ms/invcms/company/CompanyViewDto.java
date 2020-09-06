package com.ms.invcms.company;

import com.ms.invcms.phone.Phone;
import lombok.Data;

@Data
public class CompanyViewDto {

    private String id;
    private String name;
    private String logo;
    private String taxIdentificationNumber;
    private String taxOffice;
    private Phone phone;
    private String address;
    private String description;



}

