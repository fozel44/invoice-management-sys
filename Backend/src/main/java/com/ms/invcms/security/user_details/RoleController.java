package com.ms.invcms.security.user_details;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/role")
public class RoleController {

    @Autowired
    RoleService roleService;

    @GetMapping("/get-all")
    public List<Role> findAll() throws Exception {
        return roleService.findAll();
    }

    @GetMapping("/view/{id}")
    public Role findById(@PathVariable Long id) throws Exception {
        return roleService.findById(id);
    }

    @GetMapping("/view/{name}")
    public Role findByName(@PathVariable String name) throws Exception {
        return roleService.findByName(name);
    }



}
