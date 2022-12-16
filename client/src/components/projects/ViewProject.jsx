import {
	Button,
	Flex,
	Heading,
	IconButton,
	Spacer,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectService from "../../services/project-service";
import { ArrowBackIcon } from "@chakra-ui/icons";
import AuthService from "../../services/auth-service";
import TicketService from "../../services/ticket-service";
import DataTable from "../others/DataTable";
import { TICKET_COLUMNS } from "../../util/TableDataDisplay";
import CreateTicket from "../tickets/CreateTicket";

const ViewProject = () => {
	const [projectInfo, setProjectInfo] = useState({});
	const [projectTickets, setProjectTickets] = useState([]);
	const [isProjectAuthor, setisProjectAuthor] = useState(false);
	const [viewTicket, setviewTicket] = useState(null);

	const { projectID } = useParams();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();

	const getProjectInfo = async () => {
		const project = await ProjectService.getProjectInfo(projectID);

		if (project) {
			setProjectInfo(project);

			const { id } = AuthService.getCurrentUser();
			setisProjectAuthor(project?.authorId === id);
		} else {
			navigate("/404");
		}
	};

	const getProjectTickets = async () => {
		const tickets = await TicketService.getProjectTickets(projectID);
		console.table(tickets);
		setProjectTickets(tickets);
	};

	const onTicketClick = (ticket) => {
		setviewTicket(ticket);
		onOpen();
	};

	useEffect(() => {
		getProjectInfo();
		getProjectTickets();
	}, []);

	return (
		<Flex w="100%" direction="column">
			<Flex w="100%" h="fit-content">
				<Heading as="h1" size="lg">
					<IconButton
						icon={<ArrowBackIcon />}
						variant="link"
						size="lg"
						colorScheme="black"
						onClick={() => navigate(-1)}
					/>
					{projectInfo?.title}
				</Heading>

				<Spacer />

				<Button colorScheme="whatsapp" mr={5} onClick={() => onOpen()}>
					Add Ticket
				</Button>

				{isProjectAuthor ? (
					<Button
						colorScheme="purple"
						onClick={() => navigate(`/projects/${projectID}/edit`)}
					>
						Edit Project
					</Button>
				) : null}
			</Flex>

			<Tabs variant="soft-rounded" colorScheme="purple" mt={5} h="100%">
				<TabList>
					<Tab>Tickets</Tab>
				</TabList>

				<TabPanels h="100%">
					<TabPanel>
						<DataTable
							columns={TICKET_COLUMNS}
							data={projectTickets}
							searchPlaceholder="Search for tickets"
							handleRowClick={onTicketClick}
						/>
					</TabPanel>
				</TabPanels>
			</Tabs>

			<CreateTicket
				isOpen={isOpen}
				onClose={onClose}
				ticket={viewTicket}
				setviewTicket={setviewTicket}
			/>
		</Flex>
	);
};

export default ViewProject;
