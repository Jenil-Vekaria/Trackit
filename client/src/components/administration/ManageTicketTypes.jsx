import { Button, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getTicketType } from "../../features/miscellaneousSlice";
import { MANAGE_TICKET_TYPES_COLUMNS } from "../../util/TableDataDisplay";
import Table from "../others/Table";
import CreateTicketType from "./CreateTicketType";

const ManageTicketTypes = () => {
  const ticketTypes = useSelector(getTicketType);
  const [viewTicketType, setViewTicketType] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onTicketTypeClick = (rowProps, action) => {
    setViewTicketType(rowProps.data);
    onOpen();
  };

  const closeModal = () => {
    setViewTicketType(null);
    onClose();
  };

  return (
    <>
      <Table
        tableData={ticketTypes}
        columns={MANAGE_TICKET_TYPES_COLUMNS}
        onRowClick={onTicketTypeClick}
        height={420}
        searchPlaceholder="Search for ticket type"
      />
      <br />
      <Spacer />
      <Flex justify="flex-end">
        <Button colorScheme="blue" pos="right" onClick={() => onOpen()}>
          Add Ticket Type
        </Button>
      </Flex>

      <CreateTicketType
        data={viewTicketType}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default ManageTicketTypes;
