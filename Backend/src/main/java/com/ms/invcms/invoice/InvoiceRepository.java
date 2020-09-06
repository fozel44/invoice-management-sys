package com.ms.invcms.invoice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, String> {

}
