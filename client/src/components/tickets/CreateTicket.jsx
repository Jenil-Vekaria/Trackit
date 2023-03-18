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
	useDisclosure,
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
import { getTicketType } from "../../features/miscellaneousSlice.js";
import TicketService from "../../services/ticket-service";
import AlertModal from "../others/AlertModal";
import { USERS_COLUMNS } from "../../util/TableDataDisplay";
import Table from "../others/Table";
import { usePermissions } from "../../hooks/usePermissions";
import { Permissions } from "../../util/Utils";
import PermissionsRender from "../others/PermissionsRender";
import CommentSection from "../comment/CommentSection";
import ProjectService from "../../services/project-service";
import moment from "moment/moment";
import RichTextEditor from "../editor/RichTextEditor";

const CreateTicket = ({
	isOpen,
	onClose,
	ticket,
	setviewTicket,
	projectId,
	projectTitle,
}) => {
	const ticketTypes = useSelector(getTicketType);
	const [projectAssignees, setProjectAssignees] = useState([]);
	const [ticketInfo, setTicketInfo] = useState(CreateTicketData);
	const [ticketDescription, setTicketDescription] = useState("");

	const canManageTickets = usePermissions(Permissions.canManageTickets);

	const alertModalDisclosure = useDisclosure();
	const formRef = useRef();
	const toast = useToast();
	const [error, seterror] = useState("");
	const [assigneesId, setAssigneesId] = useState([]);
	const [openDeleteAlert, setopenDeleteAlert] = useState(false);

	useEffect(() => {
		setTicketDescription("");
		setProjectAssignees(ProjectService.getProjectAssignees(projectId));

		if (ticket) {
			const ticketCopy = { ...ticket };

			ticketCopy.assignees = ticket.assignees.map((assignee) => assignee._id);
			ticketCopy.projectId = ticket.projectId._id;
			ticketCopy.type = ticket.type._id;

			setTicketDescription(ticketCopy.description);
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
		ticketFormData.description = ticketDescription;

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
		try {
			await TicketService.deleteTicket(ticket._id);
			closeModal();
		} catch (error) {
			closeAlert();
			seterror(error);
		}
	};

	const closeAlert = () => {
		setopenDeleteAlert(false);
		alertModalDisclosure.onClose();
	};

	const closeModal = () => {
		setviewTicket(null);
		setAssigneesId([]);
		setTicketInfo(CreateTicketData);
		setopenDeleteAlert(false);
		seterror("");
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
					<Text fontSize="sm" as="i" fontWeight={400} mt={2}>
						Project: {projectTitle || ""}
					</Text>
				</ModalHeader>
				<ModalCloseButton onClick={closeModal} />
				<ModalBody overflowY="auto" mt={-3}>
					<Tabs variant="enclosed" size="sm" colorScheme="blue">
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

											<Flex gap={3}>
												<Flex direction="column" flex={1} gap={3}>
													<FormControl
														isInvalid={errors.title && touched.title}
													>
														<FormLabel>Title</FormLabel>
														<Field
															as={Input}
															name="title"
															type="text"
															disabled={!canManageTickets}
														/>
														<FormErrorMessage>{errors.title}</FormErrorMessage>
													</FormControl>

													<FormControl>
														<FormLabel>Description</FormLabel>
														<RichTextEditor
															content={ticketDescription}
															setContent={setTicketDescription}
															readOnly={!canManageTickets}
														/>
													</FormControl>
												</Flex>

												<Flex direction="column" gap={3}>
													<FormControl isInvalid={errors.type && touched.type}>
														<FormLabel>Type</FormLabel>
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
														<FormLabel>Status</FormLabel>
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
													<Flex gap={4}>
														<FormControl
															isInvalid={
																errors.estimatedTime && touched.estimatedTime
															}
														>
															<FormLabel>Estimated time</FormLabel>
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
															<FormLabel>Estimated Time Unit</FormLabel>
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

													<Flex direction="column" mt={2}>
														<Text
															fontSize="sm"
															fontWeight={500}
															color="inputLabel"
														>
															{ticketInfo.createdOn
																? "Created " +
																  moment(ticketInfo.createdOn).fromNow()
																: ""}
														</Text>
														<Text
															fontSize="sm"
															fontWeight={500}
															color="inputLabel"
														>
															{ticketInfo.updatedOn
																? "Updated " +
																  moment(ticketInfo.updatedOn).fromNow()
																: ""}
														</Text>
													</Flex>
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

				<PermissionsRender permissionCheck={Permissions.canManageTickets}>
					<ModalFooter>
						<Button
							colorScheme="blue"
							type="submit"
							mr={3}
							onClick={() => formRef.current?.handleSubmit()}
						>
							{ticket ? "Save" : "Create"}
						</Button>
						{ticket ? (
							<Button
								colorScheme="red"
								onClick={() => setopenDeleteAlert(true)}
							>
								Delete
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
				onClose={closeAlert}
				onCTA={onTicketDelete}
			/>
		</Modal>
	);
};

export default CreateTicket;
