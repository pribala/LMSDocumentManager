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
    //return this.http.get(environment.apiUrl + "Config/GetTemplates");

    return of (
      {
        "template": [{
            "name": "Template One",
            "docSource": [{
                "name": "Application Source 1",
                "description": "description one",
                "isActive": "true"
              },
              {
                "name": "Application Source 2",
                "description": "description two",
                "isActive": "false"
              }
            ],
            "docState": [{
                "name": "active",
                "isActive": "true"
              },
              {
                "name": "inactive",
                "isActive": "true"
              },
              {
                "name": "private",
                "isActive": "true"
              },
              {
                "name": "shared",
                "isActive": "true"
              }
            ],
            "docClass": {
              "name": "Medical",
              "description": "some text",
              "doctype": [{
                "name": "X-Ray",
                "property": [{
                    "name": "firstName",
                    "value": "string"
                  },
                  {
                    "name": "lastName",
                    "value": "string"
                  },
                  {
                    "name": "dob",
                    "value": "date"
                  }
                ],
                "metatags": [
                  "fn",
                  "ln",
                  "dob"
                ]
              },
              {
                "name": "Lab Report",
                "property": [{
                    "name": "full name",
                    "value": "string"
                  },
                  {
                    "name": "date of visit",
                    "value": "date"
                  }
                ],
                "metatags": [
                  "nm"
                ]
              }              
            ]
            }
          },
          {
            "name": "Template Two",
            "docSource": [{
                "name": "Application Source 3",
                "description": "description three",
                "isActive": "true"
              },
              {
                "name": "Application Source 4",
                "description": "description four",
                "isActive": "true"
              }
            ],
            "docState": [{
                "name": "active",
                "isActive": "true"
              },
              {
                "name": "inactive",
                "isActive": "true"
              },
              {
                "name": "private",
                "isActive": "false"
              },
              {
                "name": "shared",
                "isActive": "false"
              }
            ],
            "docClass": {
              "name": "Government",
              "description": "some text",
              "doctype": [{
                "name": "SSN",
                "property": [{
                    "name": "firstName",
                    "value": "string"
                  },
                  {
                    "name": "lastName",
                    "value": "string"
                  },
                  {
                    "name": "dob",
                    "value": "date"
                  },
                  {
                    "name": "ssn",
                    "value": "string"
                  }
                ],
                "metatags": [
                  "fn",
                  "ln",
                  "dob",
                  "ssn"
                ]
              }]
            }
          }
        ]
      }
    );




  }

  saveTemplate(model) {
    console.log('saving', model);
    return this.http.post(environment.apiUrl + 'Config/SaveTemplate', model);
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
