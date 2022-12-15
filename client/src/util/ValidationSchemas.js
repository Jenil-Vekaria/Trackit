import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .min(6, "Must be minimum 6 characters long")
        .required("Required"),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match",
    ),
});

export const SignUpData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};


export const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email"),
    password: Yup.string().required("Required")
});

export const LoginData = {
    email: "",
    password: "",
};


export const CreateProjectSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string(),
    assignees: Yup.array().required("Assignees Required"),
});

export const CreateProjectData = {
    title: "",
    description: "",
    assignees: ""
};

export const CreateTicketSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    estimatedTime: Yup.number().required("Required")
});

export const CreateTicketData = {
    title: "",
    type: "",
    description: "",
    status: "Open",
    estimatedTime: 0,
    estimatedTimeUnit: "h",
    assginees: []
};