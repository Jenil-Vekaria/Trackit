import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import PermissionsRender from "@/components/others/PermissionsRender";
import Table from "@/components/others/Table";
import ProjectService from "@/services/project-service";
import useApi from "@/hooks/useApi";
import { PROJECTS_COLUMNS } from "../../util/TableDataDisplay";
import { Permissions } from "../../util/Utils";

const ViewAllProjects = () => {
  const router = useRouter();

  const projectsSWR = useApi(ProjectService.getMyProjects);

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
          <Link href="/projects/add" passHref>
            <Button colorScheme="blue" variant="solid" fontWeight={500}>
              Add Project
            </Button>
          </Link>
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
    </Flex>
  );
};

export default ViewAllProjects;
