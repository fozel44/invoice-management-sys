package com.ms.invcms.consultant;

import com.ms.invcms.base.Utils;
import com.ms.invcms.phone.Phone;
import com.ms.invcms.phone.PhoneService;
import com.ms.invcms.registration.RegistrationService;
import com.ms.invcms.registration.RegistrationServiceImpl;
import com.ms.invcms.security.user_details.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.*;


import java.util.stream.Collectors;

@Service
@Slf4j
@AllArgsConstructor
public class ConsultantServiceImpl implements ConsultantService {

    @Autowired
    private ConsultantRepository consultantRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RegistrationService registrationService;
    @Autowired
    private PhoneService phoneService;

    private List<ConsultantViewDto> entitiesToView(List<Consultant> consultants) {
        List<ConsultantViewDto> consultantViewDtos = new ArrayList<>();
        if (!CollectionUtils.isEmpty(consultants)) {
            for (Consultant consultant : consultants) {
                consultantViewDtos.add(Utils.mapper(consultant, ConsultantViewDto.class));
            }
        }
        return consultantViewDtos;
    }

    private Consultant getEntity(String id) throws Exception {
        return Utils.checkEntity(consultantRepository, id, Consultant.class);
    }

    private ConsultantViewDto getView(String id) throws Exception {
        return getViewByEntity(getEntity(id));
    }

    private ConsultantViewDto getViewByEntity(Consultant entity) {
        return Utils.mapper(entity, ConsultantViewDto.class);
    }

    @Override
    public ConsultantViewDto findById(String id) throws Exception {
        return getView(id);
    }

    @Override
    public List<ConsultantViewDto> findAll() throws Exception {
        List<Consultant> consultants = consultantRepository.findAll();
        List<ConsultantViewDto> consultantViewDtos = entitiesToView(consultants);
        return consultantViewDtos;
    }

    @Override
    public ConsultantViewDto add(ConsultantAddDto consultantAddDto) throws Exception {
        //Consultant consultant = Utils.mapper(consultantAddDto, Consultant.class);
        Consultant consultant = new Consultant();
        consultant.setIdentityNo(consultantAddDto.getIdentityNo());
        if(consultantAddDto.getPhoto()==null){
            consultant.setPhoto("http://localhost:8080/api/v1/file/download/user_avatar.png");
        }else consultant.setPhoto(consultantAddDto.getPhoto());

        consultant.setAddress(consultantAddDto.getAddress());
        consultant.setOwnedCompany(consultantAddDto.getOwnedCompany());
        consultant.setWorkedCompany(consultantAddDto.getWorkedCompany());
        //consultant.setPhone(consultantAddDto.getPhone());

        UserAddDto userAddDto = new UserAddDto();
        userAddDto.setFirstName(consultantAddDto.getFirstName());
        userAddDto.setLastName(consultantAddDto.getLastName());
        userAddDto.setPassword(consultantAddDto.getPassword());
        userAddDto.setEmail(consultantAddDto.getEmail());
        Role consultantRole = roleRepository.findByName("ROLE_CONSULTANT");
        Role userRole = roleRepository.findByName("ROLE_USER");
        List<Role> roles=new ArrayList<>();
        roles.add(consultantRole);
        roles.add(userRole);
        userAddDto.setRoles(roles);


        CustomUserDetails registeredUser = registrationService.addForEntities(userAddDto);
        Utils.setDefaultVariables(consultant);
        consultant.setUser(registeredUser);
        Phone phone = consultantAddDto.getPhone();
        Utils.setDefaultVariables(phone);
        consultant.setPhone(phoneService.add(phone));
        consultantRepository.save(consultant);
        return getView(consultant.getId());
    }

