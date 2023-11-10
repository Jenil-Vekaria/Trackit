import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Flex, Heading, Spacer, useDisclosure } from "@chakra-ui/react";
import PermissionsRender from "@/components/others/PermissionsRender";
import Table from "@/components/others/Table";
import AddProject from "@/components/projects/AddProject";
import ProjectService from "@/services/project-service";
import useApi from "@/hooks/useApi";
import { PROJECTS_COLUMNS } from "../../util/TableDataDisplay";
import { Permissions } from "../../util/Utils";

const ViewAllProjects = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const projectsSWR = useApi(ProjectService.getMyProjects());

  const handleRowClick = (rowData) => {
    const projectId = rowData.data._id;
    router.push(`/projects/${projectId}`);
  };

  return (
    <Flex w="100%" maxHeight="100vh" direction="column" padding={10}>
      <Head>
        <title>Projects</title>
      </Head>
      <Flex w="100%" h="fit-content">
        <Heading as="h1" size="lg" fontWeight={600}>
          Projects
        </Heading>
        <Spacer />
        <PermissionsRender permissionCheck={Permissions.canManageProjects}>
          <Button
            colorScheme="blue"
            variant="solid"
            fontWeight={500}
            onClick={onOpen}
          >
            Add Project
          </Button>
        </PermissionsRender>
      </Flex>

      <br />

      <Table
        tableData={projectsSWR.data}
        columns={PROJECTS_COLUMNS}
        searchPlaceholder="Search for projects"
        onRowClick={handleRowClick}
        isLoading={projectsSWR.isLoading}
      />

      <AddProject
        isOpen={isOpen}
        onClose={onClose}
        mutateServer={projectsSWR.mutateServer}
      />
    </Flex>
  );
};

export default ViewAllProjects;
