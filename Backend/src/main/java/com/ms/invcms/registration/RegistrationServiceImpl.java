package com.ms.invcms.registration;

import com.ms.invcms.base.Utils;
import com.ms.invcms.consultant.Consultant;
import com.ms.invcms.invoice.Invoice;
import com.ms.invcms.invoice.InvoiceEditDto;
import com.ms.invcms.invoice.InvoiceViewDto;
import com.ms.invcms.security.user_details.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RegistrationServiceImpl implements RegistrationService {
    @Autowired
    private CustomUserDetailsRepository customUserDetailsRepository;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;


    private List<UserViewDto> entitiesToView(List<CustomUserDetails> users) {
        List<UserViewDto> userViewDtos = new ArrayList<>();
        if (!CollectionUtils.isEmpty(users)) {
            for (CustomUserDetails user : users) {
                userViewDtos.add(Utils.mapper(user, UserViewDto.class));
            }
        }
        return userViewDtos;
    }

    private CustomUserDetails getEntity(String id) throws Exception {
        return Utils.checkEntity(customUserDetailsRepository, id, Invoice.class);
    }

    private UserViewDto getView(String id) throws Exception {
        return getViewByEntity(getEntity(id));
    }

    private UserViewDto getViewByEntity(CustomUserDetails entity) {
        return Utils.mapper(entity, UserViewDto.class);
    }

    @Override
    public UserViewDto findById(String id) throws Exception {
        return getView(id);
    }

    @Override
    public List<UserViewDto> findAll() throws Exception {
        List<CustomUserDetails> users = customUserDetailsRepository.findAll();
        List<UserViewDto> userViewDtos = entitiesToView(users);
        return userViewDtos;
    }
    @Override
    public UserViewDto add(UserAddDto userAddDto) throws Exception{

        final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        final String encodedPassword=bCryptPasswordEncoder.encode(userAddDto.getPassword());

        CustomUserDetails customUserDetails = Utils.mapper(userAddDto, CustomUserDetails.class);
        Utils.setDefaultVariables(customUserDetails);
        customUserDetails.setPassword(encodedPassword);
        customUserDetails.setAuthorities(customUserDetailsService.getAuthorities(customUserDetails.getRoles()));
        return getView(customUserDetailsRepository.save(customUserDetails).getId());


    }

    @Override
    public UserEditDto editPrepare(String id) throws Exception {
        CustomUserDetails user = getEntity(id);
        user.setPassword(null);
        return Utils.mapper(user, UserEditDto.class);
    }
    @Override
    public UserViewDto edit(UserEditDto userEditDto) throws Exception{
        CustomUserDetails user = getEntity(userEditDto.getId());
        user.setId(userEditDto.getId());
        user.setEmail(userEditDto.getEmail());
        user.setFirstName(userEditDto.getFirstName());
        user.setLastName(userEditDto.getLastName());
        user.setRoles(userEditDto.getRoles());
        //user.setAuthorities(userEditDto.getAuthorities());
        user.setAuthorities(customUserDetailsService.getAuthorities(user.getRoles()));
        if(userEditDto.getPassword() != "" && comparePassword(userEditDto.getCurrentPassword(),userEditDto.getId())){
            final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            final String encodedPassword=bCryptPasswordEncoder.encode(userEditDto.getPassword());
            user.setPassword(encodedPassword);
        }

        Utils.setSystem(user);
        return getView(customUserDetailsRepository.save(user).getId());
    }

    @Override
    public UserViewDto activate(String id) throws Exception {
        CustomUserDetails entity = getEntity(id);
        entity.setActivated(true);
        Utils.setSystem(entity);
        customUserDetailsRepository.save(entity);
        return getView(entity.getId());
    }


    @Override
    public UserViewDto deactivate(String id) throws Exception {
        CustomUserDetails entity = getEntity(id);
        entity.setActivated(false);
        Utils.setSystem(entity);
        customUserDetailsRepository.save(entity);
        return getView(entity.getId());
    }


    @Override
    public UserViewDto trash(String id) throws Exception {
        CustomUserDetails user = getEntity(id);
        user.setTrash(UUID.randomUUID().toString());
        Utils.setSystem(user);
        return getView(user.getId());
    }

    @Override
    public boolean comparePassword(String password,String userId) throws Exception{

        final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        CustomUserDetails user = getEntity(userId);

        if(bCryptPasswordEncoder.matches(password,user.getPassword())) {
            return true;

        }
        else {
            throw new Exception("Passwords do not match");}
    }

    @Override
    public CustomUserDetails editForEntities(UserEditDto userEditDto) throws Exception{
        CustomUserDetails user = getEntity(userEditDto.getId());
        user.setId(userEditDto.getId());
        user.setEmail(userEditDto.getEmail());
        user.setFirstName(userEditDto.getFirstName());
        user.setLastName(userEditDto.getLastName());
        user.setRoles(userEditDto.getRoles());
        //user.setAuthorities(userEditDto.getAuthorities());
        user.setAuthorities(customUserDetailsService.getAuthorities(user.getRoles()));
        if(userEditDto.getPassword()!=null&&comparePassword(userEditDto.getCurrentPassword(),userEditDto.getId())){
            final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            final String encodedPassword=bCryptPasswordEncoder.encode(userEditDto.getPassword());
            user.setPassword(encodedPassword);
        }
        Utils.setSystem(user);
        return customUserDetailsRepository.save(user);
    }

    @Override
    public CustomUserDetails addForEntities(UserAddDto userAddDto) throws Exception{

        final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        final String encodedPassword=bCryptPasswordEncoder.encode(userAddDto.getPassword());

        CustomUserDetails customUserDetails =new CustomUserDetails();
        customUserDetails.setEmail(userAddDto.getEmail());
        customUserDetails.setRoles(userAddDto.getRoles());
        customUserDetails.setLastName(userAddDto.getLastName());
        customUserDetails.setFirstName(userAddDto.getFirstName());
        Utils.setDefaultVariables(customUserDetails);
        customUserDetails.setPassword(encodedPassword);
        customUserDetails.setAuthorities(customUserDetailsService.getAuthorities(customUserDetails.getRoles()));

        return customUserDetailsRepository.save(customUserDetails);


    }

}
