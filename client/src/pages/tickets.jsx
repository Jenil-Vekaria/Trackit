import Head from "next/head";
import { Flex, Heading, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "@/hooks/useFetch";
import Table from "../components/others/Table";
import CreateTicket from "../components/tickets/CreateTicket";
import { getTickets } from "../features/ticketSlice";
import TicketService from "../services/ticket-service";
import { TICKETS_COLUMNS } from "../util/TableDataDisplay";

const Tickets = () => {
  const { data, loading, refetch } = useFetch(TicketService.getUserTickets());

  const [viewTicket, setViewTicket] = useState(null);
  const [viewTicketProjectId, setViewTicketProjectId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onTicketClick = (rowProps, _) => {
    setViewTicket(rowProps.data);
    setViewTicketProjectId(rowProps.data.projectId._id);
    onOpen();
  };

  const onModalClose = () => {
    onClose();
    refetch();
  };

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
        tableData={data}
        columns={TICKETS_COLUMNS}
        searchPlaceholder="Search for tickets"
        height={450}
        onRowClick={onTicketClick}
        isLoading={loading}
      />

      <CreateTicket
        isOpen={isOpen}
        onClose={onModalClose}
        ticket={viewTicket}
        setviewTicket={setViewTicket}
        projectId={viewTicketProjectId}
      />
    </Flex>
  );
};

export default Tickets;
