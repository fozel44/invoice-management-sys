package com.ms.invcms.security.user_details;

import java.util.List;

public interface RoleService {

    Role findById(Long id) throws Exception;

    Role findByName(String name) throws Exception;

    List<Role> findAll() throws Exception;

    Role add(Role role) throws Exception;

    Role editPrepare(String id) throws Exception;

    Role edit(Role role) throws Exception;

}
