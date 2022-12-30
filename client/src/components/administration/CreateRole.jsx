import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spacer,
	Switch,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React, { useRef, useState, useEffect } from "react";
import MiscellaneousService from "../../services/miscellaneous-service";
import * as Constants from "../../util/Constants";
import { CreateRoleData, CreateRoleSchema } from "../../util/ValidationSchemas";
import AlertModal from "../others/AlertModal";

const CreateRole = ({ data, isOpen, onClose, canModifyPermission = true }) => {
	const formRef = useRef(null);
	const roleData = data || CreateRoleData;
	const [permissions, setPermissions] = useState([]);
	const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

	useEffect(() => {
		if (data) {
			setPermissions(data.permissions);
		}
	}, [data]);

	const displayPermissions = [
		{
			name: "Manage Tickets",
			helperText: "Allows user to create, delete, and modify tickets",
			value: Constants.ADD_TICKET,
		},
		{
			name: "Manage Projects",
			helperText: "Allows users to create, delete, and modify projects",
			value: Constants.ADD_PROJECT,
		},
		{
			name: "Manage Project Members",
			helperText: "Allows user add and remove members in a project",
			value: Constants.ADD_MEMBER_TO_PROJECT,
		},
		{
			name: "Manage Custom Fields",
			helperText: "Allows user create and update custom fields",
			value: Constants.MANAGE_ROLE,
		},
		{
			name: "Manage Users",
			helperText: "Allows user update other user's profile",
			value: Constants.UPDATE_USER_PROFILE,
		},
		{
			name: "Allow Comments",
			helperText: "User can comment on any ticket",
			value: Constants.ADD_COMMENT,
		},
	];
	const onPermissionToggle = ({ target: { checked, value } }) => {
		if (checked) {
			//add permission
			setPermissions([...permissions, value]);
		} else {
			//remove permission
			const updatedPermissions = permissions.filter(
				(permission) => permission !== value,
			);
			setPermissions(updatedPermissions);
		}
	};

	const onRoleDelete = async () => {
		await MiscellaneousService.deleteRole(data._id);
		setPermissions([]);
		setOpenDeleteAlert(false);
		onClose();
	};

	const onFormSubmit = async (value, action) => {
		const updatedData = { ...value, permissions };

		if (data) {
			await MiscellaneousService.updateRole(updatedData);
		} else {
			await MiscellaneousService.createRole(updatedData);
		}

		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="md">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create New Role</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex direction="column" gap={3}>
						<Formik
							initialValues={roleData}
							validationSchema={CreateRoleSchema}
							onSubmit={onFormSubmit}
							innerRef={formRef}
							enableReinitialize
						>
							{({ errors, touched }) => (
								<>
									<FormControl isInvalid={errors.name && touched.name}>
										<FormLabel fontWeight="regular">Role Name</FormLabel>
										<Field as={Input} name="name" type="text" required />
										<FormErrorMessage>{errors.name}</FormErrorMessage>
									</FormControl>
									{displayPermissions.map((permission, index) => (
										<FormControl key={index}>
											<Box display="flex" width="100%">
												<FormLabel>{permission.name}</FormLabel>
												<Spacer />
												<Switch
													colorScheme="purple"
													size="lg"
													value={permission.value}
													onChange={onPermissionToggle}
													disabled={!canModifyPermission}
													defaultChecked={roleData.permissions.includes(
														permission.value,
													)}
												/>
											</Box>
											<FormHelperText fontSize="sm" as="i">
												{permission.helperText}
											</FormHelperText>
										</FormControl>
									))}
								</>
							)}
						</Formik>
					</Flex>
				</ModalBody>

				<ModalFooter>
					<Button
						colorScheme="purple"
						mr={3}
						onClick={() => formRef.current?.handleSubmit()}
					>
						Save Role
					</Button>
					{data && canModifyPermission ? (
						<Button colorScheme="red" onClick={() => setOpenDeleteAlert(true)}>
							Delete Role
						</Button>
					) : (
						<Button
							colorScheme="gray"
							onClick={() => {
								setPermissions([]);
								onClose();
							}}
						>
							Cancel
						</Button>
					)}
				</ModalFooter>
			</ModalContent>

			<AlertModal
				title={"Delete role"}
				body="Are you sure you to delete this role?"
				isOpen={openDeleteAlert}
				onClose={onClose}
				onCTA={onRoleDelete}
			/>
		</Modal>
	);
};

export default CreateRole;
