import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "../../features/miscellaneousSlice";
import { MANAGE_USERS_COLUMNS } from "../../util/TableDataDisplay";
import Table from "../others/Table";
import UpdateUser from "./UpdateUser";

const ManageUsers = () => {
	const allUsers = useSelector(getUsers(false));
	const [viewUser, setViewUser] = useState({});
	const { isOpen, onOpen, onClose } = useDisclosure();

	const onUserClick = (rowProps, event) => {
		setViewUser(rowProps.data);
		onOpen();
	};

	const closeModal = () => {
		setViewUser(null);
		onClose();
	};

	return (
		<>
			<Table
				tableData={allUsers}
				columns={MANAGE_USERS_COLUMNS}
				searchPlaceholder="Search for users"
				onRowClick={onUserClick}
				height={340}
			/>
			<UpdateUser isOpen={isOpen} closeModal={closeModal} viewUser={viewUser} />
		</>
	);
};

export default ManageUsers;
