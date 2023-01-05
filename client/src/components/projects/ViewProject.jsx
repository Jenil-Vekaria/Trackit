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
import ProjectService from "../../services/project-service";
import { ArrowBackIcon } from "@chakra-ui/icons";
import TicketService from "../../services/ticket-service";
import {
	TICKETS_DEFAULT_SORT,
	TICKETS_COLUMNS,
} from "../../util/TableDataDisplay";
import CreateTicket from "../tickets/CreateTicket";
import { useDispatch, useSelector } from "react-redux";
import { clearTickets, getTickets } from "../../features/ticketSlice.js";
import Table from "../others/Table";
import Dashboard from "../../pages/Dashboard";
import PermissionsRender from "../others/PermissionsRender";
import { Permissions } from "../../util/Utils";

const ViewProject = () => {
	const [projectInfo, setProjectInfo] = useState({});
	const projectTickets = useSelector(getTickets);
	const [viewTicket, setviewTicket] = useState(null);
	const [isLoading, setisLoading] = useState(true);

	const { projectID } = useParams();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const getProjectInfo = async () => {
		const project = await ProjectService.getProjectInfo(projectID);

		if (project) {
			setProjectInfo(project);
		} else {
			navigate("/404");
		}
	};

	const getProjectTickets = async () => {
		await TicketService.getProjectTickets(projectID);

		setTimeout(() => {
			setisLoading(false);
		}, 100);
	};

	const onTicketClick = (rowProps, event) => {
		setviewTicket(rowProps.data);
		onOpen();
	};

	const navigateBack = () => {
		dispatch(clearTickets());
		navigate(-1);
	};

	useEffect(() => {
		getProjectInfo();
		getProjectTickets();
	}, []);

	if (isLoading) {
		return (
			<Center w="100%">
				<Spinner color="purple" size="xl" />
			</Center>
		);
	}

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
					<TabPanel>
						<Table
							tableData={projectTickets}
							columns={TICKETS_COLUMNS}
							searchPlaceholder="Search for tickets"
							onRowClick={onTicketClick}
							defaultSortInfo={TICKETS_DEFAULT_SORT}
							height={480}
						/>
					</TabPanel>
					<TabPanel>
						<Dashboard />
					</TabPanel>
				</TabPanels>
			</Tabs>

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
