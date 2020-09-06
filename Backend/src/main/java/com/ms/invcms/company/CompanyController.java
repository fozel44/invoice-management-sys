package com.ms.invcms.company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/company")
@CrossOrigin
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping("/get-all")
    public List<CompanyViewDto> findAll()throws Exception{
        return companyService.findAll();
    }

    @GetMapping("/view/{id}")
    public CompanyViewDto findById(@PathVariable String id)throws Exception {
        return companyService.findById(id);
    }

    @GetMapping("/add-prepare")
    public CompanyAddDto addPrepare() {
        return new CompanyAddDto();
    }

    @PostMapping("/add")
    public CompanyViewDto add(@RequestBody CompanyAddDto companyAddDto) throws Exception {
        return companyService.add(companyAddDto);
    }

    @GetMapping("/edit-prepare/{id}")
    public CompanyEditDto editPrepare(@PathVariable String id) throws Exception{
        return companyService.editPrepare(id);
    }

    @PostMapping("/edit")
    public CompanyViewDto edit(@RequestBody CompanyEditDto companyEditDto) throws Exception{
        return companyService.edit(companyEditDto);
    }

    @GetMapping("/activate/{id}")
    public CompanyViewDto activate(@PathVariable("id") String id) throws Exception {
        return companyService.activate(id);
    }

    @GetMapping("/deactivate/{id}")
    public CompanyViewDto deactivate(@PathVariable("id") String id) throws Exception {
        return companyService.deactivate(id);
    }

    @GetMapping("/trash/{id}")
    public CompanyViewDto trash(@PathVariable String id) throws Exception{
        return companyService.trash(id);
    }

    /******************************************************************************************************************/

    @GetMapping("/get-by-tin/{tin}")
    public CompanyViewDto getCompanyByTaxIdentificationNumber(@PathVariable String tin) throws Exception{
        return companyService.getCompanyByTaxIdentificationNumber(tin);
    }
}