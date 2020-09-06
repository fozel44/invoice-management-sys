package com.ms.invcms.invoice;

import com.ms.invcms.company.Company;
import com.ms.invcms.consultant.Consultant;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class InvoiceViewDto {
    private String id;
    private Months month;
    private int year;
    private BigDecimal amount;
    private BigDecimal taxAmount;
    private Company ownerCompany;
    private Company remoteCompany;
    private Consultant consultant;
    private String pdf;
    private String timesheet;

}

