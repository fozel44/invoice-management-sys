package com.ms.invcms.company;


import java.util.List;

public interface CompanyService {

    CompanyViewDto findById(String id) throws Exception;

    List<CompanyViewDto> findAll() throws Exception;

    CompanyViewDto add(CompanyAddDto companyAddDto) throws Exception;

    CompanyEditDto editPrepare(String id) throws Exception;

    CompanyViewDto edit(CompanyEditDto companyEditDto) throws Exception;

    CompanyViewDto activate(String id) throws Exception;

    CompanyViewDto deactivate(String id) throws Exception;

    CompanyViewDto trash(String id) throws Exception;

    /**********************************************************************************************************************/

    CompanyViewDto getCompanyByTaxIdentificationNumber(String tin) throws Exception;




}

