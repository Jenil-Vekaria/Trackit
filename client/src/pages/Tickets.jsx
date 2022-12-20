import { Flex, Heading, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import "@inovua/reactdatagrid-community/index.css";
import Table from "../components/others/Table";
import { TICKETS_COLUMNS } from "../util/TableDataDisplay";
import TicketService from "../services/ticket-service";
import CreateTicket from "../components/tickets/CreateTicket";
import { useSelector } from "react-redux";
import { getMyTickets } from "../features/ticketSlice";

const Tickets = () => {
	const myTickets = useSelector(getMyTickets);
	const [viewTicket, setViewTicket] = useState(null);
	const [viewTicketProjectId, setViewTicketProjectId] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const getUserTickets = async () => {
		await TicketService.getUserTickets();

		setTimeout(() => {}, 50);
	};

	const onTicketClick = (rowProps, event) => {
		setViewTicket(rowProps.data);
		setViewTicketProjectId(rowProps.data.projectId);
		onOpen();
	};
	useEffect(() => {
		getUserTickets();
	}, []);

	return (
		<Flex w="100%" direction="column" padding={10}>
			<Flex w="100%" h="fit-content">
				<Heading as="h1" size="lg">
					My Tickets
				</Heading>
			</Flex>

			<br />

			<Table
				tableData={myTickets}
				columns={TICKETS_COLUMNS}
				searchPlaceholder="Search for tickets"
				height={450}
				onRowClick={onTicketClick}
			/>

			<CreateTicket
				isOpen={isOpen}
				onClose={onClose}
				ticket={viewTicket}
				setviewTicket={setViewTicket}
				projectId={viewTicketProjectId}
			/>
		</Flex>
	);
};

export default Tickets;
