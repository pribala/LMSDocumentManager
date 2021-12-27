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

  docSourceSelected(event: any){
    // check if docSource exists
    this.fileSettingService.getExistingData().subscribe(data => {
      this.DocStateSelectTag = [];
      var selectedDocSource = data.find(x => x.docSource.name === event.name);
      if (selectedDocSource) {
        // if source exists already prefill existing content
        selectedDocSource.docState.forEach((s, i) => {
          this.DocStateSelectTag.push({name: s});          
        });          
        this.showOtherElements = true;
      }
    }, err =>  {
      alert(err);
    });
  }
}