import { Button, Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { getTicketType } from "../../features/miscellaneousSlice";
import { MANAGE_TICKET_TYPES } from "../../util/TableDataDisplay";
import Table from "../others/Table";

const ManageTicketTypes = () => {
	const ticketTypes = useSelector(getTicketType);

	const onTicketTypeClick = (rowProps, action) => {
		console.log(rowProps.data);
	};
	return (
		<>
			<Table
				tableData={ticketTypes}
				columns={MANAGE_TICKET_TYPES}
				onRowClick={onTicketTypeClick}
				height={420}
				searchPlaceholder="Search for ticket type"
			/>
			<br />
			<Spacer />
			<Flex justify="flex-end">
				<Button colorScheme="purple" pos="right">
					Add New Ticket Type
				</Button>
			</Flex>
		</>
	);
};

export default ManageTicketTypes;
