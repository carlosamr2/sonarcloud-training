import React from 'react';
import { useUserForm } from '../hooks/useUserForm';
import { FormInput } from './FormInput';
import styles from './UserSignupForm.module.css';

export const UserSignupForm: React.FC = () => {
  const {
    formData,
    errors,
    isSuccess,
    submittedUser,
    updateField,
    handleSubmit,
  } = useUserForm();

  const getFieldError = (fieldName: string) => {
    return errors.some((error) => error.field === fieldName);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Signup - REFACTORED</h1>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <FormInput
          id="name"
          label="Name"
          type="text"
          value={formData.name}
          onChange={(value) => updateField('name', value)}
          hasError={getFieldError('name')}
          placeholder="Enter your full name"
        />

        <FormInput
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => updateField('email', value)}
          hasError={getFieldError('email')}
          placeholder="example@email.com"
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={(value) => updateField('password', value)}
          hasError={getFieldError('password')}
          placeholder="Min. 8 characters, 1 uppercase, 1 number"
        />

        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(value) => updateField('confirmPassword', value)}
          hasError={getFieldError('confirmPassword')}
          placeholder="Re-enter your password"
        />

        <FormInput
          id="age"
          label="Age"
          type="number"
          value={formData.age}
          onChange={(value) => updateField('age', value)}
          hasError={getFieldError('age')}
          placeholder="Must be 18 or older"
        />

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>

      {errors.length > 0 && (
        <div className={styles.errorList}>
          {errors.map((error, index) => (
            <div key={index} className={styles.errorItem}>
              • {error.message}
            </div>
          ))}
        </div>
      )}

      {isSuccess && (
        <div className={styles.successMessage}>
          User created successfully!
        </div>
      )}

      {submittedUser && (
        <pre className={styles.userData}>
          {JSON.stringify(submittedUser, null, 2)}
        </pre>
      )}
    </div>
  );
};
