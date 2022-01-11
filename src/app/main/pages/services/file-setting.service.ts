import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileSettingService {

  constructor(private http: HttpClient) { }

  getTemplates() {
    return this.http.get(environment.apiUrl + "Config/GetTemplates");
  }

  getDocSource() {
    return of ( [
      {
        id: '1',
        name: 'Application Source 1',
        description: 'description one'
      },
      {
        id: '2',
        name: 'Application Source 2',
        description: 'description two'
      },      
    ]);
  }

  getDocState() {
    return of ( [
        'Active','Inactive','Private'      
    ]);
  }

  getExistingData() {
    return of ( 
      {
        "template": {
          "name": "Template Two",
          "docSource": [{
              "name": "Application Source 1",
              "description": "description one"
            },
            {
              "name": "Application Source 2",
              "description": "description two"
            }
          ],
          "docState": [{
              "name": "Active",
              "isActive": true
            },
            {
              "name": "InActive",
              "isActive": true
            }
          ],
          "docClass": [{
            "name": "Document Class A",
            "description": "some text",
            "doctype": [{
                "name": "medical",
                "firstName": "string",
                "lastName": "string",
                "dob": "date",
                "metatags": {
                  "fn": "string",
                  "ln": "string",
                  "dob": "date"
                }
              }]
            }]
      }}
    );
  }
}
