import {
	Alert,
	Button,
	FormControl,
	FormLabel,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Input,
	FormErrorMessage,
	Textarea,
	Select,
	Flex,
	useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
	CreateTicketData,
	CreateTicketSchema,
} from "../../util/ValidationSchemas";

import { useRef } from "react";
import { TICKET_STATUS } from "../../util/Constants";
import { getTicketType, getUsers } from "../../features/miscellaneousSlice.js";
import TicketService from "../../services/ticket-service";
import AlertModal from "../others/AlertModal";
import { USERS_COLUMNS } from "../../util/TableDataDisplay";
import Table from "../others/Table";

const CreateTicket = ({
	isOpen,
	onClose,
	ticket,
	setviewTicket,
	projectId,
}) => {
	const ticketTypes = useSelector(getTicketType);
	const allUsers = useSelector(getUsers(true));
	const ticketInfo = ticket || CreateTicketData;

	const formRef = useRef();
	const toast = useToast();
	const [error, seterror] = useState("");
	const [assigneesId, setAssigneesId] = useState([]);
	const [openDeleteAlert, setopenDeleteAlert] = useState(false);

	useEffect(() => {
		if (ticket) {
			setAssigneesId(ticket.assignees);
		}
	}, [ticket]);

	const onAssigneeClick = ({ selected }) => {
		setAssigneesId(Object.keys(selected));
	};

	const getSelectedAssigneesId = () => {
		const selectedAssignees = {};

		if (ticket) {
			ticket.assignees.forEach((assignee) => {
				selectedAssignees[assignee] = true;
			});
		}

		return selectedAssignees;
	};

	const createTicketTypeOptions = () => {
		if (ticketTypes) {
			return Object.entries(ticketTypes).map(([ticketTypeId, value], index) => (
				<option key={ticketTypeId} value={ticketTypeId}>
					{value.name}
				</option>
			));
		}
	};

	const createTicketStatusOptions = () => {
		return TICKET_STATUS.map((status, index) => (
			<option key={index} value={status}>
				{status}
			</option>
		));
	};

	const onHandleFormSubmit = (values, action) => {
		const ticketFormData = { ...values };
		ticketFormData.assignees = assigneesId;

		if (!ticket) {
			TicketService.createTicket(ticketFormData, projectId).then(() => {
				toast({
					title: "Ticket created",
					status: "success",
					duration: 4000,
					isClosable: true,
				});
				closeModal();
			});
		} else {
			TicketService.updateTicket(ticketFormData, projectId).then(() => {
				toast({
					title: "Ticket updated",
					status: "success",
					duration: 4000,
					isClosable: true,
				});
				closeModal();
			});
		}
	};

	const onTicketDelete = async () => {
		await TicketService.deleteTicket(ticket._id);
		closeModal();
	};

	const closeModal = () => {
		setviewTicket(null);
		setAssigneesId([]);
		setopenDeleteAlert(false);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={closeModal} size="lg">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create Ticket</ModalHeader>
				<ModalCloseButton onClick={closeModal} />
				<ModalBody>
					<Tabs variant="soft-rounded" colorScheme="purple" isFitted>
						<TabList>
							<Tab>Ticket Info</Tab>
							<Tab>Comments</Tab>
							<Tab>Assignees</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<Formik
									initialValues={ticketInfo}
									validationSchema={CreateTicketSchema}
									onSubmit={onHandleFormSubmit}
									innerRef={formRef}
									enableReinitialize
								>
									{({ errors, touched }) => (
										<Form>
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

											<Flex direction="column" gap={3}>
												<FormControl isInvalid={errors.title && touched.title}>
													<FormLabel fontWeight="regular">Title</FormLabel>
													<Field as={Input} name="title" type="text" />
													<FormErrorMessage>{errors.title}</FormErrorMessage>
												</FormControl>

												<FormControl
													isInvalid={errors.description && touched.description}
												>
													<FormLabel fontWeight="regular">
														Description
													</FormLabel>
													<Field as={Textarea} name="description" type="text" />
													<FormErrorMessage>
														{errors.description}
													</FormErrorMessage>
												</FormControl>

												<Flex gap={4}>
													<FormControl isInvalid={errors.type && touched.type}>
														<FormLabel fontWeight="regular">Type</FormLabel>
														<Field
															as={Select}
															name="type"
															type="select"
															// value={ticketTypes[0]._id}
														>
															<option value="" disabled selected>
																Select
															</option>
															{createTicketTypeOptions()}
														</Field>
														<FormErrorMessage>{errors.type}</FormErrorMessage>
													</FormControl>

													<FormControl
														isInvalid={errors.status && touched.status}
													>
														<FormLabel fontWeight="regular">Status</FormLabel>
														<Field
															as={Select}
															name="status"
															type="select"
															// value={TICKET_STATUS[0]}
														>
															<option value="" disabled selected>
																Select
															</option>
															{createTicketStatusOptions()}
														</Field>
														<FormErrorMessage>{errors.status}</FormErrorMessage>
													</FormControl>
												</Flex>

												<Flex gap={4}>
													<FormControl
														isInvalid={
															errors.estimatedTime && touched.estimatedTime
														}
													>
														<FormLabel fontWeight="regular">
															Estimated time
														</FormLabel>
														<Field
															as={Input}
															name="estimatedTime"
															type="number"
														/>
														<FormErrorMessage>
															{errors.estimatedTime}
														</FormErrorMessage>
													</FormControl>

													<FormControl
														isInvalid={
															errors.estimatedTimeUnit &&
															touched.estimatedTimeUnit
														}
													>
														<FormLabel fontWeight="regular">
															Estimated Time Unit
														</FormLabel>
														<Field
															as={Select}
															name="estimatedTimeUnit"
															type="select"
														>
															<option value="" disabled selected>
																Select
															</option>
															<option value="h">Hour(s)</option>
															<option value="d">Day(s)</option>
														</Field>
														<FormErrorMessage>
															{errors.estimatedTimeUnit}
														</FormErrorMessage>
													</FormControl>
												</Flex>
											</Flex>
										</Form>
									)}
								</Formik>
							</TabPanel>
							<TabPanel>Comments</TabPanel>
							<TabPanel>
								<Table
									tableData={allUsers}
									columns={USERS_COLUMNS}
									searchPlaceholder={"Search for users"}
									height={300}
									hasCheckboxColumn={true}
									sortable={false}
									selectedRow={getSelectedAssigneesId()}
									onSelectionChange={onAssigneeClick}
								/>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</ModalBody>

				<ModalFooter>
					<Button
						colorScheme="purple"
						type="submit"
						mr={3}
						onClick={() => formRef.current?.handleSubmit()}
					>
						{ticket ? "Save" : "Create"} Ticket
					</Button>
					{ticket ? (
						<Button colorScheme="red" onClick={() => setopenDeleteAlert(true)}>
							Delete Ticket
						</Button>
					) : (
						<Button onClick={closeModal}>Cancel</Button>
					)}
				</ModalFooter>
			</ModalContent>

			<AlertModal
				title={"Delete ticket"}
				body="Are you sure you to delete this ticket?"
				isOpen={openDeleteAlert}
				onClose={closeModal}
				onCTA={onTicketDelete}
			/>
		</Modal>
	);
};

export default CreateTicket;
