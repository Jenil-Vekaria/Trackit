import * as yup from 'yup';

export const signupSchema = yup.object().shape({
    firstName: yup.string().required("First name required"),
    lastName: yup.string().required("Last name required"),
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
    name: yup.string().required("Ticket type name is required"),
    iconName: yup.string().required("Ticket type icon name is required"),
    colour: yup.string()
});

export const createProjectSchema = yup.object().shape({
    title: yup.string().required("Project title required"),
    description: yup.string(),
    assignees: yup.array().required("Assignees required"),
});

export const createTicketSchema = yup.object().shape({
    title: yup.string().required("Ticket title required"),
    status: yup.string().required("Ticket status required"),
    type: yup.string().required("Ticket type required"),
    estimatedTime: yup.number().required("Ticket estimated time required"),
    estimatedTimeUnit: yup.string().required("Ticket estimated time unit required")
});

export const createRoleSchema = yup.object().shape({
    name: yup.string().min(1, "Role name cannot be empty").required("Required"),
    permissions: yup.array()
});

export const createCommentSchema = yup.object().shape({
    text: yup.string().trim().min(1, "Comment cannot be empty")
});