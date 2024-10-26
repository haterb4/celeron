export interface ValidationSchema {
    body?: any;
    query?: any;
    params?: any;
  }
  
  export interface ValidationError {
    field: string;
    message: string;
  }