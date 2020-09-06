package com.ms.invcms.phone;

import com.ms.invcms.base.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PhoneService {
    @Autowired
    PhoneRepository phoneRepository;

    public Phone add(Phone phone){
        Utils.setDefaultVariables(phone);
       return phoneRepository.save(phone);
    }
    public Phone edit(Phone phone){
        Utils.setSystem(phone);
        return phoneRepository.save(phone);
    }
}
