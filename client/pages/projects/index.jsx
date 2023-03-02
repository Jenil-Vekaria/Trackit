import { Flex, Heading, Button, Spacer, useDisclosure } from "@chakra-ui/react";
import { getProjects } from "../../features/projectSlice";
import { useSelector } from "react-redux";
import { PROJECTS_COLUMNS } from "../../util/TableDataDisplay";
import { useEffect } from "react";
import ProjectService from "../../services/project-service";
import { Permissions } from "../../util/Utils";
import Table from "@/components/others/Table";
import PermissionsRender from "@/components/others/PermissionsRender";
import { useRouter } from "next/router";

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
			<Flex w="100%" h="fit-content">
				<Heading as="h1" size="lg">
					Projects
				</Heading>
				<Spacer />
				<PermissionsRender permissionCheck={Permissions.canManageProject}>
					<Button
						colorScheme="purple"
						variant="solid"
						onClick={disclosure.onOpen}
					>
						Add Project
					</Button>
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
