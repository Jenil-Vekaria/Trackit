import { Button, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getRoles } from "../../features/miscellaneousSlice";
import { MANAGE_ROLES } from "../../util/TableDataDisplay";
import Table from "../others/Table";
import CreateRole from "./CreateRole";

const ManageRoles = () => {
	const roles = useSelector(getRoles);
	const [roleData, setRoleData] = useState(null);
	const { isOpen, onClose, onOpen } = useDisclosure();

	const onRoleClick = (rowProps, event) => {
		setRoleData(rowProps.data);
		onOpen();
	};

	const closeModal = () => {
		setRoleData(null);
		onClose();
	};

	return (
		<>
			<Table
				tableData={roles}
				columns={MANAGE_ROLES}
				rowHeight={null}
				onRowClick={onRoleClick}
				height={420}
				searchPlaceholder="Search for role name"
			/>
			<br />
			<Spacer />
			<Flex justify="flex-end">
				<Button colorScheme="purple" pos="right" onClick={() => onOpen()}>
					Add New Role
				</Button>
			</Flex>

			<CreateRole isOpen={isOpen} onClose={closeModal} data={roleData} />
		</>
	);
};

export default ManageRoles;
