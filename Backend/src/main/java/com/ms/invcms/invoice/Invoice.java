package com.ms.invcms.invoice;

import com.ms.invcms.base.BaseEntity;
import com.ms.invcms.company.Company;
import com.ms.invcms.consultant.Consultant;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "invoice")
@Data
public class Invoice extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(name = "month")
    private Months month;

    @Column(name = "year")
    private int year;

    @Column(name = "amount")
    private BigDecimal amount;


    @Column(name = "tax_amount")
    private BigDecimal taxAmount;

    private String pdf;
    private String timesheet;

    @ManyToOne
    private Company ownerCompany;

    @ManyToOne
    private Company remoteCompany;

    @ManyToOne
    private Consultant consultant;
}
