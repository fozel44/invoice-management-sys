package com.ms.invcms.invoice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/invoice")
@CrossOrigin
public class InvoiceController {


    @Autowired
    InvoiceService invoiceService;

    @GetMapping("/get-all")
    public List<InvoiceViewDto> findAll() throws Exception {
        return invoiceService.findAll();
    }

    @GetMapping("/view/{id}")
    public InvoiceViewDto findById(@PathVariable String id) throws Exception {
        return invoiceService.findById(id);
    }

    @GetMapping("/add-prepare")
    public InvoiceAddDto addPrepare() {
        return new InvoiceAddDto();
    }

    @PostMapping("/add")
    public InvoiceViewDto add(@RequestBody InvoiceAddDto invoiceAddDto) throws Exception {
        return invoiceService.add(invoiceAddDto);
    }

    @GetMapping("/edit-prepare/{id}")
    public InvoiceEditDto editPrepare(@PathVariable String id) throws Exception {
        return invoiceService.editPrepare(id);
    }

    @PostMapping("/edit")
    public InvoiceViewDto edit(@RequestBody InvoiceEditDto invoiceEditDto) throws Exception {
        return invoiceService.edit(invoiceEditDto);
    }

    @GetMapping("/activate/{id}")
    public InvoiceViewDto activate(@PathVariable("id") String id) throws Exception {
        return invoiceService.activate(id);
    }

    @GetMapping("/deactivate/{id}")
    public InvoiceViewDto deactivate(@PathVariable("id") String id) throws Exception {
        return invoiceService.deactivate(id);
    }

    @GetMapping("/trash/{id}")
    public InvoiceViewDto trash(@PathVariable String id) throws Exception {
        return invoiceService.trash(id);
    }

    /******************************************************************************************************************/

    @GetMapping("/get-invoices-by-consultantid/{id}")
    public List<InvoiceViewDto> getInvoiceListByConsultantId(@PathVariable String id) throws Exception {
        return invoiceService.getInvoiceListByConsultantId(id);
        //danışmanın geçtiği tüm faturaları getirir (onun kestıgı,onun ıcın kesılen)
    }

    @GetMapping("/get-owner-invoices-by-consultant-id/{id}")
    public List<InvoiceViewDto> getOwnerInvoiceListByConsultantId(@PathVariable String id) throws Exception {
        return invoiceService.getOwnerInvoiceListByConsultantId(id);
    }

    @GetMapping("/get-remote-invoices-by-consultant-id/{id}")
    public List<InvoiceViewDto> getRemoteInvoiceListByConsultantId(@PathVariable String id) throws Exception {
        return invoiceService.getRemoteInvoiceListByConsultantId(id);
    }

    @GetMapping("/get-invoices-by-companyid/{id}")
    public List<InvoiceViewDto> getInvoiceListByCompanyId(@PathVariable String id) throws Exception {
        return invoiceService.getInvoiceListByCompanyId(id);
        //Şirketin geçtiği tüm faturaları getirir (onun kestıgı,onun ıcın kesılen)
    }

    @GetMapping("/get-owner-invoices-by-company-id/{id}")
    public List<InvoiceViewDto> getOwnerInvoiceListByCompanyId(@PathVariable String id) throws Exception {
        return invoiceService.getOwnerInvoiceListByCompanyId(id);
    }

    @GetMapping("/get-remote-invoices-by-company-id/{id}")
    public List<InvoiceViewDto> getRemoteInvoiceListByCompanyId(@PathVariable String id) throws Exception {
        return invoiceService.getRemoteInvoiceListByCompanyId(id);
    }

    @GetMapping("/get-filtered-invoices-by-companies/{xid}/{yid}")
    public List<InvoiceViewDto> getFilteredInvoiceListByCompanies(@PathVariable String xid,@PathVariable String yid) throws Exception {
        return invoiceService.getFilteredInvoiceListByCompanies(xid,yid);
    }

    @GetMapping("/get-filtered-invoices-by-companies-and-consultant-id/{xid}/{yid}/{cid}")
    public List<InvoiceViewDto> getFilteredInvoiceListByCompaniesAndConsultantId(@PathVariable String xid,@PathVariable String yid,@PathVariable String cid) throws Exception {
        return invoiceService.getFilteredInvoiceListByCompaniesAndConsultantId(xid,yid,cid);
    }








}
