import { FileSettingService } from './../services/file-setting.service';
import { Component, OnInit } from '@angular/core'
//import { repeaterAnimation } from 'app/main/forms/form-repeater/form-repeater.animation';

import * as snippet from 'app/main/forms/form-repeater/form-repeater.snippetcode';
import { forkJoin, Observable } from 'rxjs';
import { DataService } from 'app/main/forms/form-elements/select/data.service';
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

  public docSource = [];
  public docState = [];

  // dropdown for Document Source
  public docSourceTag: any[] = [];
  public DocSourceSelectTag;

  // dropdown for Document State
  public docStateTag: any[] = [];
  public DocStateSelectTag = [];

  // text for Document Class
  selectedDocClass: string;

  // text for Document Type
  selectedDocType: string;

  // metaTags from Document Type
  selectedMetaTags: any[] = [];

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
    // load all docSources and docStates
    forkJoin(
      {
        requestDocSource: this.fileSettingService.getDocSource(), 
        requestDocState: this.fileSettingService.getDocState()
      }
    ).subscribe(({requestDocSource, requestDocState}) => {
      this.docSource = requestDocSource;
      this.docSource.forEach((s, i) => {
        this.docSourceTag.push({ id: i, name: s.name });
      });      
      this.docState = requestDocState;
      this.docState.forEach((s, i) => {
        this.docStateTag.push({ id: i, name: s });
      });   
    });
  }

  // once DocSource is selected get related items
  docSourceSelected(event: any){
    this.fileSettingService.getExistingData().subscribe(data => {
      this.resetData();
      var selectedDocSource = data.find(x => x.docSource.name === event.name);
      if (selectedDocSource) {
        // if source exists already prefill existing content
        selectedDocSource.docState.forEach((s, i) => {
          this.DocStateSelectTag.push({name: s});          
        });

        // document class comes as array, need just 1st
        if (selectedDocSource.docClass &&  selectedDocSource.docClass[0])
        {
          this.selectedDocClass = selectedDocSource.docClass[0]?.name;

          // get the 1st doctype
          if (selectedDocSource.docClass[0].doctype)
          {
            // set text for Document Type
            this.selectedDocType = selectedDocSource.docClass[0].doctype[0].name;
            
            // set metaTags from Document Type
            this.selectedMetaTags = selectedDocSource.docClass[0].doctype[0].metatags;
            console.log(this.selectedMetaTags);
            this.selectedMetaTags.forEach(item => {
               console.log(item);
            });
          }
        }
        this.showOtherElements = true;
      } else {
        this.showOtherElements = true;
      }
    }, err =>  {
      alert(err);
    });
  }

  resetData() {
    this.DocStateSelectTag = [];
    this.selectedDocClass = '';
    this.selectedDocType = '';
    this.selectedMetaTags = [];
  }

  deleteMetaTag(index: number) {
    this.selectedMetaTags.splice(index, 1);
  }
}