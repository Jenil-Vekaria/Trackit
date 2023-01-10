import * as yup from 'yup';

// check("email", "Invalid email").isEmail(),
// check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
// check("confirmPassword").not().isEmpty(),
// check("firstName", "Invalid first name").not().isEmpty(),
// check("lastName", "Invalid last name").not().isEmpty()

export const signupSchema = yup.object().shape({
    firstName: yup.string().required("first name required"),
    lastName: yup.string().required("last name required"),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Required"),
    confirmPassword: yup.string().oneOf(
        [yup.ref("password"), null],
        "Passwords must match",
    ),
});

export const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Required"),
});