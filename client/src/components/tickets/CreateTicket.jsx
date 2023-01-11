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
	Heading,
	Text,
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
import AuthService from "../../services/auth-service";
import { usePermissions } from "../../hooks/usePermissions";
import { Permissions } from "../../util/Utils";
import PermissionsRender from "../others/PermissionsRender";
import CommentSection from "../comment/CommentSection";
import ProjectService from "../../services/project-service";

const CreateTicket = ({
	isOpen,
	onClose,
	ticket,
	setviewTicket,
	projectId,
}) => {
	const ticketTypes = useSelector(getTicketType);
	const projectAssignees = ProjectService.getProjectAssignees(projectId);
	const [ticketInfo, setTicketInfo] = useState(CreateTicketData);

	const canManageTickets = usePermissions(Permissions.canManageTicket);

	const formRef = useRef();
	const toast = useToast();
	const [error, seterror] = useState("");
	const [assigneesId, setAssigneesId] = useState([]);
	const [openDeleteAlert, setopenDeleteAlert] = useState(false);

	useEffect(() => {
		if (ticket) {
			const ticketCopy = { ...ticket };

			ticketCopy.assignees = ticket.assignees.map((assignee) => assignee._id);
			ticketCopy.projectId = ticket.projectId._id;
			ticketCopy.type = ticket.type._id;

			setAssigneesId(ticketCopy.assignees);
			setTicketInfo(ticketCopy);
		}
	}, [ticket]);

	const onAssigneeClick = ({ selected }) => {
		setAssigneesId(Object.keys(selected));
	};

	const getSelectedAssigneesId = () => {
		const selectedAssignees = {};

		ticket?.assignees.forEach((assignee) => {
			selectedAssignees[assignee._id] = true;
		});

		return selectedAssignees;
	};

	const createTicketTypeOptions = () => {
		if (ticketTypes) {
			return ticketTypes.map((ticketType) => (
				<option key={ticketType._id} value={ticketType._id}>
					{ticketType.name}
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

	const onHandleFormSubmit = async (values) => {
		const ticketFormData = { ...values };
		ticketFormData.assignees = assigneesId;

		try {
			if (!ticket) {
				await TicketService.createTicket(ticketFormData, projectId);
			} else {
				await TicketService.updateTicket(ticketFormData, projectId);
			}

			toast({
				title: `Ticket ${ticket ? "updated" : "created"}`,
				status: "success",
				duration: 1000,
				isClosable: true,
			});

			closeModal();
		} catch (error) {
			seterror(error);
		}
	};

	const onTicketDelete = async () => {
		await TicketService.deleteTicket(ticket._id);
		closeModal();
	};

	//Every ime the signed in user's ticket is updated, refetch all the user's tickets and store in redux
	const getMyTickets = async () => {
		const { _id } = AuthService.getCurrentUser();

		if (assigneesId.includes(_id) || ticketInfo.createdBy === _id) {
			await TicketService.getUserTickets();
		}
	};

	const closeModal = () => {
		setviewTicket(null);
		setAssigneesId([]);
		setTicketInfo(CreateTicketData);
		setopenDeleteAlert(false);
		// getMyTickets();
		onClose();
	};

	return (
		<Modal
			closeOnOverlayClick={false}
			isOpen={isOpen}
			onClose={closeModal}
			size="lg"
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<Heading as="h3" size="md">
						{ticket ? "Edit" : "Create"} Ticket
					</Heading>
					<Text fontSize="sm" color="purple" mt={2}>
						{ticket?.projectId?.title} || {ticket?.title}
					</Text>
				</ModalHeader>
				<ModalCloseButton onClick={closeModal} />
				<ModalBody overflowY="auto">
					<Tabs variant="soft-rounded" colorScheme="purple" isFitted>
						<TabList>
							<Tab>Ticket Info</Tab>
							{ticket ? <Tab>Comments</Tab> : null}
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
													<Field
														as={Input}
														name="title"
														type="text"
														disabled={!canManageTickets}
													/>
													<FormErrorMessage>{errors.title}</FormErrorMessage>
												</FormControl>

												<FormControl
													isInvalid={errors.description && touched.description}
												>
													<FormLabel fontWeight="regular">
														Description
													</FormLabel>
													<Field
														as={Textarea}
														name="description"
														type="text"
														disabled={!canManageTickets}
													/>
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
															disabled={!canManageTickets}
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
															disabled={!canManageTickets}
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
															disabled={!canManageTickets}
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
															disabled={!canManageTickets}
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

							{ticket ? (
								<TabPanel>
									<CommentSection ticketId={ticket ? ticket._id : null} />
								</TabPanel>
							) : null}

							<TabPanel>
								<Table
									tableData={projectAssignees}
									columns={USERS_COLUMNS}
									searchPlaceholder={"Search for users"}
									height={300}
									hasCheckboxColumn={true}
									sortable={false}
									selectedRow={getSelectedAssigneesId()}
									onSelectionChange={onAssigneeClick}
									disableCheckBox={!canManageTickets}
								/>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</ModalBody>

				<PermissionsRender permissionCheck={Permissions.canManageTicket}>
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
							<Button
								colorScheme="red"
								onClick={() => setopenDeleteAlert(true)}
							>
								Delete Ticket
							</Button>
						) : (
							<Button onClick={closeModal}>Cancel</Button>
						)}
					</ModalFooter>
				</PermissionsRender>
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