    @Override
    public ConsultantEditDto editPrepare(String id) throws Exception {
        Consultant consultant = getEntity(id);
        ConsultantEditDto consultantEditDto = new ConsultantEditDto();

        consultantEditDto.setUserId(consultant.getUser().getId());
        consultantEditDto.setFirstName(consultant.getUser().getFirstName());
        consultantEditDto.setLastName(consultant.getUser().getLastName());
        consultantEditDto.setEmail(consultant.getUser().getEmail());


        consultantEditDto.setId(consultant.getId());
        consultantEditDto.setAddress(consultant.getAddress());
        consultantEditDto.setIdentityNo(consultant.getIdentityNo());
        consultantEditDto.setPhone(consultant.getPhone());
        consultantEditDto.setPhoto(consultant.getPhoto());
        consultantEditDto.setOwnedCompany(consultant.getOwnedCompany());
        consultantEditDto.setWorkedCompany(consultant.getWorkedCompany());
        return consultantEditDto;
    }

    @Override
    public ConsultantViewDto edit(ConsultantEditDto consultantEditDto) throws Exception {


        Consultant consultant = getEntity(consultantEditDto.getId());

        UserEditDto userEditDto = new UserEditDto();
        userEditDto.setId(consultantEditDto.getUserId());

        userEditDto.setFirstName(consultantEditDto.getFirstName());
        userEditDto.setLastName(consultantEditDto.getLastName());
        userEditDto.setEmail(consultantEditDto.getEmail());
        userEditDto.setCurrentPassword(consultantEditDto.getCurrentPassword());
        userEditDto.setPassword(consultantEditDto.getPassword());

//        if(registrationService.comparePassword(consultantEditDto.getCurrentPassword(),consultantEditDto.getUserId())){
//            userEditDto.setPassword(consultantEditDto.getPassword());
//        }


        //Role Setting
        Role consultantRole = roleRepository.findByName("ROLE_CONSULTANT");
        Role userRole = roleRepository.findByName("ROLE_USER");
        List<Role> roles = new ArrayList<>();
        roles.add(consultantRole);
        roles.add(userRole);
        userEditDto.setRoles(roles);






        consultant.setUser(registrationService.editForEntities(userEditDto));
        consultant.setId(consultantEditDto.getId());
        consultant.setAddress(consultantEditDto.getAddress());
        consultant.setOwnedCompany(consultantEditDto.getOwnedCompany());
        consultant.setWorkedCompany(consultantEditDto.getWorkedCompany());

        Phone phone = consultantEditDto.getPhone();
        consultant.setPhone(phoneService.add(phone));
        consultant.setPhoto(consultantEditDto.getPhoto());
        Utils.setSystem(consultant);
        return getView(consultantRepository.save(consultant).getId());
    }


    @Override
    public ConsultantViewDto activate(String id) throws Exception {
        Consultant entity = getEntity(id);
        entity.setActivated(true);
        Utils.setSystem(entity);
        consultantRepository.save(entity);
        return getView(entity.getId());
    }


    @Override
    public ConsultantViewDto deactivate(String id) throws Exception {
        Consultant entity = getEntity(id);
        entity.setActivated(false);
        Utils.setSystem(entity);
        consultantRepository.save(entity);
        return getView(entity.getId());
    }


    @Override
    public ConsultantViewDto trash(String id) throws Exception {
        Consultant consultant = getEntity(id);
        consultant.setTrash(UUID.randomUUID().toString());
        Utils.setSystem(consultant);
        return getView(consultant.getId());
    }

    /******************************************************************************************************************/

    @Override
    public ConsultantViewDto getConsultantByIdentityNo(String tc) throws Exception {
        return getView(consultantRepository.findByIdentityNo(tc).getId());
    }

    @Override
    public List<ConsultantViewDto> getConsultantListByCompanyId(String companyId) throws Exception {
        List<ConsultantViewDto> allConsultant = findAll();
        return allConsultant.stream()
                .filter(c -> c.getWorkedCompany().getId().equals(companyId))
                .collect(Collectors.toList());
    }

    @Override
    public List<ConsultantViewDto> getStavesListByCompanyId(String companyId) throws Exception {
        List<ConsultantViewDto> allConsultant = findAll();
        return allConsultant.stream()
                .filter(c -> c.getOwnedCompany().getId().equals(companyId))
                .collect(Collectors.toList());
    }

    @Override
   public ConsultantViewDto getConsultantByUserId(String id) throws  Exception{
        return getView(consultantRepository.findByUserId(id).getId());
   }


}
