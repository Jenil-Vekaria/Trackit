import MiscellaneousService from "../services/miscellaneous-service";
import moment from "moment";
import { assignRef, Avatar, AvatarGroup, Badge, Box, Flex, Icon, Tag, TagLabel, TagLeftIcon, Tooltip } from "@chakra-ui/react";
import {
    BsPlusLg,
    BsBugFill,
    BsFileEarmarkText,
    BsQuestion,
} from "react-icons/bs";
import TooltipAvatar from "../components/others/TooltipAvatar";

const iconMapping = {
    BsPlusLg,
    BsBugFill,
    BsFileEarmarkText,
    BsQuestion,
};

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
        name: "type",
        header: "Type",
        width: 55,
        headerEllipsis: false,
        render: ({ value }) => {
            const { iconName, colour, name } = MiscellaneousService.getTicketTypeInfo(value);
            return (
                <Tooltip label={name}>
                    <span>

                        <Icon as={iconMapping[iconName]} bg={colour} color="gray.50" w={6} h={6} p={1} borderRadius={5} />
                    </span>
                </Tooltip>
            );
        },
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
        defaultVisible: false,
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
        },
        includeInSearch: false, //custom field i added
    },
    {
        name: "createdOn",
        header: "Created On",
        flex: 2,
        render: ({ value }) => {
            return <span>{moment(value).format("MMMM DD, YYYY")}</span>;
        },
        shouldComponentUpdate: () => true
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