package com.ms.invcms.consultant;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/consultant")
@CrossOrigin
public class ConsultantController {

    @Autowired
    ConsultantService consultantService;

    @GetMapping("/get-all")
    public List<ConsultantViewDto> findAll() throws Exception {
        return consultantService.findAll();
    }

    @GetMapping("/view/{id}")
    public ConsultantViewDto findById(@PathVariable String id) throws Exception {
        return consultantService.findById(id);
    }

    @GetMapping("/add-prepare")
    public ConsultantAddDto addPrepare() { return new ConsultantAddDto(); }

    @PostMapping("/add")
    public ConsultantViewDto add(@RequestBody ConsultantAddDto consultant) throws Exception {
        return consultantService.add(consultant);
    }

    @GetMapping("/edit-prepare/{id}")
    public ConsultantEditDto editPrepare(@PathVariable String id) throws Exception {
        return consultantService.editPrepare(id);
    }

    @PostMapping("/edit")
    public ConsultantViewDto edit(@RequestBody ConsultantEditDto consultant) throws Exception {
        return consultantService.edit(consultant);
    }

    @GetMapping("/activate/{id}")
    public ConsultantViewDto activate(@PathVariable("id") String id) throws Exception {
        return consultantService.activate(id);
    }

    @GetMapping("/deactivate/{id}")
    public ConsultantViewDto deactivate(@PathVariable("id") String id) throws Exception {
        return consultantService.deactivate(id);
    }

    @GetMapping("/trash/{id}")
    public ConsultantViewDto trash(@PathVariable String id) throws Exception {
        return consultantService.trash(id);
    }

    /******************************************************************************************************************/

    @GetMapping("/get-by-identity-no/{in}")
    public ConsultantViewDto getConsultantByIdentityNo(@PathVariable String in) throws Exception{
        return consultantService.getConsultantByIdentityNo(in);
    }

    @GetMapping("/get-consultants-by-company-id/{id}")
    public   List<ConsultantViewDto> getConsultantListByCompanyId(@PathVariable String id) throws Exception{
        return consultantService.getConsultantListByCompanyId(id);
    }

    @GetMapping("/get-staff-by-company-id/{id}")
    public   List<ConsultantViewDto> getStavesListByCompanyId(@PathVariable String id) throws Exception{
        return consultantService.getStavesListByCompanyId(id);
    }

    @GetMapping("/get-consultant-by-user-id/{id}")
    public ConsultantViewDto getConsultantByUserId(@PathVariable String id) throws Exception{
        return consultantService.getConsultantByUserId(id);
    }
}
