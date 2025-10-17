import { useState, useCallback } from 'react';
import { UserFormData, User, ValidationError } from '../types/user';
import { validateUserForm } from '../utils/validation';

interface UseUserFormReturn {
  formData: UserFormData;
  errors: ValidationError[];
  isSuccess: boolean;
  submittedUser: User | null;
  updateField: (field: keyof UserFormData, value: string | number) => void;
  handleSubmit: () => void;
  resetForm: () => void;
}

const INITIAL_FORM_DATA: UserFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: 0,
};

export const useUserForm = (): UseUserFormReturn => {
  const [formData, setFormData] = useState<UserFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedUser, setSubmittedUser] = useState<User | null>(null);

  const updateField = useCallback(
    (field: keyof UserFormData, value: string | number) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors([]);
      setIsSuccess(false);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    setErrors([]);
    setIsSuccess(false);

    const validationErrors = validateUserForm(formData);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulación de guardado exitoso
    const newUser: User = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      age: formData.age,
      createdAt: new Date().toISOString(),
    };

    setSubmittedUser(newUser);
    setIsSuccess(true);
    console.log('User created successfully:', newUser);
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors([]);
    setIsSuccess(false);
    setSubmittedUser(null);
  }, []);

  return {
    formData,
    errors,
    isSuccess,
    submittedUser,
    updateField,
    handleSubmit,
    resetForm,
  };
};
