import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import TicketService from "@/services/ticket-service";
import useFetch, { apiRequest } from "@/hooks/useFetch";
import { usePermissions } from "@/hooks/usePermissions";
import usePost from "@/hooks/usePost";
import { USERS_COLUMNS } from "@/util/TableDataDisplay";
import { Permissions } from "@/util/Utils";
import { CreateTicketData } from "@/util/ValidationSchemas";
import AlertModal from "../others/AlertModal";
import PermissionsRender from "../others/PermissionsRender";
import Table from "../others/Table";
import CommentSection from "./CommentSection";
import TicketInfo from "./TicketInfo";

const CreateTicket = ({ isOpen, onClose, ticket, projectId }) => {
  const isNewTicket = ticket ? false : true;

  const [projectAssignees, setProjectAssignees] = useState([]);

  const [ticketAssignees, setTicketAssignees] = useState([]);
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketInfo, setTicketInfo] = useState(CreateTicketData);

  const [error, setError] = useState("");

  const canManageTickets = usePermissions(Permissions.canManageTickets);
  const createTicket = usePost(TicketService.createTicket(projectId));
  const updateTicket = usePost(TicketService.updateTicket(projectId));

  const alertModalDisclosure = useDisclosure();
  const formRef = useRef();
  const toast = useToast();

  useEffect(() => {
    if (ticket) {
      const ticketCopy = { ...ticket };

      ticketCopy.assignees = ticket.assignees.map((assignee) => assignee._id);
      ticketCopy.projectId = projectId;
      ticketCopy.type = ticket.type._id;

      setTicketInfo(ticketCopy);
      setTicketDescription(ticketCopy.description);
      setTicketAssignees(ticketCopy.assignees);
      setProjectAssignees(ticket.assignees);
    }
  }, [ticket]);

  const onTicketAssigneeClick = ({ selected }) => {
    //"selected" is an object with key-value pair (eg. {<assigneeId>: true})
    setTicketAssignees(Object.keys(selected));
  };

  const getSelectedTicketAssignees = () => {
    const selectedAssignees = {};

    if (!isNewTicket) {
      ticket.assignees.forEach((assignee) => {
        selectedAssignees[assignee._id] = true;
      });
    }

    return selectedAssignees;
  };

  const onHandleFormSubmit = (values) => {
    const ticketFormData = { ...values };
    ticketFormData.assignees = ticketAssignees;
    ticketFormData.description = ticketDescription;

    if (isNewTicket) {
      createTicket.post(ticketFormData);
      setError(createTicket.error);
    } else {
      updateTicket.post(ticketFormData);
      setError(updateTicket.error);
    }

    closeTicketModal();
  };

  const resetFields = () => {
    setTicketAssignees([]);
    setProjectAssignees([]);
    setTicketInfo(CreateTicketData);
    setError("");
    setTicketDescription("");
  };

  const onTicketDelete = async () => {
    alertModalDisclosure.onClose();

    try {
      await TicketService.deleteTicket(ticket._id);
      closeTicketModal();
    } catch (error) {
      setError(error);
    }
  };

  const closeTicketModal = () => {
    resetFields();
    onClose();
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={closeTicketModal}
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading as="h3" size="md">
            {!isNewTicket ? "Edit" : "Create"} Ticket
          </Heading>
          <Text fontSize="sm" as="i" fontWeight={400} mt={2}>
            Project: {ticket?.projectId.title || ""}
          </Text>
        </ModalHeader>

        <ModalCloseButton onClick={closeTicketModal} />

        <ModalBody overflowY="auto" mt={-3}>
          <Tabs variant="enclosed" size="sm" colorScheme="blue">
            <TabList>
              <Tab>Ticket Info</Tab>
              {!isNewTicket && <Tab>Comments</Tab>}
              <Tab>Assignees</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <TicketInfo
                  ticketInfo={ticketInfo}
                  onHandleFormSubmit={onHandleFormSubmit}
                  formRef={formRef}
                  error={error}
                  ticketDescription={ticketDescription}
                  setTicketDescription={setTicketDescription}
                />
              </TabPanel>

              {!isNewTicket && (
                <TabPanel>
                  <CommentSection ticketId={ticket ? ticket._id : null} />
                </TabPanel>
              )}

              <TabPanel>
                <Table
                  tableData={projectAssignees}
                  columns={USERS_COLUMNS}
                  searchPlaceholder={"Search for users"}
                  height={300}
                  hasCheckboxColumn={true}
                  sortable={false}
                  selectedRow={getSelectedTicketAssignees()}
                  onSelectionChange={onTicketAssigneeClick}
                  disableCheckBox={!canManageTickets}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <PermissionsRender permissionCheck={Permissions.canManageTickets}>
          <ModalFooter>
            <Button
              colorScheme="blue"
              type="submit"
              mr={3}
              onClick={() => formRef.current?.handleSubmit()}
            >
              {!isNewTicket ? "Save" : "Create"}
            </Button>
            {!isNewTicket ? (
              <Button
                colorScheme="red"
                onClick={() => alertModalDisclosure.onOpen()}
              >
                Delete
              </Button>
            ) : (
              <Button onClick={closeTicketModal}>Cancel</Button>
            )}
          </ModalFooter>
        </PermissionsRender>
      </ModalContent>

      <AlertModal
        title="Delete ticket"
        body="Are you sure you to delete this ticket?"
        isOpen={alertModalDisclosure.isOpen}
        onClose={alertModalDisclosure.onClose}
        onCTA={onTicketDelete}
      />
    </Modal>
  );
};

export default React.memo(CreateTicket);
