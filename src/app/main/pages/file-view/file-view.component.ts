import { ToastrService } from 'ngx-toastr';
import { FileSearchService } from './../services/file-search.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import { CoreTranslationService } from '@core/services/translation.service';

import { locale as german } from 'app/main/tables/datatables/i18n/de';
import { locale as english } from 'app/main/tables/datatables/i18n/en';
import { locale as french } from 'app/main/tables/datatables/i18n/fr';
import { locale as portuguese } from 'app/main/tables/datatables/i18n/pt';

import * as snippet from 'app/main/tables/datatables/datatables.snippetcode';

import { DatatablesService } from 'app/main/tables/datatables/datatables.service';
import saveAs from 'file-saver';
@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FileViewComponent implements OnInit {

  data = [];
  defaultKeys: string[] = ['File Name', 'description', 'tags', 'name'];
   // Private
   private _unsubscribeAll: Subject<any>;
   private tempData = [];
 
   // public
   public contentHeader: object;
   public rows: any;
   public selected = [];
   public kitchenSinkRows: any;
   public basicSelectedOption: number = 10;
   public ColumnMode = ColumnMode;
   public expanded = {};
   public editingName = {};
   public editingStatus = {};
   public editingAge = {};
   public editingSalary = {};
   public chkBoxSelected = [];
   public SelectionType = SelectionType;
   public exportCSVData;
   public searchText: string;
 
   @ViewChild(DatatableComponent) table: DatatableComponent;
   @ViewChild('tableRowDetails') tableRowDetails: any;
 
   // snippet code variables
   public _snippetCodeKitchenSink = snippet.snippetCodeKitchenSink;
   public _snippetCodeInlineEditing = snippet.snippetCodeInlineEditing;
   public _snippetCodeRowDetails = snippet.snippetCodeRowDetails;
   public _snippetCodeCustomCheckbox = snippet.snippetCodeCustomCheckbox;
   public _snippetCodeResponsive = snippet.snippetCodeResponsive;
   public _snippetCodeMultilangual = snippet.snippetCodeMultilangual;
 
   // Public Methods
   // -----------------------------------------------------------------------------------------------------
 
   /**
    * Inline editing Name
    *
    * @param event
    * @param cell
    * @param rowIndex
    */
   inlineEditingUpdateName(event, cell, rowIndex) {
     this.editingName[rowIndex + '-' + cell] = false;
     this.rows[rowIndex][cell] = event.target.value;
     this.rows = [...this.rows];
   }
 
   /**
    * Inline editing Age
    *
    * @param event
    * @param cell
    * @param rowIndex
    */
   inlineEditingUpdateAge(event, cell, rowIndex) {
     this.editingAge[rowIndex + '-' + cell] = false;
     this.rows[rowIndex][cell] = event.target.value;
     this.rows = [...this.rows];
   }
 
   /**
    * Inline editing Salary
    *
    * @param event
    * @param cell
    * @param rowIndex
    */
   inlineEditingUpdateSalary(event, cell, rowIndex) {
     this.editingSalary[rowIndex + '-' + cell] = false;
     this.rows[rowIndex][cell] = event.target.value;
     this.rows = [...this.rows];
   }
 
   /**
    * Inline editing Status
    *
    * @param event
    * @param cell
    * @param rowIndex
    */
   inlineEditingUpdateStatus(event, cell, rowIndex) {
     this.editingStatus[rowIndex + '-' + cell] = false;
     this.rows[rowIndex][cell] = event.target.value;
     this.rows = [...this.rows];
   }
 
   /**
    * Search (filter)
    *
    * @param event
    */
   filterUpdate(event) {
     console.log('event', event);
     const val = event.target.value.toLowerCase();
 
     // filter our data
     const temp = this.tempData.filter(function (d) {
       return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
     });
 
     // update the rows
     this.kitchenSinkRows = temp;
     // Whenever the filter changes, always go back to the first page
     this.table.offset = 0;
   }
 
   /**
    * Row Details Toggle
    *
    * @param row
    */
   rowDetailsToggleExpand(row) {
     this.tableRowDetails.rowDetail.toggleExpandRow(row);
   }
 
   /**
    * For ref only, log selected values
    *
    * @param selected
    */
   onSelect({ selected }) {
     console.log('Select Event', selected, this.selected);
 
     this.selected.splice(0, this.selected.length);
     this.selected.push(...selected);
   }
 
   /**
    * For ref only, log activate events
    *
    * @param selected
    */
   onActivate(event) {
     // console.log('Activate Event', event);
   }
 
   /**
    * Custom Chkbox On Select
    *
    * @param { selected }
    */
   customChkboxOnSelect({ selected }) {
     this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
     this.chkBoxSelected.push(...selected);
   }
 
   /**
    * Constructor
    *
    * @param {DatatablesService} _datatablesService
    * @param {CoreTranslationService} _coreTranslationService
    */
   constructor(private _datatablesService: DatatablesService
      , private _coreTranslationService: CoreTranslationService
      , private fileSearchService: FileSearchService
      , private toastr: ToastrService) {
     this._unsubscribeAll = new Subject();
     this._coreTranslationService.translate(english, french, german, portuguese);
   }
 
   // Lifecycle Hooks
   // -----------------------------------------------------------------------------------------------------
 
   /**
    * On init
    */
   ngOnInit() {
     this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
       //this.rows = response;
       this.rows = this.data;
       this.tempData = this.rows;
       this.kitchenSinkRows = this.rows;
       this.exportCSVData = this.rows;
     });
 
     // content header
     this.contentHeader = {
       headerTitle: 'Files',
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

   search() {
    this.fileSearchService.search(this.searchText).subscribe((results: []) => {
      this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
        //this.rows = response;
        this.rows = results.map((item: any) => {
          return {
            name: item.name,
            description: item.description,
            metadata: item.metadata.filter(x => x.name !== 'Tags'),
            size: item.size,
            addedBy: item.addedBy,
            addedDate: new Date(item.addedDate).toString() !== 'Invalid Date' ? new Date(item.addedDate).toLocaleDateString("en-US") : '',
            tags: item.tags,
            id: item.id
          }
        });
        this.tempData = this.rows;
        this.kitchenSinkRows = this.rows;
        this.exportCSVData = this.rows;
      });
      

    });
   }

   downloadFile(id, fileName) {
     this.fileSearchService.donwloadFile(id).subscribe((data : any) => {
       saveAs(data, fileName);
     }, err => {
      this.toastr.error('Error occured ' + err);
     });
   }

   viewFile(id, fileName) {
    this.fileSearchService.donwloadFile(id).subscribe((data) => {
     console.log(data);
     this.fileSearchService.GetFile(data, fileName)
    }, err => {
      this.toastr.error('Error occured ' + err);
    });
  }   
}