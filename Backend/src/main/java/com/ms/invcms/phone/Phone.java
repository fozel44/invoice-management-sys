package com.ms.invcms.phone;

import com.ms.invcms.base.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Table;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "phone")
@Data
public class Phone extends BaseEntity {
    private String countryCode;
    private String dialCode;
    private String e164Number;
    private String internationalNumber;
    private String nationalNumber;
    private String number;

}
