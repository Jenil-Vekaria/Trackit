import React, { useRef, useState, useEffect } from "react";
import * as BsIcon from "react-icons/bs";
import {
	Alert,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Icon,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import {
	CreateTicketTypeData,
	CreateTicketTypeSchema,
} from "../../util/ValidationSchemas";
import { Field, Formik } from "formik";
import Table from "../others/Table";
import { BS_ICONS } from "../../util/Constants";
import { ICONS_COLUMNS } from "../../util/TableDataDisplay";
import MiscellaneousService from "../../services/miscellaneous-service";
import AlertModal from "../others/AlertModal";

const CreateTicketType = ({
	data,
	isOpen,
	onClose,
	canDeleteTicketType = true,
}) => {
	const [ticketType, setTicketType] = useState(CreateTicketTypeData);
	const [iconColour, setIconColour] = useState("#000000");
	const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
	const [iconName, setIconName] = useState("");
	const [error, setError] = useState("");
	const formRef = useRef(null);

	useEffect(() => {
		if (data) {
			setIconColour(data.colour);
			setIconName(data.iconName);
			setTicketType(data);
		}
	}, [data]);

	const onColourChange = ({ target: { value } }) => {
		setIconColour(value);
	};

	const onIconClick = (rowProps, action) => {
		setIconName(rowProps.data.name);
		setTicketType({
			...formRef.current?.values,
			iconName: rowProps.data.name,
		});
	};

	const closeModal = () => {
		setError("");
		setIconColour("#000000");
		setIconName("");
		setTicketType(CreateTicketTypeData);
		setOpenDeleteAlert(false);
		onClose();
	};

	const deleteTicketType = async () => {
		try {
			await MiscellaneousService.deleteTicketType(ticketType.name);
		} catch (error) {
			setError(error);
		}
	};

	const onFormSubmit = async (value, action) => {
		const ticketTypeData = { ...value, colour: iconColour };

		try {
			if (data) {
				await MiscellaneousService.updateTicketType(ticketTypeData);
			} else {
				await MiscellaneousService.createTicketType(ticketTypeData);
			}
			closeModal();
		} catch (error) {
			setError(error);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={closeModal} size="lg">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{data ? "Update" : "Create"} Ticket Type</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Flex direction="column" gap={3}>
						<Flex gap={2}>
							<Text as="b">Preview:</Text>
							{iconName ? (
								<Icon
									as={BsIcon[iconName]}
									bg={iconColour}
									color="gray.50"
									w={6}
									h={6}
									p={1}
									borderRadius={5}
								/>
							) : null}
						</Flex>

						<Formik
							initialValues={ticketType}
							validationSchema={CreateTicketTypeSchema}
							onSubmit={onFormSubmit}
							innerRef={formRef}
							enableReinitialize
						>
							{({ errors, touched }) => (
								<>
									{error && (
										<Alert
											status="error"
											variant="left-accent"
											mb={2}
											fontSize="sm"
										>
											{error}
										</Alert>
									)}
									<Flex gap={3}>
										<FormControl isInvalid={errors.name && touched.name}>
											<FormLabel fontWeight="regular">
												Ticket Type Name
											</FormLabel>
											<Field as={Input} name="name" type="text" required />
											<FormErrorMessage>{errors.name}</FormErrorMessage>
										</FormControl>

										<FormControl isInvalid={errors.colour && touched.colour}>
											<FormLabel fontWeight="regular">
												Colour (select icon colour)
											</FormLabel>
											<Field
												as={Input}
												name="colour"
												type="color"
												value={iconColour}
												onChange={onColourChange}
											/>
											<FormErrorMessage>{errors.colour}</FormErrorMessage>
										</FormControl>
									</Flex>

									<FormControl isInvalid={errors.iconName && touched.iconName}>
										<FormLabel fontWeight="regular">Select an Icon</FormLabel>
										<FormErrorMessage>{errors.iconName}</FormErrorMessage>

										<Table
											tableData={BS_ICONS}
											columns={ICONS_COLUMNS}
											searchPlaceholder="Search for icon"
											searchbarVariant="outline"
											onRowClick={onIconClick}
											height={210}
										/>
									</FormControl>
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
						Save Ticket type
					</Button>
					{data && canDeleteTicketType ? (
						<Button colorScheme="red" onClick={() => setOpenDeleteAlert(true)}>
							Delete Role
						</Button>
					) : (
						<Button colorScheme="gray" onClick={closeModal}>
							Cancel
						</Button>
					)}
				</ModalFooter>
			</ModalContent>

			<AlertModal
				title={"Delete Ticket Type"}
				body={`Are you sure you to delete this "${ticketType.name}" ticket type ?`}
				isOpen={openDeleteAlert}
				onClose={closeModal}
				onCTA={deleteTicketType}
			/>
		</Modal>
	);
};

export default CreateTicketType;
