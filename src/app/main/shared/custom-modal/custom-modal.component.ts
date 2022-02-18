import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileSearchService } from 'app/main/pages/services/file-search.service';
import { FileSettingService } from 'app/main/pages/services/file-setting.service';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent implements OnInit {

  templates: any;
  templateNames: string[] = [];
  docTypeNames: string[] = [];
  docTypes: any;
  selectedTemplate: any;
  selectedTemplateId: any;
  
  public availableDocState = [];

  selectedTemplateName: string;
  selectedDocumentType: string;
  selectedDocSource: string;
  selectedDocClass: string;
  selectedProperties: any;
  selectedMetaTags: any;

  fileArray: File[];

  constructor(private modalService: NgbModal, private fileSettingService: FileSettingService, private fileSearchService: FileSearchService) { }

  ngOnInit(): void {
    this.loadData(null);
  }

  openModal(modal){
    this.modalService.open(modal, {
      windowClass: 'modal'
    });
   }

   loadData(selectedTemplate: string) {   
    // get templates
    this.fileSettingService.getTemplates().subscribe((data: any) => {
      this.templates = data;
      this.templateNames = this.templates.map(x => x.Settings.name);

      
      if (selectedTemplate) {
        this.selectedTemplate = this.templates.find(x => x.Settings.name === selectedTemplate).Settings;

        this.selectedTemplateId = this.templates.find(x => x.Settings.name === selectedTemplate)._id;

        // populate document type
        this.docTypes = this.selectedTemplate.docClass.doctype;        
        this.docTypeNames = this.docTypes.map(x => x.name);

        // if source exists already prefill existing content
        this.availableDocState = this.selectedTemplate.docState.filter(x => x.isActive === 'true');
        
        // populate document source
        this.selectedDocSource = this.selectedTemplate.docSource.filter(x => x.isActive === 'true').map(x => x.name);

        // populate document class
        this.selectedDocClass = this.selectedTemplate.docClass.name;
        /*

   
        // populate document state
        this.docStateTag = this.selectedTemplate.docState.map(y => y.name); 
    
        // if source exists already prefill existing content
        this.DocStateSelectTag = this.selectedTemplate.docState.filter(x => x.isActive === 'true');

        this.DocSourceSelectTag = this.selectedTemplate.docSource.filter(x => x.isActive === 'true').map(x => x.name);
           
        this.showOtherElements = true;
        */
      }
      
    });
  }   

  templateNameSelected(event) {
    this.loadData(event);  
  }

  docTypeSelected(event: any) {
    let selectedDocType = this.docTypes.find(x => x.name === event);

    // get the Properties for the selectedDoctype
    this.selectedProperties = selectedDocType.property;

    // get the MetaTags for the selectedDoctype
     this.selectedMetaTags = selectedDocType.metatags.map(x => x);

    // // prefill existing metatags
    // this.DocMetaSelectTag = this.docMetaTag.map(x => x);
  }

  uploadFile() {
    // setup the modal to send to API
    let formData = new FormData();
    this.fileArray.forEach(file => {
      formData.append('File', file);
    });

    this.fileSearchService.uploadFile(formData).subscribe((data) => {
      console.log('called api to upload', data);
    }, err => {
      console.log('error while upload', err);
    });    

    this.modalService.dismissAll();
  }

}
