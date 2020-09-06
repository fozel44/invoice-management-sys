package com.ms.invcms.company;


import com.ms.invcms.base.Utils;
import com.ms.invcms.consultant.ConsultantService;
import com.ms.invcms.phone.Phone;
import com.ms.invcms.phone.PhoneRepository;
import com.ms.invcms.phone.PhoneService;
import jdk.jshell.execution.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    PhoneService phoneService;

    private List<CompanyViewDto> entitiesToView(List<Company> companies){
        List<CompanyViewDto> companyViewDtos = new ArrayList<>();
        if(!CollectionUtils.isEmpty(companies)){
            for (Company company: companies){
                companyViewDtos.add(Utils.mapper(company, CompanyViewDto.class));
            }
        }
        return companyViewDtos;
    }

    private Company getEntity(String id) throws Exception {
        return Utils.checkEntity(companyRepository, id, Company.class);
    }

    private CompanyViewDto getView(String id) throws Exception {
        return getViewByEntity(getEntity(id));
    }

    private CompanyViewDto getViewByEntity(Company entity) {
        return Utils.mapper(entity, CompanyViewDto.class);
    }

    @Override
    public CompanyViewDto findById(String id) throws Exception {
        return getView(id);
    }

    @Override
    public List<CompanyViewDto> findAll() throws Exception {
        List<Company> companies = companyRepository.findAll();
        List<CompanyViewDto> companyViewDtos = entitiesToView(companies);
        return companyViewDtos;
    }

    @Override
    public CompanyViewDto add(CompanyAddDto companyAddDto) throws Exception {
        Company company = Utils.mapper(companyAddDto, Company.class);
        Phone phone = companyAddDto.getPhone();
        company.setPhone(phoneService.add(phone));
        Utils.setDefaultVariables(company);
        if(company.getLogo()==null){
            company.setLogo("http://localhost:8080/api/v1/file/download/company_avatar.png");
        }
        companyRepository.save(company);
        return getView(company.getId());
    }

    @Override
    public CompanyEditDto editPrepare(String id) throws Exception {
        Company company = getEntity(id);
        return Utils.mapper(company, CompanyEditDto.class);
    }

    @Override
    public CompanyViewDto edit(CompanyEditDto companyEditDto) throws Exception {
        Company company = getEntity(companyEditDto.getId());
        company.setId(companyEditDto.getId());
        company.setName(companyEditDto.getName());
        company.setAddress(companyEditDto.getAddress());
        Phone phone = companyEditDto.getPhone();
        company.setPhone(phoneService.add(phone));
        company.setDescription(companyEditDto.getDescription());
        company.setTaxIdentificationNumber(companyEditDto.getTaxIdentificationNumber());
        company.setTaxOffice(companyEditDto.getTaxOffice());
        company.setLogo(companyEditDto.getLogo());

        Utils.setSystem(company);
        return getView(companyRepository.save(company).getId());
    }


    @Override
    public CompanyViewDto activate(String id) throws Exception {
        Company entity = getEntity(id);
        entity.setActivated(true);
        Utils.setSystem(entity);
        companyRepository.save(entity);
        return getView(entity.getId());
    }



    @Override
    public CompanyViewDto deactivate(String id) throws Exception {
        Company entity = getEntity(id);
        entity.setActivated(false);
        Utils.setSystem(entity);
        companyRepository.save(entity);
        return getView(entity.getId());
    }



    @Override
    public CompanyViewDto trash(String id) throws Exception {
        Company company = getEntity(id);
        company.setTrash(UUID.randomUUID().toString());
        Utils.setSystem(company);
        return getView(company.getId());
    }

    /******************************************************************************************************************/

    @Override
    public CompanyViewDto getCompanyByTaxIdentificationNumber(String tin) throws Exception {
        return getView(companyRepository.findByTaxIdentificationNumber(tin).getId());
    }
}
