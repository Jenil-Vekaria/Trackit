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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import TicketService from "@/services/ticket-service";
import { usePermissions } from "@/hooks/usePermissions";
import { PROJECT_ASSIGNEES_COLUMNS } from "@/util/TableDataDisplay";
import { Permissions } from "@/util/Utils";
import { CreateTicketData } from "@/util/ValidationSchemas";
import AlertModal from "../others/AlertModal";
import PermissionsRender from "../others/PermissionsRender";
import Table from "../others/Table";
import CommentSection from "./CommentSection";
import TicketInfo from "./TicketInfo";

const CreateTicket = ({
  isOpen,
  onClose,
  ticket,
  mutateServer,
  projectInfo,
}) => {
  const isNewTicket = ticket ? false : true;

  const [projectAssignees, setProjectAssignees] = useState([]);

  const [ticketAssignees, setTicketAssignees] = useState([]);
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketInfo, setTicketInfo] = useState(CreateTicketData);
  const [error, setError] = useState("");

  const canManageTickets = usePermissions(Permissions.canManageTickets);

  const alertModalDisclosure = useDisclosure();
  const formRef = useRef();

  useEffect(() => {
    resetFields();
    setProjectAssignees(projectInfo.assignees);

    if (ticket) {
      const ticketCopy = { ...ticket };

      ticketCopy.assignees = ticket.assignees.map((assignee) => assignee._id);
      ticketCopy.projectId = projectInfo._id;
      ticketCopy.type = ticket.type._id;

      setTicketInfo(ticketCopy);
      setTicketDescription(ticketCopy.description);
      setTicketAssignees(ticketCopy.assignees);
    }
  }, [ticket]);

  const onTicketAssigneeClick = ({ selected }) => {
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

  const onHandleFormSubmit = async (values) => {
    try {
      const ticketFormData = { ...values };
      ticketFormData.assignees = ticketAssignees;
      ticketFormData.description = ticketDescription;

      let apiRequestInfo = {};

      if (isNewTicket) {
        apiRequestInfo = TicketService.createTicket(
          projectInfo._id,
          ticketFormData
        );
      } else {
        apiRequestInfo = TicketService.updateTicket(
          projectInfo._id,
          ticketFormData
        );
      }

      await mutateServer(apiRequestInfo);
    } catch (error) {
      setError(error);
      return;
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
      const apiRequestInfo = TicketService.deleteTicket(ticket._id);

      await mutateServer(apiRequestInfo);

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
                  columns={PROJECT_ASSIGNEES_COLUMNS}
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
