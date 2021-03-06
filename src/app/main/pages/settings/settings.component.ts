import { filter } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { FileSettingService } from './../services/file-setting.service';
import { Component, OnInit } from '@angular/core'
//import { repeaterAnimation } from 'app/main/forms/form-repeater/form-repeater.animation';

import * as snippet from 'app/main/forms/form-repeater/form-repeater.snippetcode';
import { forkJoin, Observable } from 'rxjs';
import { DataService } from 'app/main/forms/form-elements/select/data.service';

import * as _ from 'underscore';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public contentHeader: object;
  public items = [{docClass: '', metadata: [{ settingId: '', tittle: '', displayValue: '', type: '' }]}];

  public item = {
    docClass: '',
    metadata:
    [
      {tittle: '',
      displayValue: '',
      type: ''
      }
    ] 
  };

  public templateData: any;
  templateNames: string[] = [];
  selectedTemplateName: string;
  templates: any;
  selectedTemplate: any;
  selectedTemplateId: any;

  settings: any;

  public docSource = [];
  public docState = [];

  // dropdown for Document Source
  public docSourceTag: string[] = [];
  public DocSourceSelectTag;

  // dropdown for Document State
  public docStateTag: string[] = [];
  public DocStateSelectTag = [];

  // text for Document Class
  selectedDocClass: string;

  docTypes: any;
  docTypeNames: string[] = [];
  DocTypeSelectTag: any;

  selectedProperties: any;

  docMetaTag: any;
  DocMetaSelectTag = [];

  // text for Document Type
  selectedDocType: any;

  // metaTags from Document Type
  selectedMetaTags = [];

  // show other elements once Document Source is selected
  showOtherElements: boolean = false;

  // snippet code variable
  public _snippetCodeInvoiceRepeater = snippet.snippetCodeInvoiceRepeater;

  constructor(private fileSettingService: FileSettingService, private dataService: DataService) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add Item
   */
  addGroup() {
    this.items.push({
      docClass: '',
      metadata: [{
        settingId: '',
        tittle: '',
        displayValue: '',
        type: ''
        }
      ]

    });
  }

    /**
   * Add Item
   */
     addItem(id) {
       console.log(id, this.items);
      this.items[id].metadata.push(
        {
          settingId: '',
          tittle: '',
          displayValue: '',
          type: ''
        }
      );
    }
  /**
   * DeleteItem
   *
   * @param id
   */
  deleteGroup(id) {
    // for (let i = 0; i < this.items.length; i++) {
    //   if (this.items.indexOf(this.items[i]) === id) {
    //     this.items.splice(i, 1);
    //     break;
    //   }
    // }
    if (this.items[id]) {
      this.items.splice(id, 1);
    }
  }

    /**
   * DeleteItem
   *
   * @param id
   */
     deleteItem(id, index) {
      // for (let i = 0; i < this.items[id].metadata.length; i++) {
      //   if (this.items[id].metadata.indexOf(this.items[id].metadata[i]) === index) {
      //     this.items.splice(i, 1);
      //     break;
      //   }
      // }
      if (this.items[id].metadata.length > 0) {
        this.items[id].metadata.splice(index, 1);
      }
    }

  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: 'Settings',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Files',
            isLink: true,
            link: '/'
          },
          {
            name: 'Settings',
            isLink: false
          }
        ]
      }
    };
    this.loadData(null);
  }

  saveTemplate() {
    console.log(this.items);
  }

  loadData(selectedTemplate: string) {   
    // get templates
    this.fileSettingService.getTemplates().subscribe((data: any) => {
      this.templates = data;
      this.templateNames = this.templates.map(x => x.Settings.name);

      if (selectedTemplate) {
        this.selectedTemplate = this.templates.find(x => x.Settings.name === selectedTemplate).Settings;

        this.selectedTemplateId = this.templates.find(x => x.Settings.name === selectedTemplate)._id;

        // populate document source
        this.docSourceTag = this.selectedTemplate.docSource.map(y => y.name);
    
        // populate document state
        this.docStateTag = this.selectedTemplate.docState.map(y => y.name); 
    
        // if source exists already prefill existing content
        this.DocStateSelectTag = this.selectedTemplate.docState.filter(x => x.isActive === 'true');

        this.DocSourceSelectTag = this.selectedTemplate.docSource.filter(x => x.isActive === 'true').map(x => x.name);

        // populate document class
        this.selectedDocClass = this.selectedTemplate.docClass.name;
       
        // populate document type
        this.docTypes = this.selectedTemplate.docClass.doctype;
        this.docTypeNames = this.docTypes.map(x => x.name);
    
        this.showOtherElements = true;
      }
    });
  }

  templateNameSelected(event) {
    this.loadData(event);  
  }

  // once DocSource is selected get related items
  docSourceSelected(event: any){



    /*
    this.fileSettingService.getExistingData().subscribe(data => {
      console.log(data);
      this.resetData();
      var selectedDocSource = data.template.docSource.find(x => x.name === event.name);
      if (selectedDocSource) {
        this.templateData = data;

        // if source exists already prefill existing content
        data.template.docState.forEach((element, i) => {
          this.DocStateSelectTag.push({name: element.name});          
        });
        this.selectedDocClass = selectedDocSource.name;

        // get the 1st doctype
        if (data.template.docClass[0].doctype)
        {
          // set text for Document Type
          this.selectedDocType = data.template.docClass[0].doctype[0];

          // set metaTags from Document Type
          for (let [key, value] of Object.entries(data.template.docClass[0].doctype[0].metatags)) {
          this.selectedMetaTags.push({key, value});
          }
        }
        this.showOtherElements = true;
      } else {
        this.showOtherElements = true;
      }
    }, err =>  {
      alert(err);
    });
    */
  }

  docTypeSelected(event: any) {
    let selectedDocType = this.docTypes.find(x => x.name === event);

    // get the Properties for the selectedDoctype
    this.selectedProperties = selectedDocType.property;

    // get the MetaTags for the selectedDoctype
    this.docMetaTag = selectedDocType.metatags;

    // prefill existing metatags
    this.DocMetaSelectTag = this.docMetaTag.map(x => x);
  }

  resetData() {
    this.DocStateSelectTag = [];
    this.selectedDocClass = '';
    this.selectedDocType = {};
    this.selectedMetaTags = [];
  }

  deleteProperty(index: number) {
    this.selectedProperties.splice(index, 1);
  }

  newProperty() {
    this.selectedProperties.push({});
  }

  saveForm(form: NgForm) {
    const templateModel = Object.assign({}, this.selectedTemplate); 
    console.log('before org', this.selectedTemplate);
    console.log('before model', templateModel);

    // Doc State
    templateModel.docState.forEach(state => {
      if (this.DocStateSelectTag.find(x => x === state.name)) {
        state.isActive = "true";
      }
      else {
        state.isActive = "false";
      }
    });
    
    const model = {
      _id : this.selectedTemplateId,
      Settings: this.selectedTemplate
    };

    console.log('after org', this.selectedTemplate);
    console.log('after model', model);

    this.fileSettingService.saveTemplate(model).subscribe(data => {
      console.log(data);
    })

    form.reset();
  }
}