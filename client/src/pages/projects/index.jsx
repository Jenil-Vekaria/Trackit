import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, Flex, Heading, Spacer, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import PermissionsRender from "@/components/others/PermissionsRender";
import Table from "@/components/others/Table";

import { getProjects } from "../../features/projectSlice";
import ProjectService from "../../services/project-service";
import { PROJECTS_COLUMNS } from "../../util/TableDataDisplay";
import { Permissions } from "../../util/Utils";

const ViewAllProjects = () => {
  const projects = useSelector(getProjects);
  const disclosure = useDisclosure();
  const router = useRouter();

  const getMyProjects = async () => {
    await ProjectService.getMyProjects();
  };

  useEffect(() => {
    getMyProjects();
  }, []);

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
            <Button
              colorScheme="blue"
              variant="solid"
              fontWeight={500}
              onClick={disclosure.onOpen}
            >
              Add Project
            </Button>
          </Link>
        </PermissionsRender>
      </Flex>

      <br />

      <Table
        tableData={projects}
        columns={PROJECTS_COLUMNS}
        searchPlaceholder="Search for projects"
        onRowClick={handleRowClick}
      />
    </Flex>
  );
};

export default ViewAllProjects;
