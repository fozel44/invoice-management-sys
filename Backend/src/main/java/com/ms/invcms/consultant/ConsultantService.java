package com.ms.invcms.consultant;

import java.util.List;

public interface ConsultantService {

    ConsultantViewDto findById(String id) throws Exception;

    List<ConsultantViewDto> findAll() throws Exception;

    ConsultantViewDto add(ConsultantAddDto consultantAddDto) throws Exception;

    ConsultantEditDto editPrepare(String id) throws Exception;

    ConsultantViewDto edit(ConsultantEditDto consultantEditDto) throws Exception;

    ConsultantViewDto activate(String id) throws Exception;

    ConsultantViewDto deactivate(String id) throws Exception;

    ConsultantViewDto trash(String id) throws Exception;

    /******************************************************************************************************************/

    ConsultantViewDto getConsultantByIdentityNo(String id) throws Exception;

    List<ConsultantViewDto> getConsultantListByCompanyId(String id) throws Exception; //alliance da calıanları verır

    List<ConsultantViewDto> getStavesListByCompanyId(String id) throws Exception; // enviyonun calısanlarını verır veya akargede çalışanları verir.

    ConsultantViewDto getConsultantByUserId(String id) throws  Exception;




}
