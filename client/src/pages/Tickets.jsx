import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { useSelector } from "react-redux";
import { getProjects } from "../features/projectSlice";
import Table from "../components/others/Table";
import { PROJECTS_COLUMNS } from "../util/TableDataDisplay";

const Tickets = () => {
	const projects = useSelector(getProjects);
	console.log(projects);
	return (
		<Flex w="100%" direction="column" padding={10}>
			<Table
				tableData={projects}
				columns={PROJECTS_COLUMNS}
				searchPlaceholder="Search for projects"
			/>
		</Flex>
	);
};

export default Tickets;
