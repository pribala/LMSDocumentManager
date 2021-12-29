import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileSettingService {

  constructor(private http: HttpClient) { }

  getDocSource() {
    return of ( [
      {
        id: '1',
        name: 'Wecare',
        description: 'Wecare is...'
      },
      {
        id: '2',
        name: 'HPD Connect',
        description: 'HPD Connect is...'
      },      
    ]);
  }

  getDocState() {
    return of ( [
        'Active','Inactive','Private'      
    ]);
  }

  getExistingData() {
    return of ( [
      {
        id: '123',
        name: 'template1',
        docSource: {
          name: 'Wecare',
          id: '1',
          description: 'Wecare is...'
        },
        docState: [
          'Active', 'Private'
        ],
        docClass: [
          {
            name: 'MyDocClass',
            description: 'some description of DocClass',
            doctype: [
              {
                name: 'Medical',
                firstName: 'string',
                lastName: 'string',
                dob: 'date',
                metatags: [
                  { 'fn':'string' },
                  { 'ln':'string' },
                  { 'dob': 'date' }
                ]	
              },
            ]
          },
        ]
      }  
    ]);
  }
}
