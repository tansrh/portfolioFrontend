import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const minifyObject = (object: any)=>{
  if(!object || typeof object !== 'object') return object;
  if(Array.isArray(object)) {
    object.filter((item)=>{
      if(typeof item === 'object') {
        return Object.keys(minifyObject(item)).length > 0;
      }
      else{
        return item !== null && item !== undefined && item !== '';
      }
    })
    return object;
  }
  else if(typeof object === 'object') {
    Object.keys(object).forEach((key)=>{
      if(object[key] === null || object[key] === undefined || object[key] === '' || (typeof object[key] === 'object' && Object.keys(object[key]).length === 0)) {
        delete object[key];
      } else {
       object[key]= minifyObject(object[key]);
       if(Object.keys(object[key]).length === 0){
        delete object[key];
       }
      }
    });
    return object;
  }
}