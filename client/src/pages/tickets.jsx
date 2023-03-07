import { Flex, Heading, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import "@inovua/reactdatagrid-community/index.css";
import Table from "../components/others/Table";
import { TICKETS_COLUMNS } from "../util/TableDataDisplay";
import TicketService from "../services/ticket-service";
import CreateTicket from "../components/tickets/CreateTicket";
import { useSelector } from "react-redux";
import { getTickets } from "../features/ticketSlice";
import Head from "next/head";

const Tickets = () => {
	const tickets = useSelector(getTickets);
	const [myTickets, setmyTickets] = useState([]);
	const [viewTicket, setViewTicket] = useState(null);
	const [viewTicketProjectId, setViewTicketProjectId] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const getUserTickets = async () => {
		await TicketService.getUserTickets();
		setmyTickets(tickets);
		setTimeout(() => setmyTickets(tickets), 30);
	};

	const onTicketClick = (rowProps, event) => {
		setViewTicket(rowProps.data);
		setViewTicketProjectId(rowProps.data.projectId._id);
		onOpen();
	};
	useEffect(() => {
		getUserTickets();
	}, []);

	useEffect(() => {
		setmyTickets(tickets);
	}, [tickets]);

	return (
		<Flex w="100%" direction="column" padding={10}>
			<Head>
				<title>Tickets</title>
			</Head>
			<Flex w="100%" h="fit-content">
				<Heading as="h1" size="lg" fontWeight={600}>
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
