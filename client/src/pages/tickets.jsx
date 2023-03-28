import Head from "next/head";
import { Flex, Heading, useDisclosure } from "@chakra-ui/react";
import "@inovua/reactdatagrid-community/index.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../components/others/Table";
import CreateTicket from "../components/tickets/CreateTicket";
import { getTickets } from "../features/ticketSlice";
import TicketService from "../services/ticket-service";
import { TICKETS_COLUMNS } from "../util/TableDataDisplay";

const Tickets = () => {
  const tickets = useSelector(getTickets);
  const [myTickets, setmyTickets] = useState([]);
  const [viewTicket, setViewTicket] = useState(null);
  const [viewTicketProjectId, setViewTicketProjectId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getUserTickets = async () => {
    await TicketService.getUserTickets();
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
