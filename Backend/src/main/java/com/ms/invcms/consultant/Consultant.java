package com.ms.invcms.consultant;


import com.ms.invcms.base.BaseEntity;
import com.ms.invcms.company.Company;
import com.ms.invcms.phone.Phone;
import com.ms.invcms.security.user_details.CustomUserDetails;
import com.ms.invcms.security.user_details.UserViewDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.codehaus.jackson.map.Serializers;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name="consultant")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Consultant extends BaseEntity {

    private String photo ;
    @OneToOne
    private Phone phone;
    private String address;
    private String identityNo;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private CustomUserDetails user;

    @ManyToOne
    private Company ownedCompany;

    @ManyToOne
    private Company workedCompany;


}
