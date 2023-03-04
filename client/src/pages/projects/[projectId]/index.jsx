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
	useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
	TICKETS_DEFAULT_SORT,
	TICKETS_COLUMNS,
} from "../../../util/TableDataDisplay";
import { useSelector } from "react-redux";
import { getTickets } from "../../../features/ticketSlice.js";
import { Permissions } from "../../../util/Utils";
import { getProjectInfo } from "../../../features/projectSlice";
import { useRouter } from "next/router";
import CreateTicket from "@/components/tickets/CreateTicket";
import Table from "@/components/others/Table";
import PermissionsRender from "@/components/others/PermissionsRender";
import TicketService from "@/services/ticket-service";
import Link from "next/link";
import Dashboard from "@/components/projects/dashboard";
import Head from "next/head";

const ViewProject = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const router = useRouter();
	const projectId = router.query.projectId;
	const tickets = useSelector(getTickets);
	const projectInfo = useSelector(getProjectInfo(projectId));

	const [projectTickets, setprojectTickets] = useState([]);
	const [viewTicket, setviewTicket] = useState(null);

	const getProjectTickets = async () => {
		await TicketService.getProjectTickets(projectId);
	};

	const onTicketClick = (rowProps, _) => {
		setviewTicket(rowProps.data);
		onOpen();
	};

	const navigateBack = () => {
		router.back();
	};

	useEffect(() => {
		// if (!projectInfo) {
		// 	router.push("/404");
		// }

		getProjectTickets();
	}, []);

	useEffect(() => {
		setprojectTickets(tickets);
	}, [tickets]);

	return (
		<Flex w="100%" direction="column" padding={10}>
			<Head>
				<title>{projectInfo?.title || "Projects"}</title>
			</Head>
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

				<Link href={`/projects/${projectId}/edit`} passHref>
					<Button colorScheme="purple">Project Info</Button>
				</Link>
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
				projectId={projectId}
			/>
		</Flex>
	);
};

export default ViewProject;
