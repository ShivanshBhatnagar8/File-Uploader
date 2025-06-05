const validationSchema = {
  firstName: {
    isLength: {
      options: {
        min: 3,
        max: 30,
      },
    },
    errorMessage: "First Name should be between 3-30 characters",
    trim: true,
  },
  lastName: {
    isLength: {
      options: {
        min: 3,
        max: 30,
      },
    },
    errorMessage: "Last Name should be between 3-30 characters",
    trim: true,
  },
  email: {
    isEmail: true,
    errorMessage: "Not a valid e-mail address",
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: "Password should be at least 6 chars",
    },
    trim: true,
  },
};
module.exports = validationSchema;
