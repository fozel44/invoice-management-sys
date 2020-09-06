package com.ms.invcms.security.user_details;

import com.ms.invcms.base.Utils;
import com.ms.invcms.invoice.Invoice;
import com.ms.invcms.invoice.InvoiceViewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepository roleRepository;


    @Override
    public Role findById(Long id) throws Exception {
        return roleRepository.findById(id).get();
    }

    @Override
    public Role findByName(String name) throws Exception {
        return roleRepository.findByName(name);
    }

    @Override
    public List<Role> findAll() throws Exception {
        List<Role> roles = roleRepository.findAll();
        return roles;
    }

    @Override
    public Role add(Role role) throws Exception {
        return null;
    }

    @Override
    public Role editPrepare(String id) throws Exception {
        return null;
    }

    @Override
    public Role edit(Role role) throws Exception {
        return null;
    }
}
