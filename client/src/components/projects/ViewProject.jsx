import {
	Button,
	Center,
	Flex,
	Heading,
	IconButton,
	Spacer,
	Spinner,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TicketService from "../../services/ticket-service";
import {
	TICKETS_DEFAULT_SORT,
	TICKETS_COLUMNS,
} from "../../util/TableDataDisplay";
import CreateTicket from "../tickets/CreateTicket";
import { useSelector } from "react-redux";
import { getTickets } from "../../features/ticketSlice.js";
import Table from "../others/Table";
import Dashboard from "../../pages/Dashboard";
import PermissionsRender from "../others/PermissionsRender";
import { Permissions } from "../../util/Utils";
import { getProjectInfo } from "../../features/projectSlice";

const ViewProject = () => {
	const { projectID } = useParams();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const navigate = useNavigate();
	const tickets = useSelector(getTickets);
	const projectInfo = useSelector(getProjectInfo(projectID));

	const [projectTickets, setprojectTickets] = useState([]);
	const [viewTicket, setviewTicket] = useState(null);

	const getProjectTickets = async () => {
		await TicketService.getProjectTickets(projectID);
	};

	const onTicketClick = (rowProps, _) => {
		setviewTicket(rowProps.data);
		onOpen();
	};

	const navigateBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		if (!projectInfo) {
			navigate("/404");
		}

		getProjectTickets();
	}, []);

	useEffect(() => {
		setprojectTickets(tickets);
	}, [tickets]);

	return (
		<Flex w="100%" direction="column">
			<Flex w="100%" h="fit-content">
				<Heading as="h1" size="lg">
					<IconButton
						icon={<ArrowBackIcon />}
						variant="link"
						size="lg"
						colorScheme="black"
						onClick={navigateBack}
					/>
					{projectInfo?.title}
				</Heading>

				<Spacer />

				<PermissionsRender permissionCheck={Permissions.canManageTicket}>
					<Button colorScheme="whatsapp" mr={5} onClick={() => onOpen()}>
						Add Ticket
					</Button>
				</PermissionsRender>

				<Button
					colorScheme="purple"
					onClick={() => navigate(`/projects/${projectID}/edit`)}
				>
					Project Info
				</Button>
			</Flex>

			<Tabs variant="soft-rounded" colorScheme="purple" mt={5} h="100%">
				<TabList>
					<Tab>Tickets</Tab>
					<Tab>Overview</Tab>
				</TabList>

				<TabPanels h="100%">
					<TabPanel h="100%">
						<Table
							tableData={projectTickets}
							columns={TICKETS_COLUMNS}
							searchPlaceholder="Search for tickets"
							onRowClick={onTicketClick}
							defaultSortInfo={TICKETS_DEFAULT_SORT}
							height="92%"
						/>
					</TabPanel>
					<TabPanel>
						<Dashboard />
					</TabPanel>
				</TabPanels>
			</Tabs>
			<br />
			<CreateTicket
				isOpen={isOpen}
				onClose={onClose}
				ticket={viewTicket}
				setviewTicket={setviewTicket}
				projectId={projectID}
			/>
		</Flex>
	);
};

export default ViewProject;
