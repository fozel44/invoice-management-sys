package com.ms.invcms.company;

import com.ms.invcms.base.BaseEntity;
import com.ms.invcms.phone.Phone;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "company")
public class Company extends BaseEntity {

    private String name;
    private String logo;
    private String taxIdentificationNumber;
    private String taxOffice;

    @OneToOne
    private Phone phone;
    private String address;
    private String description;



}