import React from 'react';
import styles from './UserSignupForm.module.css';

interface FormInputProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number';
  value: string | number;
  onChange: (value: string | number) => void;
  hasError?: boolean;
  placeholder?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  hasError = false,
  placeholder,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      onChange(Number.parseInt(e.target.value, 10) || 0);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value || ''}
        onChange={handleChange}
        className={`${styles.input} ${hasError ? styles.inputError : ''}`}
        placeholder={placeholder}
      />
    </div>
  );
};
