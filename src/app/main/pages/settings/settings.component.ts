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
    this.loadData();
  }

  saveTemplate() {
    console.log(this.items);
  }

  loadData() {   
    // get templates
    this.fileSettingService.getTemplates().subscribe((data: any) => {
      console.log('templates', data);

      this.templates = data.template;

      this.templateNames = this.templates.map(x => x.name);

      /*
      this.settings = data.map(item => item.settings);

      _.find(this.settings.flatMap(x => x), (item) => {
        let templateName =_.find(item.value, (element) => {
          return element.name === 'name'
        });
        //this.templates.push({id: templateName.value, name: templateName.value});
        // Ng-select component implements OnPush so have to push like below not above
        this.templates = [...this.templates, {name: templateName.value}];
      });

      console.log(this.templates);
      */
    });

    // load all docSources and docStates
    // forkJoin(
    //   {
    //     requestDocSource: this.fileSettingService.getDocSource(), 
    //     requestDocState: this.fileSettingService.getDocState()
    //   }
    // ).subscribe(({requestDocSource, requestDocState}) => {
    //   this.docSource = requestDocSource;
    //   this.docSource.forEach((s, i) => {
    //     this.docSourceTag.push({ id: i, name: s.name });
    //   });      
    //   this.docState = requestDocState;
    //   this.docState.forEach((s, i) => {
    //     this.docStateTag.push({ id: i, name: s });
    //   });   
    // });
  }

  templateNameSelected(event) {
    console.log(event);

    this.selectedTemplate = this.templates.find(x => x.name === event);

    console.log('selectedTemplate', this.selectedTemplate);

    // populate document source
    this.docSourceTag = this.selectedTemplate.docSource.filter(x => x.isActive === 'true').map(y => y.name);

    console.log('docSourceTag', this.docSourceTag);

    // populate document state
    this.docStateTag = this.selectedTemplate.docState.filter(x => x.isActive === 'true').map(y => y.name);

    // populate document class
    this.selectedDocClass = this.selectedTemplate.docClass.name;
   
    // populate document type
    this.docTypes = this.selectedTemplate.docClass.doctype;
    this.docTypeNames = this.docTypes.map(x => x.name);

    this.showOtherElements = true;
   
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

    console.log('docMetaTag', this.docMetaTag);
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
    console.log(form.value);
  }
}