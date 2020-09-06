import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpRequest, HttpResponse, HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.less']
})
export class AddImageComponent implements OnInit {
  @Output() res = new EventEmitter<any>();
  
  addNewItem(value) {
    this.res.emit(value);
  }
  
  constructor(private toastrService:ToastrService,private httpClient:HttpClient) { }

  ngOnInit(): void {
    
  }
  
  
  resDto
  uploading = false;
  fileList: NzUploadFile[] = [];

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('files', file);
    });
    this.uploading = true;
    // You can use any AJAX library you like
    this.httpClient.post('http://localhost:8080/api/v1/file/uploadMultipleFiles',formData).subscribe(res=>{ 
          this.resDto=res
          this.uploading = false;
          this.fileList = [];
          this.toastrService.success('upload successfully.');
    },
    error=>{
        this.uploading = false;
          this.toastrService.error('upload failed.');
    },
    () =>{
      this.addNewItem(this.resDto[0])
    }
    );
      
  }


}
