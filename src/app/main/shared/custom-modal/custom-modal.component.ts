import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileSearchService } from 'app/main/pages/services/file-search.service';
import { FileSettingService } from 'app/main/pages/services/file-setting.service';
import { NgForm } from '@angular/forms';
export interface SelectedTemplate {
  selectedTemplateName: string;
  selectedDocumentType: string;
  selectedDocSource: string;
  selectedDocClass: string;
  docTitle: string;
  docDescription: string;
  selectedProperties: SelectedProperty[];
  selectedMetaTags: string[];
}

export interface SelectedProperty {
  name: string;
  value: string;
}
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
  selectedTemplateId: string;

  @ViewChild('docForm') docForm: NgForm; 
  public availableDocState = [];
  fileArray: File[];
  documentTemplate: SelectedTemplate = {
    selectedTemplateName: '',
    selectedDocumentType: '',
    selectedDocSource: '',
    selectedDocClass: '',
    docTitle: '',
    docDescription: '',
    selectedProperties: [],
    selectedMetaTags: []
  };

  constructor(private modalService: NgbModal, private fileSettingService: FileSettingService, private fileSearchService: FileSearchService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadData(null);
    
  }

  openModal(modal){
    this.resetDocumentTemplate();
    this.modalService.open(modal, {
      windowClass: 'modal',
      size: 'lg',
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
        this.documentTemplate.selectedDocSource = this.selectedTemplate.docSource.filter(x => x.isActive === 'true').map(x => x.name);

        // populate document class
        this.documentTemplate.selectedDocClass = this.selectedTemplate.docClass.name;
      }
      
    });
  }  
  
  resetDocumentTemplate() {
    this.documentTemplate = {
      selectedTemplateName: '',
      selectedDocumentType: '',
      selectedDocSource: '',
      selectedDocClass: '',
      docTitle: '',
      docDescription: '',
      selectedProperties: [],
      selectedMetaTags: []
    };
  
  }

  templateNameSelected(event) {
    this.loadData(event);  
  }

  docTypeSelected(event: any) {
    let selectedDocType = this.docTypes.find(x => x.name === event);

    // get the Properties for the selectedDoctype
    this.documentTemplate.selectedProperties = selectedDocType.property;

    // get the MetaTags for the selectedDoctype
    this.documentTemplate.selectedMetaTags = selectedDocType.metatags.map(x => x);

    // create variables for each dynamic field
    this.documentTemplate.selectedProperties.forEach(field => {
      
    });
  }

  uploadFile(docForm) {
    
    // setup the modal to send to API
    let formData = new FormData();

    let form = docForm.form;
 
    this.fileArray = this.fileSearchService.getFiles();
   
    // docClass
    formData.append('docClass', this.documentTemplate.selectedDocClass);

    // Tags
    if (this.documentTemplate.selectedMetaTags && this.documentTemplate.selectedMetaTags.length > 0) {
      this.documentTemplate.selectedMetaTags.forEach(tag => {
        formData.append('Tags', tag);
      });
    }
    // custom fields
    if (this.documentTemplate.selectedProperties && this.documentTemplate.selectedProperties.length > 0) {
      this.documentTemplate.selectedProperties.forEach((property, index) => {
        formData.append(property.name, form.controls['title' + index].value);
      });    
    }

    // Title
    formData.append('Title', this.documentTemplate.docTitle);

    // Description
    formData.append('Description', this.documentTemplate.docDescription);
    this.fileArray.forEach(file => {
      formData.set('File', file);
      this.fileSearchService.uploadFile(formData).subscribe((data) => {
          this.toastr.success('File Uploaded');
        }, err => {
          this.toastr.error('Could not upload file');
      });    
   
    });
    docForm.form.reset();
    this.modalService.dismissAll();
  }

  close(modal) {
    modal.dismiss('Cross click');

  }
}
