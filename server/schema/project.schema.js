import * as yup from 'yup';

export const createProjectSchema = yup.object().shape({
    title: yup.string().required("project title required"),
    description: yup.string()
});
