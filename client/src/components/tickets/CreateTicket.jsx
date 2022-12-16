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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	CreateTicketData,
	CreateTicketSchema,
} from "../../util/ValidationSchemas";
import {
	BsPlusLg,
	BsBugFill,
	BsFileEarmarkText,
	BsQuestion,
} from "react-icons/bs";
import { useRef } from "react";
import { TICKET_STATUS } from "../../util/Constants";
import { getTicketType } from "../../features/miscellaneousSlice.js";

const CreateTicket = ({ isOpen, onClose, ticket, setviewTicket }) => {
	const ticketTypes = useSelector(getTicketType);
	const ticketInfo = ticket || CreateTicketData;

	const formRef = useRef();
	const [error, seterror] = useState("");

	const createTicketTypeOptions = () => {
		if (ticketTypes) {
			return ticketTypes.map((ticketType, index) => (
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

	const onHandleFormSubmit = (values, action) => {
		console.table(values);
	};

	const closeModal = () => {
		setviewTicket(null);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={closeModal}>
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
													<FormControl>
														<FormLabel fontWeight="regular">Type</FormLabel>
														<Field
															as={Select}
															name="type"
															type="select"
															// value={ticketTypes[0]._id}
														>
															{createTicketTypeOptions()}
														</Field>
													</FormControl>

													<FormControl>
														<FormLabel fontWeight="regular">Status</FormLabel>
														<Field
															as={Select}
															name="status"
															type="select"
															// value={TICKET_STATUS[0]}
														>
															{createTicketStatusOptions()}
														</Field>
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
															type="text"
														/>
														<FormErrorMessage>
															{errors.estimatedTime}
														</FormErrorMessage>
													</FormControl>

													<FormControl>
														<FormLabel fontWeight="regular">
															Estimated Time Unit
														</FormLabel>
														<Field
															as={Select}
															name="estimatedTimeUnit"
															type="select"
														>
															<option value="h">Hour(s)</option>
															<option value="m">Minute(s)</option>
														</Field>
													</FormControl>
												</Flex>
											</Flex>
										</Form>
									)}
								</Formik>
							</TabPanel>
							<TabPanel>Comments</TabPanel>
							<TabPanel>Assignees</TabPanel>
						</TabPanels>
					</Tabs>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="red" mr={3} onClick={onClose}>
						Cancel
					</Button>
					<Button
						colorScheme="purple"
						type="submit"
						onClick={() => formRef.current?.handleSubmit()}
					>
						Create Ticket
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CreateTicket;
