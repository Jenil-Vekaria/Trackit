import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { getProjectInfo } from "@/features/projectSlice";
import { getTickets } from "@/features/ticketSlice";
import PageNotFound from "@/pages/404";
import TicketService from "@/services/ticket-service";
import { TICKETS_COLUMNS, TICKETS_DEFAULT_SORT } from "@/util/TableDataDisplay";
import { Permissions } from "@/util/Utils";
import { ArrowBackIcon } from "@chakra-ui/icons";
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
import { useSelector } from "react-redux";

import PermissionsRender from "@/components/others/PermissionsRender";
import Table from "@/components/others/Table";
import Dashboard from "@/components/projects/Dashboard";
import CreateTicket from "@/components/tickets/CreateTicket";

const ViewProject = ({ projectId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const tickets = useSelector(getTickets);
  const projectInfo = useSelector(getProjectInfo(projectId));

  const [projectTickets, setprojectTickets] = useState([]);
  const [viewTicket, setviewTicket] = useState(null);

  const [is404, setIs404] = useState(false);

  const getProjectTickets = async () => {
    try {
      await TicketService.getProjectTickets(projectId);
    } catch (error) {
      setIs404(true);
    }
  };

  const onTicketClick = (rowProps, _) => {
    setviewTicket(rowProps.data);
    onOpen();
  };

  const navigateBack = () => {
    router.replace("/projects");
  };

  useEffect(() => {
    if (projectId) {
      getProjectTickets();
    }
  }, []);

  useEffect(() => {
    setprojectTickets(tickets);
  }, [tickets]);

  if (is404) {
    return <PageNotFound />;
  }

  return (
    <Flex w="100%" direction="column" px={8} py={6}>
      <Head>
        <title>{projectInfo?.title || "Projects"}</title>
      </Head>
      <Flex w="100%" h="fit-content">
        <Heading as="h1" size="md" fontWeight={600}>
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

        <PermissionsRender permissionCheck={Permissions.canManageTickets}>
          <Button colorScheme="blue" size="md" mr={5} onClick={() => onOpen()}>
            Add Ticket
          </Button>
        </PermissionsRender>

        <Link href={`/projects/${projectId}/edit`} passHref>
          <Button colorScheme="teal">Project Info</Button>
        </Link>
      </Flex>

      <Tabs variant="enclosed" size="sm" colorScheme="blue" mt={2} h="100%">
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
            {projectId ? <Dashboard projectId={projectId} /> : null}
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
        projectTitle={projectInfo?.title}
      />
    </Flex>
  );
};

export default ViewProject;
