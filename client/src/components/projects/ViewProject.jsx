import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import PageNotFound from "@/pages/404";
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
import React, { useState } from "react";
import PermissionsRender from "@/components/others/PermissionsRender";
import Table from "@/components/others/Table";
import Dashboard from "@/components/projects/Dashboard";
import ProjectService from "@/services/project-service";
import TicketService from "@/services/ticket-service";
import useApi from "@/hooks/useApi";
import { TICKETS_COLUMNS, TICKETS_DEFAULT_SORT } from "@/util/TableDataDisplay";
import { Permissions, apifetch } from "@/util/Utils";
import Loading from "../others/Loading";
import CreateTicket from "../tickets/CreateTicket";
import AddProject from "./AddProject";

const ViewProject = ({ projectId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const projectInfoDiscloure = useDisclosure();

  const router = useRouter();

  const projectTicketsSWR = useApi(TicketService.getProjectTickets, projectId);
  const projectInfoSWR = useApi(ProjectService.getProjectInfo, projectId);

  const [viewTicket, setViewTicket] = useState(null);

  const onModalClose = () => {
    setViewTicket(null);
    onClose();
  };

  const onTicketClick = (rowProps, _) => {
    setViewTicket(rowProps.data);
    onOpen();
  };

  const navigateBack = () => {
    router.replace("/projects");
  };

  if (projectInfoSWR.error?.response.status) {
    return <PageNotFound />;
  }

  if (projectInfoSWR.isLoading || projectTicketsSWR.isLoading) {
    return <Loading />;
  }

  return (
    <Flex w="100%" direction="column" px={8} py={6}>
      <Head>
        <title>{projectInfoSWR.data?.title || "Projects"}</title>
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
          {projectInfoSWR.data?.title}
        </Heading>

        <Spacer />

        <PermissionsRender permissionCheck={Permissions.canManageTickets}>
          <Button colorScheme="blue" size="md" mr={5} onClick={() => onOpen()}>
            Add Ticket
          </Button>
        </PermissionsRender>

        <Button
          colorScheme="teal"
          onClick={() => projectInfoDiscloure.onOpen()}
        >
          Project Info
        </Button>
      </Flex>

      <Tabs variant="enclosed" size="sm" colorScheme="blue" mt={2} h="100%">
        <TabList>
          <Tab>Tickets</Tab>
          <Tab>Overview</Tab>
        </TabList>

        <TabPanels h="100%">
          <TabPanel h="100%">
            <Table
              tableData={projectTicketsSWR.data}
              columns={TICKETS_COLUMNS}
              searchPlaceholder="Search tickets by type, title, status ..."
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

      {projectInfoSWR.data ? (
        <CreateTicket
          isOpen={isOpen}
          onClose={onModalClose}
          ticket={viewTicket}
          projectInfo={projectInfoSWR.data}
          mutateServer={projectTicketsSWR.mutateServer}
        />
      ) : null}

      <AddProject
        isOpen={projectInfoDiscloure.isOpen}
        onClose={projectInfoDiscloure.onClose}
        projectInfo={projectInfoSWR.data}
        mutateServer={projectInfoSWR.mutateServer}
      />
    </Flex>
  );
};

export default ViewProject;
