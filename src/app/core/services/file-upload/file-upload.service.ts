import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FileMetadata } from '../../interfaces/file-metadata.interface';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) {
  }

  public uploadPaper$(formData: FormData): Observable<FileMetadata> {
    return this.http.post<FileMetadata>(
      `${environment.apiEndpoint}/paper/upload`,
      formData,
    );
  }

  public downloadFile$(filePath: string): Observable<any> {
    return this.http.get(
      `${environment.apiEndpoint}/paper/${filePath}`,
      { responseType: 'blob' }
    );
  }
}
