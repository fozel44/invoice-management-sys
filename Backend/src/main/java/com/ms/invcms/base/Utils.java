package com.ms.invcms.base;

import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Optional;

@Component
public class Utils {
    public static Mapper mapper;

    private static AuthenticationProvider authenticationProvider;

    @Autowired
    public Utils(AuthenticationProvider authenticationProvider) {
        Utils.authenticationProvider = authenticationProvider;
    }

    public static <A> A mapper(Object object, Class<A> bClass) {
        if (mapper == null) {
            mapper = new DozerBeanMapper();
        }
        return mapper.map(object, bClass);
    }

    public static void mapper(Object source, Object target) {
        if (mapper == null) {
            mapper = new DozerBeanMapper();
        }
        mapper.map(source, target);
    }

    public static String trim(String text) {
        if (text != null) {
            text = text.trim();
            if (text.isEmpty()) {
                text = null;
            }
        }
        return text;
    }

    public static <T extends BaseEntity> T checkEntity(JpaRepository<T, String> repository, String id, Class clazz) throws Exception {
        id = trim(id);
        if (id == null) {
            throw new Exception("ID bilgisi boş geldi!" + "Class: " + clazz.getName());
        }
        Optional<T> optional = repository.findById(id);
        if (!optional.isPresent()) {
            throw new Exception("Böyle bir kayıt yok!" + "Class: " + clazz.getName() + ",id: " + id);
        }
        T entity = optional.get();
        if (entity.getTrash() != null) {
            throw new Exception("Bu kayıt silinmiş!" + "Class: " + clazz.getName() + ",id: " + id);
        }
        return entity;
    }

    public static <T extends BaseEntity> void setDefaultVariables(T entity) {
        entity.setCreator(authenticationProvider.getCustomUserDetails());
        entity.setModifier(authenticationProvider.getCustomUserDetails());
        entity.setVersion(BigDecimal.ZERO);
        entity.setActivated(true);
    }

    public static <T extends BaseEntity> void setDefaultVariablesForRegistration(T entity) {
        entity.setVersion(BigDecimal.ZERO);
        entity.setActivated(true);
    }

    public static <T extends BaseEntity> void setSystem(T entity) {
        entity.setVersion(entity.getVersion().add(BigDecimal.ONE));
        entity.setModifier(authenticationProvider.getCustomUserDetails());
        entity.setModifiedAt(new Date());
    }
}
