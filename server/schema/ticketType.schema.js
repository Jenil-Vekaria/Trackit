import * as yup from 'yup';

export const createTicketTypeSchema = yup.object().shape({
    name: yup.string().required("ticket type name is required"),
    iconName: yup.string().required("ticket type icon name is required"),
    colour: yup.string()
});