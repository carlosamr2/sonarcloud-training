import { UserFormData, ValidationError } from '../types/user';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;
const PASSWORD_NUMBER_REGEX = /\d/;
const MIN_AGE = 18;
const MAX_AGE = 120;
const MIN_NAME_LENGTH = 3;

export const validateName = (name: string): ValidationError | null => {
  if (!name.trim()) {
    return { field: 'name', message: 'Name is required' };
  }
  if (name.trim().length < MIN_NAME_LENGTH) {
    return { field: 'name', message: `Name must be at least ${MIN_NAME_LENGTH} characters` };
  }
  return null;
};

export const validateEmail = (email: string): ValidationError | null => {
  if (!email.trim()) {
    return { field: 'email', message: 'Email is required' };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { field: 'email', message: 'Please enter a valid email address' };
  }
  return null;
};

export const validatePassword = (password: string): ValidationError | null => {
  if (!password) {
    return { field: 'password', message: 'Password is required' };
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return { field: 'password', message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters` };
  }
  if (!PASSWORD_UPPERCASE_REGEX.test(password)) {
    return { field: 'password', message: 'Password must contain at least one uppercase letter' };
  }
  if (!PASSWORD_NUMBER_REGEX.test(password)) {
    return { field: 'password', message: 'Password must contain at least one number' };
  }
  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): ValidationError | null => {
  if (password !== confirmPassword) {
    return { field: 'confirmPassword', message: 'Passwords do not match' };
  }
  return null;
};

export const validateAge = (age: number): ValidationError | null => {
  if (!age || age === 0) {
    return { field: 'age', message: 'Age is required' };
  }
  if (age < MIN_AGE) {
    return { field: 'age', message: `You must be at least ${MIN_AGE} years old` };
  }
  if (age > MAX_AGE) {
    return { field: 'age', message: 'Please enter a valid age' };
  }
  return null;
};

export const validateUserForm = (formData: UserFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  const nameError = validateName(formData.name);
  if (nameError) errors.push(nameError);

  const emailError = validateEmail(formData.email);
  if (emailError) errors.push(emailError);

  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.push(passwordError);

  const confirmPasswordError = validateConfirmPassword(
    formData.password,
    formData.confirmPassword
  );
  if (confirmPasswordError) errors.push(confirmPasswordError);

  const ageError = validateAge(formData.age);
  if (ageError) errors.push(ageError);

  return errors;
};
