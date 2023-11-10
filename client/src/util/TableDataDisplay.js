import MiscellaneousService from "../services/miscellaneous-service";
import moment from "moment";
import { AvatarGroup, Badge, Icon, Tooltip } from "@chakra-ui/react";
import * as BsIcon from "react-icons/bs";
import TooltipAvatar from "../components/others/TooltipAvatar";
import { getUserFullname } from "./Utils";


const styles = {
    fontWeight: "500",
    // color: "#CBD5E0",
    cursor: "pointer",
};

export const TICKETS_DEFAULT_SORT = { name: 'createdOn', dir: -1 };


export const PROJECTS_COLUMNS = [
    {
        name: "title",
        searchInField: ["title"],
        header: "TITLE",
        flex: 1,
        render: ({ value }) => {
            return <span style={styles}>{value}</span>;
        }
    },
    {
        name: "authorId",
        header: "AUTHOR",
        flex: 1,
        render: ({ value }) => {
            return value.firstName + " " + value.lastName;
        }
    },
    {
        name: "createdOn",
        searchInField: ["createdOn"],
        header: "CREATED ON",
        flex: 1,
        headerProps: {
            style: {
                backgroundColor: "#334154"
            }
        },
        render: ({ value }) => {
            return moment(value).format("MMMM DD, YYYY");
        }
    }
];

export const TICKETS_COLUMNS = [
    {
        name: "type",
        searchInField: ["type.name"],
        header: "TYPE",
        width: 55,
        headerEllipsis: false,
        render: ({ value }) => {
            const { iconName, colour, name } = value;
            return (
                <Tooltip label={name}>
                    <span>
                        <Icon as={BsIcon[iconName]} bg={colour} color="gray.50" w={6} h={6} p={1} borderRadius={5} />
                    </span>
                </Tooltip>
            );
        },
    },
    {
        name: "title",
        searchInField: ["title"],
        header: "TITLE",
        flex: 3,
        render: ({ value }) => {
            return <span style={styles}>{value}</span>;
        },
    },
    {
        name: "description",
        defaultVisible: false,
        header: "DESCRIPTION",
        flex: 3,
    },
    {
        name: "status",
        searchInField: ["status"],
        header: "STATUS",
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
    },
    {
        name: "assignees",
        header: "ASSIGNEES",
        flex: 1,
        render: ({ value }) => {
            return (
                <AvatarGroup size="sm" max={5}>
                    {
                        value.map(assignee => (
                            <TooltipAvatar key={assignee._id} name={assignee.firstName + " " + assignee.lastName} />
                        ))
                    }
                </AvatarGroup>
            );
        },

    },
    {
        name: "createdBy",
        header: "CREATED BY",
        flex: 1,
        render: ({ data }) => {
            return data.createdBy.firstName + " " + data.createdBy.lastName;
        },

    },
    {
        name: "createdOn",
        searchInField: ["createdOn"],
        header: "CREATED ON",
        flex: 1,
        render: ({ value }) => {
            return moment(value).format("MMMM DD, YYYY");
        },
    }
];

export const MY_TICKETS_COLUMNS = [
    {
        name: "type",
        searchInField: ["type.name"],
        header: "TYPE",
        width: 55,
        headerEllipsis: false,
        render: ({ value }) => {
            const { iconName, colour, name } = value;
            return (
                <Tooltip label={name}>
                    <span>
                        <Icon as={BsIcon[iconName]} bg={colour} color="gray.50" w={6} h={6} p={1} borderRadius={5} />
                    </span>
                </Tooltip>
            );
        },
    },
    {
        name: "projectId",
        searchInField: ["projectId.title"],
        header: "PROJECT",
        flex: 1,
        render: ({ data }) => {
            return <span style={styles}>{data.projectId.title}</span>;
        },
    },
    {
        name: "title",
        searchInField: ["title"],
        header: "TITLE",
        flex: 3,
        render: ({ value }) => {
            return <span style={styles}>{value}</span>;
        },
    },
    {
        name: "status",
        searchInField: ["status"],
        header: "STATUS",
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
    },
    {
        name: "assignees",
        header: "ASSIGNEES",
        flex: 1,
        render: ({ value }) => {
            return (
                <AvatarGroup size="sm" max={5}>
                    {
                        value.map(assignee => (
                            <TooltipAvatar key={assignee._id} name={assignee.firstName + " " + assignee.lastName} />
                        ))
                    }
                </AvatarGroup>
            );
        },

    },
    {
        name: "createdBy",
        header: "CREATED BY",
        flex: 1,
        render: ({ data }) => {
            return data.createdBy.firstName + " " + data.createdBy.lastName;
        },

    }
];

export const USERS_COLUMNS = [
    {
        name: "_id",
        searchInField: ["firstName", "lastName"],
        header: "NAME",
        flex: 1,
        render: ({ data }) => {
            return data.firstName + " " + data.lastName;
        }
    },
    {
        name: "roleId",
        header: "ROLE",
        flex: 1,
        render: ({ data }) => {
            return data.roleId.name;
        }
    }
];

export const PROJECT_ASSIGNEES_COLUMNS = [
    {
        name: "_id",
        searchInField: ["firstName", "lastName"],
        header: "NAME",
        flex: 1,
        render: ({ data }) => {
            return data.firstName + " " + data.lastName;

        }
    },
    {
        name: "assignees",
        header: "ROLE",
        flex: 1,
        render: ({ data }) => {
            return data.roleId.name;
        }
    }
];

export const MANAGE_USERS_COLUMNS = [
    {
        name: "_id",
        searchInField: ["firstName", "lastName"],
        header: "NAME",
        flex: 1,
        render: ({ data }) => {

            return (
                <span style={styles}>
                    {getUserFullname(data)}
                </span>
            );
        }
    },
    {
        name: "email",
        searchInField: ["email"],
        header: "EMAIL",
        flex: 1
    },
    {
        name: "roleId",
        header: "ROLE",
        flex: 1,
        render: ({ value }) => {
            return value?.name || "No Data";
        }
    }
];

export const MANAGE_ROLES = [
    {
        name: "name",
        header: "ROLE NAME",
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
        header: "PERMISSIONS",
        flex: 5,
        render: ({ value }) => {
            if (value.length > 0) {
                return value.map((permission, index) =>
                    <p key={index}>{permission}</p>
                );
            }
            else {
                return "--No Permissions--";
            }

        }
    }
];

export const MANAGE_TICKET_TYPES_COLUMNS = [
    {
        name: "_id",
        header: "ICON",
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
        header: "ICON NAME",
        flex: 1,
        searchInField: ["iconName"],
        render: ({ value }) => <span style={styles}>{value}</span>
    }
];

export const ICONS_COLUMNS = [
    {
        name: "icon",
        header: "ICON",
        headerEllipsis: false,
        width: 55,
    },
    {
        name: "name",
        header: "NAME",
        searchInField: ["name"],
        flex: 1,
        render: ({ value }) => <span style={styles}>{value}</span>
    }
];