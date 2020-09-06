import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import { ConsultantProfileComponent } from './consultant/consultant-profile/consultant-profile.component';
import { ConsultantListComponent } from './consultant/consultant-list/consultant-list.component';
import { ConsultantFilterPipe } from './consultant/consultant-filter.pipe';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoice/invoice-details/invoice-details.component';
import { ToastrModule } from 'ngx-toastr';
import { EditConsultantDialogComponent } from './dialogs/edit-consultant-dialog/edit-consultant-dialog.component';
import { AddConsultantDialogComponent } from './dialogs/add-consultant-dialog/add-consultant-dialog.component';
import { AddInvoiceDialogComponent } from './dialogs/add-invoice-dialog/add-invoice-dialog.component';
import { AddCompanyDialogComponent } from './dialogs/add-company-dialog/add-company-dialog.component';
import { EditCompanyDialogComponent } from './dialogs/edit-company-dialog/edit-company-dialog.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { CompanyFilterPipe } from './company/company-filter.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { InvoiceFilterPipe } from './invoice/invoice-filter.pipe';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { EditInvoiceDialogComponent } from './dialogs/edit-invoice-dialog/edit-invoice-dialog.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { AddImageComponent } from './uploads/add-image/add-image.component';
import { SrcPipe } from './pipes/file-pipe/src.pipe';
import { AddPdfComponent } from './uploads/add-pdf/add-pdf.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddUserDialogComponent } from './dialogs/add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from './dialogs/edit-user-dialog/edit-user-dialog.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserFilterPipe } from './user/user-filter.pipe';
import { RoleDeletePrefixPipe } from './pipes/file-pipe/role-delete-prefix.pipe';








registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ConsultantProfileComponent,
    ConsultantListComponent,
    ConsultantFilterPipe,
    CompanyListComponent,
    CompanyProfileComponent,
    InvoiceListComponent,
    InvoiceDetailsComponent,
    AddInvoiceDialogComponent,
    EditConsultantDialogComponent,
    AddConsultantDialogComponent,
    AddCompanyDialogComponent,
    EditCompanyDialogComponent,
    LoginComponent,
    CompanyFilterPipe,
    InvoiceFilterPipe,
    EditInvoiceDialogComponent,
    AddImageComponent,
    SrcPipe,
    AddPdfComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    UserListComponent,
    UserFilterPipe,
    RoleDeletePrefixPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule,
    MatButtonModule,
    NzButtonModule,
    ToastrModule.forRoot(), 
    ReactiveFormsModule,
    NzDropDownModule,
    NzSelectModule,
    MatAutocompleteModule,
    NzGridModule,
    NzTableModule,
    NzListModule,
    NzTypographyModule,
    NzIconModule,
    NzRadioModule,
    NzDividerModule,
    NzUploadModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    MatCheckboxModule
    
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {provide: HTTP_INTERCEPTORS,useClass: HttpInterceptorService,multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
