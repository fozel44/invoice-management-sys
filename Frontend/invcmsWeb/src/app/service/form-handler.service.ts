import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class FormHandlerService {

  constructor(private fb: FormBuilder) {
  }

  entityToForm(obj: Object): FormGroup {
    if (obj) {
      const formValue = this.generateFormDto(obj);
      return formValue;
    } else {
      return this.fb.group({});
    }

  }

  generateFormDto(obj: Object): any {
    let formElement = {};
    let type = null;
    for (const key in obj) {
      formElement[key] = [null];
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value) {
          type = typeof value;
        }
        if (value != null && type) {
          if (type === "object") {
            // check array
            if (value instanceof Date) {
              formElement[key] = new Date(obj[key]);
            } else if (value instanceof Array) {
              formElement[key] = this.fb.array([]);
              for (let i = 0; i < obj[key].length; i++) {
                if(type === "object"){
                  formElement[key].push(this.generateFormDto(obj[key][i]) )
                }else {
                formElement[key].push(this.fb.group(obj[key][i]));
                }
              }
            } else if (value instanceof Object) {
              formElement[key] = this.generateFormDto(obj[key]);
            } else if (typeof value === "boolean") {
              formElement[key] = obj[key];
            }
          } else if (type === "string") {
            if (toDate(value)) {
              formElement[key] = new Date(obj[key]);
            } else {
              formElement[key] = obj[key];
            }
          } else if (type === "number" || type === "bigint") {
            formElement[key] = obj[key];
          } else {
            formElement[key] = obj[key];
          }
        }
      }
    }
    return this.fb.group(formElement);
  }


  formToEntity(formValue: object, entity: Object): any {
    const obj = formValue;
    let type = null;
    if (!entity) {
      entity = {};
    }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value) {
          type = typeof value;
        }
        if (value != null && type) {
          if (type === "object") {
            if (value instanceof Date) {
              entity[key] = new Date(value);
            } else if (value instanceof Array) {
              if (!(value.length > 0)) {
                entity[key] = null;
              } else {
                entity[key] = value;
              }
            } else if (value instanceof Object) {
              entity[key] = this.formToEntity(obj[key], entity[key])
            }
          } else if (value === "string") {
            if (toDate(value)) {
              entity[key] = new Date(value);
            } else {
              entity[key] = value.trim();
            }
          } else if (value === "number") {
            entity[key] = value;
          } else {
            entity[key] = value;

          }
        }
      }
    }
    return entity;

  }

  checkDate(date: string) {
    const formatRegex =
      [{
        dateTimeFormat: 'DD/MM/YYYY HH:mm',
        regex: "^([1-9]|([012][0-9])|(3[01]))-([0]{0,1}[1-9]|1[012])-\d\d\d\d [012]{0,1}[0-9]:[0-6][0-9]$"
      },
        {
          dateOnlyFormat: 'DD/MM/YYYY', //^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$

        }


      ]


  }
}

export const dateFormats = {
  dateTimeFormat: 'DD/MM/YYYY HH:mm',  // ^([1-9]|([012][0-9])|(3[01]))-([0]{0,1}[1-9]|1[012])-\d\d\d\d [012]{0,1}[0-9]:[0-6][0-9]$
  dateOnlyFormat: 'DD/MM/YYYY', //^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$
  monthYearFormat: 'MM/YYYY',
  isoFormat: 'YYYY-MM-DD HH:mm:SS ', // Corresponds to '2016-01-04T13:00:00Z' /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i+
  ///^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/
};

export function toDate(value: string,
                       /**
                        * The default has *all* the formats
                        *  - This is because strict date type validations
                        *  - are done by passing in explicit limited sets.
                        **/
                       formats = [
                         dateFormats.dateTimeFormat,
                         dateFormats.dateOnlyFormat,
                         dateFormats.isoFormat,
                         dateFormats.monthYearFormat,
                         moment.ISO_8601
                       ]
): boolean {
  //console.log( moment("2015-06-22T13:17:21+0000", formats, true).isValid())
  // http://momentjs.com/docs/#/parsing/string-formats/

  for (let i = 0; i < formats.length; i++) {
    if (moment(value, formats[i], true).isValid()) {
      return moment(value, formats[i], true).isValid();
    }
  }
  return false;
}

