import * as yup from 'yup';

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

export const createTicketTypeSchema = yup.object().shape({
    name: yup.string().required("ticket type name is required"),
    iconName: yup.string().required("ticket type icon name is required"),
    colour: yup.string()
});

export const createProjectSchema = yup.object().shape({
    title: yup.string().required("project title required"),
    description: yup.string(),
    assignees: yup.array().required("Assignees required"),
});
