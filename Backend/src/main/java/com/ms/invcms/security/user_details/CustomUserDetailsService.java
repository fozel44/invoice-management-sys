package com.ms.invcms.security.user_details;

import com.ms.invcms.base.Utils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private CustomUserDetailsRepository customUserDetailsRepository;
    @Autowired
    private CustomGrantedAuthorityRepository customGrantedAuthorityRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        CustomUserDetails user = customUserDetailsRepository.findByEmail(email);
        if (user == null) {
            CustomUserDetails b = new CustomUserDetails(
                    " ", "", "", "", Arrays.asList(
                    roleRepository.findByName("ROLE_USER")),
                    getAuthorities(Arrays.asList(
                            roleRepository.findByName("ROLE_USER"))));
            Utils.setDefaultVariablesForRegistration(b);
            return b;
        }

        CustomUserDetails a = new CustomUserDetails(
                user.getFirstName(), user.getLastName(), user.getPassword(), user.getEmail(),
                user.getRoles(), user.getAuthorities());
        Utils.setDefaultVariablesForRegistration(a);
        return a;
    }

    private List<String> getPrivileges(Collection<Role> roles) {

        List<String> privileges = new ArrayList<>();
        List<Privilege> collection = new ArrayList<>();
        for (Role role : roles) {
            collection.addAll(role.getPrivileges());
        }
        for (Privilege item : collection) {
            privileges.add(item.getName());
        }
        return privileges;
    }

    public Collection<CustomGrantedAuthority> getAuthorities(
            Collection<Role> roles) {

        return getGrantedAuthorities(getPrivileges(roles));
    }

    private List<CustomGrantedAuthority> getGrantedAuthorities(List<String> privileges) {

        HashSet<String> unique = new HashSet<String>(privileges);
        List<String> uniquePrivileges= new ArrayList<>(unique);
        List<CustomGrantedAuthority> authorities = new ArrayList<>();
        for (String privilege : uniquePrivileges) {
            CustomGrantedAuthority customGrantedAuthority = createCustomGrantedAuthorityIfNotFound(privilege);
            authorities.add(customGrantedAuthority);

        }
        return authorities;
    }

    public CustomGrantedAuthority createCustomGrantedAuthorityIfNotFound(String name) {

        CustomGrantedAuthority customGrantedAuthority =  customGrantedAuthorityRepository.findByAuthCode(name);
        if (customGrantedAuthority == null) {
            customGrantedAuthority = new CustomGrantedAuthority();
            customGrantedAuthority.setAuthCode(name);
            customGrantedAuthorityRepository.save(customGrantedAuthority);
        }
        return customGrantedAuthority;
    }

    public CustomUserDetails getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        CustomUserDetails user = customUserDetailsRepository.findByEmail(username);
        if (user != null) {
            return user;
        } else {
            throw new UsernameNotFoundException("User Not Found!");
        }
    }

    public UserViewDto getCurrentUserView() {
        CustomUserDetails user = getCurrentUser();
        UserViewDto output = Utils.mapper(user, UserViewDto.class);
        return output;
    }
}
