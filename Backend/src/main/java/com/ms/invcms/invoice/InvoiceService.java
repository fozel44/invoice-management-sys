package com.ms.invcms.invoice;

import java.util.List;


public interface InvoiceService {

    InvoiceViewDto findById(String id) throws Exception;

    List<InvoiceViewDto> findAll() throws Exception;

    InvoiceViewDto add(InvoiceAddDto invoiceAddDto) throws Exception;

    InvoiceEditDto editPrepare(String id) throws Exception;

    InvoiceViewDto edit(InvoiceEditDto invoiceEditDto) throws Exception;

    InvoiceViewDto activate(String id) throws Exception;

    InvoiceViewDto deactivate(String id) throws Exception;

    InvoiceViewDto trash(String id) throws Exception;

    /******************************************************************************************************************/

    List<InvoiceViewDto> getInvoiceListByConsultantId(String id) throws Exception;//bulunduug tum faturalar

    List<InvoiceViewDto> getOwnerInvoiceListByConsultantId(String id) throws Exception; //kestıgı faturalar

    List<InvoiceViewDto> getRemoteInvoiceListByConsultantId(String id) throws Exception; //bu danısman ıcın çaliştığı firmaya kesılen faturalar

    List<InvoiceViewDto> getInvoiceListByCompanyId(String id) throws Exception;//company için bulunduug tum faturalar

    List<InvoiceViewDto> getOwnerInvoiceListByCompanyId(String id) throws Exception; //şirketin kestiği faturalar

    List<InvoiceViewDto> getRemoteInvoiceListByCompanyId(String id) throws Exception; //şirkete kesilen faturalar

    List<InvoiceViewDto> getFilteredInvoiceListByCompanies(String xid, String yid) throws Exception; //x şirketinin y şirketine kestiği faturalar

    List<InvoiceViewDto> getFilteredInvoiceListByCompaniesAndConsultantId(String xid, String yid, String cid) throws Exception; //x şirketinin y şirketine c için kestiği faturalar

}