export const API_VERSION = '/api/v1';
export const API_ENDPOINT = 'http://localhost:8080';
export const API_ENDPOINTWITHVERSION = API_ENDPOINT + API_VERSION;



export const ApiGateway = {

  api: API_ENDPOINTWITHVERSION,
  consultantPath: "/consultant",
  invoicePath: "/invoice",
  userPath: "/user",
  companyPath: "/company"
};

export const ConsultantApi = {
  getConsultantByIdentityNo: ApiGateway.api + ApiGateway.consultantPath + "/get-by-identity-no/",
  getConsultantListByCompanyId: ApiGateway.api + ApiGateway.consultantPath + "/get-consultants-by-company-id/",
  getStavesListByCompanyId: ApiGateway.api + ApiGateway.consultantPath + "/get-staff-by-company-id/",
  getConsultantByUserId:ApiGateway.api+ApiGateway.consultantPath+"/get-consultant-by-user-id/"
};



export const InvoiceApi = {
  getInvoiceListByConsultantId: ApiGateway.api + ApiGateway.invoicePath + "/get-invoices-by-consultantid/",
  getOwnerInvoiceListByConsultantId: ApiGateway.api + ApiGateway.invoicePath + "/get-owner-invoices-by-consultant-id/",
  getRemoteInvoiceListByConsultantId: ApiGateway.api + ApiGateway.invoicePath + "/get-remote-invoices-by-consultant-id/",
  getInvoiceListByCompanyId: ApiGateway.api + ApiGateway.invoicePath + "/get-invoices-by-companyid/",
  getOwnerInvoiceListByCompanyId: ApiGateway.api + ApiGateway.invoicePath + "/get-owner-invoices-by-company-id/",
  getRemoteInvoiceListByCompanyId: ApiGateway.api + ApiGateway.invoicePath + "/get-remote-invoices-by-company-id/",
  getFilteredInvoiceListByCompanies: ApiGateway.api + ApiGateway.invoicePath + "/get-filtered-invoices-by-companies/",// 2 parameter
  getFilteredInvoiceListByCompaniesandConsultantid: ApiGateway.api + ApiGateway.invoicePath + "/get-filtered-invoices-by-companies-and-consultant-id/"  // 3 parameter





};



export const CompanyApi = {
  getbyTin: ApiGateway.api + ApiGateway.companyPath + "/get-by-tin/",
  getbyTc: ApiGateway.api + ApiGateway.companyPath + "/get-by-tc/",
  getConsultantbyCompantId: ApiGateway.api + ApiGateway.companyPath + "/get-consultant-by-company-id/",
  getStaffListByCompanyId: ApiGateway.api + ApiGateway.companyPath + "/get-staff-by-company-id/",



};

export const UserApi = {
  getCurrentUser: ApiGateway.api + "/user-security" + "/current-user",
  logout: API_ENDPOINT + "/logout"
};


