package com.ms.invcms.base;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ms.invcms.security.user_details.CustomUserDetails;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@Table(name = "base_entity")
@EntityListeners({AuditingEntityListener.class})
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class BaseEntity {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "id", updatable = false)
    private String id;

    @Column(name = "tenant" , updatable = false)
    private String tenant;

    @Column(name = "trash")
    private String trash;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "creator", referencedColumnName = "id", updatable = false)
    private CustomUserDetails creator;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Date createdAt;

    @OneToOne
    @JoinColumn(name = "modifier", referencedColumnName = "id")
    @JsonIgnore
    private CustomUserDetails modifier;

    @UpdateTimestamp
    @Column(name = "modified_at")
    private Date modifiedAt;

    @Column(name = "version")
    private BigDecimal version;

    @Column(name = "activated")
    private boolean activated;

}
