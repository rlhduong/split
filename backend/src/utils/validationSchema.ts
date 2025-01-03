export const registerValidationSchema = {
  username: {
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: 'Username must be between 3 and 20 characters',
    },
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters',
    },
    matches: {
      options: /(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{6,}/,
      errorMessage:
        'Password must contain at least one number, one uppercase letter, and one lowercase letter',
    },
  },
};
