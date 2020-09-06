package com.ms.invcms.registration;

import com.ms.invcms.security.user_details.UserAddDto;
import com.ms.invcms.security.user_details.UserEditDto;
import com.ms.invcms.security.user_details.UserViewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/user")
public class RegistrationController {
    @Autowired
    private RegistrationService registrationService;

    @GetMapping("/get-all")
    public List<UserViewDto> findAll() throws Exception {
        return registrationService.findAll();
    }

    @GetMapping("/view/{id}")
    public UserViewDto findById(@PathVariable String id) throws Exception {
        return registrationService.findById(id);
    }

    @GetMapping("/add-prepare")
    public UserAddDto addPrepare() {
        return new UserAddDto();
    }

    @PostMapping("/add")
    public UserViewDto add(@RequestBody UserAddDto userAddDto) throws Exception {
        return registrationService.add(userAddDto);
    }

    @GetMapping("/edit-prepare/{id}")
    public UserEditDto editPrepare(@PathVariable String id) throws Exception {
        return registrationService.editPrepare(id);
    }

    @PostMapping("/edit")
    public UserViewDto edit(@RequestBody UserEditDto userEditDto) throws Exception {
        return registrationService.edit(userEditDto);
    }

    @GetMapping("/activate/{id}")
    public UserViewDto activate(@PathVariable("id") String id) throws Exception {
        return registrationService.activate(id);
    }

    @GetMapping("/deactivate/{id}")
    public UserViewDto deactivate(@PathVariable("id") String id) throws Exception {
        return registrationService.deactivate(id);
    }

    @GetMapping("/trash/{id}")
    public UserViewDto trash(@PathVariable String id) throws Exception {
        return registrationService.trash(id);
    }




}
