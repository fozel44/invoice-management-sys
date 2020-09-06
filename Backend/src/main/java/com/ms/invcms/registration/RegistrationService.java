package com.ms.invcms.registration;

import com.ms.invcms.invoice.InvoiceViewDto;
import com.ms.invcms.security.user_details.CustomUserDetails;
import com.ms.invcms.security.user_details.UserAddDto;
import com.ms.invcms.security.user_details.UserEditDto;
import com.ms.invcms.security.user_details.UserViewDto;

import java.util.List;

public interface RegistrationService {
    UserViewDto findById(String id) throws Exception;

    List<UserViewDto> findAll() throws Exception;

    UserViewDto add(UserAddDto userAddDto) throws Exception;

    UserEditDto editPrepare(String id) throws Exception;

    UserViewDto edit(UserEditDto userEditDto) throws Exception;

    UserViewDto activate(String id) throws Exception;

    UserViewDto deactivate(String id) throws Exception;

    UserViewDto trash(String id) throws Exception;

    boolean comparePassword(String password,String userId) throws Exception;

    CustomUserDetails editForEntities(UserEditDto userEditDto) throws Exception;

    CustomUserDetails addForEntities(UserAddDto userAddDto) throws Exception;
}
