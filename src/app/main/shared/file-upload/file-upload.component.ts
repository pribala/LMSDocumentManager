import { environment } from './../../../../environments/environment.prod';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FileSearchService } from '../../pages/services/file-search.service';

const URL = environment.apiUrl + 'Storage/upload';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() fileInput;

  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;

  constructor (private fileService: FileSearchService){
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        console.log('formatDataFunction');
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe( res => {
      this.response = res 
      console.log('res', res);
    });
  }

  ngOnInit(): void {
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      console.log('onBuildItemForm event');
      form.append('someField', 'test'); //note comma separating key and value
     };      
  }

  // add file from drop area to file list
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
    this.onFileSelected(e);
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  // add selected files to list for upload
  public onFileSelected(event: EventEmitter<File[]>) {
    const file = [...this.uploader.queue];
    file.forEach(item => {
      this.fileService.addFileToList(item._file);
    });
  }

  // remove a file from the list of files to be uploaded
  removeFile(item) {
    this.fileService.removeFile(this.uploader.queue.find(x => x._file.name == item._file.name)._file);
    this.uploader.queue.splice(this.uploader.queue.findIndex(x => x._file == item._file), 1);
  }

}
