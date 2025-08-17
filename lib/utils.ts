/**
 * Formats a date string or Date object as 'day month year' (e.g., '12 January 2025').
 * Returns empty string if input is invalid.
 */
export function formatDayMonthYear(dateInput: string | Date | undefined | null): string {
  if (!dateInput) return '';
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (!date || isNaN(date.getTime())) return '';
  return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
}
// Utility to validate a value against an array of rule objects
function getValidationError(value: any, rulesArr: any[]): string | undefined {
  for (const ruleObj of rulesArr) {
    if (ruleObj.required && (!value || (value === ""))) {
      return ruleObj.required.message;
    }
    if (ruleObj.minlength && value && value.length < ruleObj.minlength.test) {
      return ruleObj.minlength.message;
    }
    if (ruleObj.maxlength && value && value.length > ruleObj.maxlength.test) {
      return ruleObj.maxlength.message;
    }
    if (ruleObj.pattern && value && !ruleObj.pattern.test.test(value)) {
      return ruleObj.pattern.message;
    }
    if (ruleObj.callbackCheck && typeof ruleObj.callbackCheck.test === "function" && !ruleObj.callbackCheck.test(value)) {
      return ruleObj.callbackCheck.message;
    }
  }
  return undefined;
}
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import validations from "@/configs/validationConfigs";
// TypeScript fix: add index signature for dynamic key access
const typedValidations: { [key: string]: any } = validations;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const minifyObject = (object: any) => {
  if (!object || typeof object !== 'object') return object;
  if (Array.isArray(object)) {
    object.filter((item) => {
      if (typeof item === 'object') {
        return Object.keys(minifyObject(item)).length > 0;
      }
      else {
        return item !== null && item !== undefined && item !== '';
      }
    })
    return object;
  }
  else if (typeof object === 'object') {
    Object.keys(object).forEach((key) => {
      if (object[key] === null || object[key] === undefined || object[key] === '' || (typeof object[key] === 'object' && Object.keys(object[key]).length === 0)) {
        delete object[key];
      } else {
        object[key] = minifyObject(object[key]);
        if (Object.keys(object[key]).length === 0) {
          delete object[key];
        }
      }
    });
    return object;
  }
}

export function getRichText(value: string) {
  if (!value) return "";
  const text = value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim();

  return text;
}

export function validateField(fieldValue: string, sectionConfig: any, errors: any, sectionKey: string, index: number | null | undefined = null) {
  if (Array.isArray(sectionConfig)) {
    const error = getValidationError(getRichText(fieldValue), sectionConfig);

    if (error) {
      if (index !== null && index !== undefined) {
        if (!errors[sectionKey]) errors[sectionKey] = {};
        errors[sectionKey][index] = error;
      }
      else {
        errors[sectionKey] = error;
      }
    }
  } else if (typeof sectionConfig === "object") {
    Object.keys(sectionConfig).forEach(fieldKey => {
      const rulesArr = sectionConfig[fieldKey];
      const value = getRichText(fieldValue[fieldKey as any]);
      if (!rulesArr || !Array.isArray(rulesArr)) return;
      const error = getValidationError(value, rulesArr);
      if (error) {
         if (index !== null && index !== undefined) {
          if (!errors[sectionKey]) errors[sectionKey] = {};
          if (!errors[sectionKey][index]) errors[sectionKey][index] = {};
          errors[sectionKey][index][fieldKey] = error;
        } else {
          if (!errors[sectionKey]) errors[sectionKey] = {};
          errors[sectionKey][fieldKey] = error;
        }
      }
    });
  }
}


export async function validateFormFields(fields: any, validation: string) {
  return new Promise((resolve, reject) => {
    if (!fields) return reject("Fields cannot be empty");
    const errors: any = {};
    Object.keys(typedValidations[validation]).forEach(sectionKey => {
      const sectionConfig = typedValidations[validation][sectionKey];
      const fieldValue = fields[sectionKey];
      if (Array.isArray(fieldValue)) {
        Object.keys(fieldValue).map((itemValue: any, idx) => {

          validateField(fieldValue[itemValue], sectionConfig, errors, sectionKey, idx);
        })
      }
      else {
        if (Array.isArray(sectionConfig)) {
          if (typeof fieldValue === "object" && fieldValue !== null) {
            Object.keys(fieldValue).map((fieldKey, idx) => {
              validateField(fieldValue[fieldKey], sectionConfig, errors, sectionKey, idx);
            });
          }
          else {
            validateField(fieldValue, sectionConfig, errors, sectionKey);
          }
        }
        else {
          validateField(fieldValue, sectionConfig, errors, sectionKey);
        }

      }

    });
    if (Object.keys(minifyObject(errors)).length > 0) {
      reject(errors);
    } else {
      resolve(true);
    }
  });
}

