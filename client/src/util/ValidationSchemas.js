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
    roleId: Yup.string().required("Role is required")
});

export const SignUpData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleId: ""
};


export const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email"),
    password: Yup.string().required("Required")
});

export const LoginData = {
    email: "",
    password: "",
};

export const ManageUserSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required")
});


export const CreateProjectSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
});

export const CreateProjectData = {
    title: "",
    description: "",
    assignees: []
};

export const CreateTicketSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
    estimatedTime: Yup.number().required("Required"),
    estimatedTimeUnit: Yup.string().required("Required")
});

export const CreateTicketData = {
    title: "",
    type: "",
    description: "",
    status: "",
    estimatedTime: 0,
    estimatedTimeUnit: "",
    assignees: []
};

export const CreateRoleSchema = Yup.object().shape({
    name: Yup.string().min(1, "Cannot be empty").required("Required"),
    permissions: Yup.array()
});

export const CreateRoleData = {
    name: "",
    permissions: []
};

export const CreateTicketTypeSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    iconName: Yup.string(),
    colour: Yup.string().required("Required"),
});

export const CreateTicketTypeData = {
    name: "",
    iconName: "",
    colour: "#000000",
};

export const CreateCommentSchema = Yup.object().shape({
    text: Yup.string().trim().min(1, "Cannot be empty")
});

export const CreateCommentData = {
    text: ""
};