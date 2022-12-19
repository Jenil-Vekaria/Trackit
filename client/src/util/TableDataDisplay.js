import MiscellaneousService from "../services/miscellaneous-service";
import moment from "moment";
import { Badge } from "@chakra-ui/react";

export const PROJECTS_COLUMNS = [
    {
        name: "_id",
        header: "Id",
        defaultVisible: false,
        flex: 1,
        shouldComponentUpdate: () => true
    },
    {
        name: "title",
        header: "Title",
        flex: 3,
        render: ({ value }) => {
            return <span style={{
                fontWeight: "500",
                color: "purple",
                cursor: "pointer",
            }}>{value}</span>;
        },
        shouldComponentUpdate: () => true
    },
    {
        name: "description",
        header: "Description",
        flex: 3,
        shouldComponentUpdate: () => true
    },
    {
        name: "authorId",
        header: "Author",
        flex: 1,
        render: ({ value }) => {
            return <span>{MiscellaneousService.getUserFullName(value)}</span>;
        },
        shouldComponentUpdate: () => true
    },
    {
        name: "createdOn",
        header: "Created On",
        flex: 1,
        render: ({ value }) => {
            return <span>{moment(value).format("MMMM DD, YYYY")}</span>;
        }
    }
];

export const TICKETS_COLUMNS = [
    {
        name: "_id",
        header: "Id",
        defaultVisible: false,
        flex: 1,
        shouldComponentUpdate: () => true
    },
    {
        name: "title",
        header: "Title",
        flex: 3,
        render: ({ value }) => {
            return <span style={{
                fontWeight: "500",
                color: "purple",
                cursor: "pointer",
            }}>{value}</span>;
        },
        shouldComponentUpdate: () => true
    },
    {
        name: "description",
        header: "Description",
        flex: 3,
        shouldComponentUpdate: () => true
    },
    {
        name: "status",
        header: "Status",
        flex: 1,
        render: ({ value }) => {
            switch (value) {
                case "Open":
                    return <Badge colorScheme='orange'>{value}</Badge>;
                case "In-Progress":
                    return <Badge colorScheme='green'>{value}</Badge>;
                case "Closed":
                    return <Badge colorScheme='blue'>{value}</Badge>;
                case "Archived":
                    return <Badge colorScheme='facebook'>{value}</Badge>;
                default:
                    return <Badge colorScheme='green'>{value}</Badge>;
            }
        },
        shouldComponentUpdate: () => true
    },
    {
        name: "createdOn",
        header: "Created On",
        flex: 1,
        render: ({ value }) => {
            return <span>{moment(value).format("MMMM DD, YYYY")}</span>;
        }
    }
];

export const TICKETS_DEFAULT_SORT = { name: 'createdOn', dir: -1 };

export const USERS_COLUMNS = [
    {
        name: "_id",
        header: "Id",
        defaultVisible: false,
        shouldComponentUpdate: () => true
    },
    {
        name: "fullName",
        header: "Name",
        flex: 1,
        shouldComponentUpdate: () => true
    },
    {
        name: "role.name",
        header: "Role",
        flex: 1,
        render: ({ data }) => data.role.name,
        shouldComponentUpdate: () => true
    }
];