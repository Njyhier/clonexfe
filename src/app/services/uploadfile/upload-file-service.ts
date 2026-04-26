import {  Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iimage } from '../../interfaces/iimage';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http:HttpClient){}
  private uploadPreset="clonex_upload";
  private cloudName = environment.CLOUDINARY_NAME;
  uploadImage(file:File):Observable<Iimage>{
    const formData= new FormData()
    formData.append("file",file)
    formData.append("upload_preset",this.uploadPreset)
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
    console.log("Uploading...")
    return this.http.post<Iimage>(url, formData)
  }
  
}
