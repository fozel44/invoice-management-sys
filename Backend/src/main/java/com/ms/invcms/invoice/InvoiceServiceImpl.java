package com.ms.invcms.invoice;

import com.ms.invcms.base.Utils;
import com.ms.invcms.consultant.Consultant;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    InvoiceRepository invoiceRepository;

    private List<InvoiceViewDto> entitiesToView(List<Invoice> invoices) {
        List<InvoiceViewDto> invoiceViewDtos = new ArrayList<>();
        if (!CollectionUtils.isEmpty(invoices)) {
            for (Invoice invoice : invoices) {
                invoiceViewDtos.add(Utils.mapper(invoice, InvoiceViewDto.class));
            }
        }
        return invoiceViewDtos;
    }

    private Invoice getEntity(String id) throws Exception {
        return Utils.checkEntity(invoiceRepository, id, Invoice.class);
    }

    private InvoiceViewDto getView(String id) throws Exception {
        return getViewByEntity(getEntity(id));
    }

    private InvoiceViewDto getViewByEntity(Invoice entity) {
        return Utils.mapper(entity, InvoiceViewDto.class);
    }

    @Override
    public InvoiceViewDto findById(String id) throws Exception {
        return getView(id);
    }

    @Override
    public List<InvoiceViewDto> findAll() throws Exception {
        List<Invoice> invoices = invoiceRepository.findAll();
        List<InvoiceViewDto> invoiceViewDtos = entitiesToView(invoices);
        return invoiceViewDtos;
    }

    @Override
    public InvoiceViewDto add(InvoiceAddDto invoiceAddDto) throws Exception {
        Invoice invoice = Utils.mapper(invoiceAddDto, Invoice.class);
        Utils.setDefaultVariables(invoice);
        invoice.setTaxAmount(calculateTax(invoice.getAmount()));
        invoiceRepository.save(invoice);
        return getView(invoice.getId());
    }

    @Override
    public InvoiceEditDto editPrepare(String id) throws Exception {
        Invoice invoice = getEntity(id);
        return Utils.mapper(invoice, InvoiceEditDto.class);
    }

    @Override
    public InvoiceViewDto edit(InvoiceEditDto invoiceEditDto) throws Exception {
        Invoice invoice = getEntity(invoiceEditDto.getId());
        invoice.setId(invoiceEditDto.getId());
        invoice.setMonth(invoiceEditDto.getMonth());
        invoice.setYear(invoiceEditDto.getYear());
        invoice.setAmount(invoiceEditDto.getAmount());
        invoice.setTaxAmount(calculateTax(invoiceEditDto.getAmount()));
        invoice.setOwnerCompany(invoiceEditDto.getOwnerCompany());
        invoice.setRemoteCompany(invoiceEditDto.getRemoteCompany());
        invoice.setPdf(invoiceEditDto.getPdf());
        invoice.setTimesheet(invoiceEditDto.getTimesheet());
        Utils.setSystem(invoice);
        return getView(invoiceRepository.save(invoice).getId());
    }


    @Override
    public InvoiceViewDto activate(String id) throws Exception {
        Invoice entity = getEntity(id);
        entity.setActivated(true);
        Utils.setSystem(entity);
        invoiceRepository.save(entity);
        return getView(entity.getId());
    }


    @Override
    public InvoiceViewDto deactivate(String id) throws Exception {
        Invoice entity = getEntity(id);
        entity.setActivated(false);
        Utils.setSystem(entity);
        invoiceRepository.save(entity);
        return getView(entity.getId());
    }


    @Override
    public InvoiceViewDto trash(String id) throws Exception {
        Invoice invoice = getEntity(id);
        invoice.setTrash(UUID.randomUUID().toString());
        Utils.setSystem(invoice);
        return getView(invoice.getId());
    }

    /**********************************************************************************************************************/

    public BigDecimal calculateTax(BigDecimal amount){
        BigDecimal tax=new BigDecimal("0.18");
        return amount.multiply(tax);
    }

    public List<InvoiceViewDto> getInvoiceListByConsultantId(String id) throws Exception {
        List<InvoiceViewDto> allInvoice =findAll();
        return allInvoice.stream()
                .filter(i -> i.getConsultant().getId().equals(id))
                .collect(Collectors.toList());
    }

    public List<InvoiceViewDto> getOwnerInvoiceListByConsultantId(String id) throws Exception {
        List<InvoiceViewDto> allInvoice =findAll();
        return allInvoice.stream()
                .filter(i -> i.getConsultant().getId().equals(id) &&
                        i.getConsultant().getOwnedCompany().equals(i.getOwnerCompany()))
                .collect(Collectors.toList());
    }

    @Override
    public List<InvoiceViewDto> getRemoteInvoiceListByConsultantId(String id) throws Exception {
        List<InvoiceViewDto> allInvoice = findAll();
        return allInvoice.stream()
                .filter(i -> i.getConsultant().getId().equals(id) &&
                        i.getConsultant().getWorkedCompany().equals(i.getRemoteCompany()))
                .collect(Collectors.toList());
    }

    @Override
    public List<InvoiceViewDto> getInvoiceListByCompanyId(String id) throws Exception {
        List<InvoiceViewDto> allInvoice =findAll();
        return allInvoice.stream()
                .filter(i -> i.getOwnerCompany().getId().equals(id)||i.getRemoteCompany().getId().equals(id))
                .collect(Collectors.toList());
    }

    @Override
    public List<InvoiceViewDto> getOwnerInvoiceListByCompanyId(String id) throws Exception {
        List<InvoiceViewDto> allInvoice =findAll();
        return allInvoice.stream().filter(i -> i.getOwnerCompany().getId().equals(id)).collect(Collectors.toList());
    }

    @Override
    public List<InvoiceViewDto> getRemoteInvoiceListByCompanyId(String id) throws Exception {
        List<InvoiceViewDto> allInvoice =findAll();
        return allInvoice.stream()
                .filter(i -> i.getRemoteCompany().getId().equals(id))
                .collect(Collectors.toList());
    }

    @Override
    public List<InvoiceViewDto> getFilteredInvoiceListByCompanies(String xid, String yid) throws Exception {
        List<InvoiceViewDto> allInvoice =findAll();
        return allInvoice.stream()
                .filter(i -> i.getOwnerCompany().getId().equals(xid) &&
                        i.getRemoteCompany().getId().equals(yid))
                .collect(Collectors.toList());
    }

    @Override
    public List<InvoiceViewDto> getFilteredInvoiceListByCompaniesAndConsultantId(String xid, String yid, String cid) throws Exception {
        List<InvoiceViewDto> allInvoice =findAll();
        return allInvoice.stream()
                .filter(i -> i.getOwnerCompany().getId().equals(xid) &&
                        i.getRemoteCompany().getId().equals(yid) &&
                        i.getConsultant().getId().equals(cid))
                .collect(Collectors.toList());
    }


}