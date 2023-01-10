import MiscellaneousService from "../services/miscellaneous-service";
import moment from "moment";
import { AvatarGroup, Badge, Icon, Tooltip } from "@chakra-ui/react";
import * as BsIcon from "react-icons/bs";
import TooltipAvatar from "../components/others/TooltipAvatar";


const styles = {
    fontWeight: "500",
    color: "purple",
    cursor: "pointer",
};

export const PROJECTS_COLUMNS = [
    {
        name: "title",
        searchInField: ["title"],
        header: "Title",
        flex: 3,
        render: ({ value }) => {
            return <span style={styles}>{value}</span>;
        },
        shouldComponentUpdate: () => true
    },
    {
        name: "description",
        searchInField: ["description"],
        header: "Description",
        flex: 3,
        shouldComponentUpdate: () => true
    },
    {
        name: "authorId",
        header: "Author",
        flex: 1,
        render: ({ value }) => {
            return <span>{value.firstName} {value.lastName}</span>;
        },
        shouldComponentUpdate: () => true
    },
    {
        name: "createdOn",
        searchInField: ["createdOn"],
        header: "Created On",
        flex: 1,
        render: ({ value }) => {
            return moment(value).format("MMMM DD, YYYY");
        }
    }
];

export const TICKETS_COLUMNS = [
    {
        name: "type",
        searchInField: ["type"],
        header: "Type",
        width: 55,
        headerEllipsis: false,
        render: ({ value }) => {
            const { iconName, colour, name } = MiscellaneousService.getTicketTypeInfo(value);
            return (
                <Tooltip label={name}>
                    <span>
                        <Icon as={BsIcon[iconName]} bg={colour} color="gray.50" w={6} h={6} p={1} borderRadius={5} />
                    </span>
                </Tooltip>
            );
        },
        shouldComponentUpdate: () => true
    },
    {
        name: "title",
        searchInField: ["title"],
        header: "Title",
        flex: 3,
        render: ({ value }) => {
            return <span style={styles}>{value}</span>;
        },
        shouldComponentUpdate: () => true
    },
    {
        name: "description",
        searchInField: ["description"],
        defaultVisible: false,
        header: "Description",
        flex: 3,
        shouldComponentUpdate: () => true
    },
    {
        name: "status",
        searchInField: ["status"],
        header: "Status",
        flex: 1,
        render: ({ value }) => {
            switch (value) {
                case "Open":
                    return <Badge colorScheme='orange'>{value}</Badge>;
                case "In-Progress":
                    return <Badge colorScheme='blue'>{value}</Badge>;
                case "Done":
                    return <Badge colorScheme='green'>{value}</Badge>;
                case "Archived":
                    return <Badge colorScheme='facebook'>{value}</Badge>;
                default:
                    return <Badge colorScheme='green'>{value}</Badge>;
            }
        },
        shouldComponentUpdate: () => true
    },
    {
        name: "assignees",
        header: "Assignee(s)",
        flex: 1,
        render: ({ value }) => {
            return (
                <AvatarGroup size="sm" max={5}>
                    {
                        value.map(assigneeId => (
                            <TooltipAvatar key={assigneeId} name={MiscellaneousService.getUserFullName(assigneeId)} />
                        ))
                    }
                </AvatarGroup>
            );
        }
    },
    {
        name: "createdBy",
        header: "Created By",
        flex: 1,
        render: ({ value }) => {
            return MiscellaneousService.getUserFullName(value);
        }
    },
    {
        name: "createdOn",
        searchInField: ["createdOn"],
        header: "Created On",
        flex: 1,
        render: ({ value }) => {
            return moment(value).format("MMMM DD, YYYY");
        },
        shouldComponentUpdate: () => true
    }
];

export const TICKETS_DEFAULT_SORT = { name: 'createdOn', dir: -1 };

export const USERS_COLUMNS = [
    {
        name: "_id",
        searchInField: ["firstName", "lastName"],
        header: "Name",
        flex: 1,
        render: ({ value }) => {
            return MiscellaneousService.getUserFullName(value);
        },
        shouldComponentUpdate: () => true
    },
    {
        name: "roleId",
        header: "Role",
        flex: 1,
        render: ({ value }) => {
            return MiscellaneousService.getRoleInfo(value).name;
        },
        shouldComponentUpdate: () => true
    }
];

export const MANAGE_USERS_COLUMNS = [
    {
        name: "_id",
        searchInField: ["firstName", "lastName"],
        header: "Name",
        flex: 1,
        render: ({ value }) => {

            return (
                <span style={styles}>
                    {MiscellaneousService.getUserFullName(value)}
                </span>
            );
        },
        shouldComponentUpdate: () => true
    },
    {
        name: "email",
        searchInField: ["email"],
        header: "Email",
        flex: 1
    },
    {
        name: "roleId",
        header: "Role",
        flex: 1,
        render: ({ value }) => {
            return value?.name || "No Data";
        },
        shouldComponentUpdate: () => true
    }
];

export const MANAGE_ROLES = [
    {
        name: "name",
        header: "Role Name",
        searchInField: ["name"],
        render: ({ value }) => {

            return (
                <span style={styles}>
                    {value}
                </span>
            );
        },
        flex: 1
    },
    {
        name: "permissions",
        header: "Permissions",
        flex: 5,
        render: ({ value }) => {
            return value.map((permission, index) =>
                <p key={index}>{permission}</p>
            );
        }
    }
];

export const MANAGE_TICKET_TYPES_COLUMNS = [
    {
        name: "_id",
        header: "Icon",
        searchInField: ["name"],
        width: 55,
        headerEllipsis: false,
        render: ({ value }) => {
            const { iconName, colour } = MiscellaneousService.getTicketTypeInfo(value);
            return (
                <Icon as={BsIcon[iconName]} bg={colour} color="gray.50" w={6} h={6} p={1} borderRadius={5} />
            );
        }
    },
    {
        name: "name",
        header: "Icon Name",
        flex: 1,
        searchInField: ["iconName"],
        render: ({ value }) => <span style={styles}>{value}</span>
    }
];

export const ICONS_COLUMNS = [
    {
        name: "icon",
        header: "Icon",
        headerEllipsis: false,
        width: 55,
    },
    {
        name: "name",
        header: "Name",
        searchInField: ["name"],
        flex: 1,
        render: ({ value }) => <span style={styles}>{value}</span>
    }
];