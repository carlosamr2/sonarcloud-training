export interface UserFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
}

export interface User {
  name: string;
  email: string;
  password: string;
  age: number;
  createdAt: string;
}

export interface ValidationError {
  field: keyof UserFormData;
  message: string;
}
