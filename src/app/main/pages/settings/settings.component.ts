import { Component, OnInit } from '@angular/core'
//import { repeaterAnimation } from 'app/main/forms/form-repeater/form-repeater.animation';

import * as snippet from 'app/main/forms/form-repeater/form-repeater.snippetcode';
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

  // snippet code variable
  public _snippetCodeInvoiceRepeater = snippet.snippetCodeInvoiceRepeater;

  constructor() {}

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
  }

  saveTemplate() {
    console.log(this.items);
  }
}