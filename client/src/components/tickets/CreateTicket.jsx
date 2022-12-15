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
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	CreateProjectSchema,
	CreateProjectData,
	CreateTicketData,
	CreateTicketSchema,
} from "../../util/ValidationSchemas";
import {
	BsPlusLg,
	BsBugFill,
	BsFileEarmarkText,
	BsQuestion,
} from "react-icons/bs";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { TICKET_STATUS } from "../../util/Constants";
import { getTicketType } from "../../features/miscellaneousSlice.js";

const CreateTicket = ({ isOpen, onOpen, onClose }) => {
	const ticketTypes = useSelector(getTicketType);
	const [ticketInfo, setTicketInfo] = useState(CreateTicketData);
	const formRef = useRef();
	const dispatch = useDispatch();
	const [error, seterror] = useState("");
	const icons = {
		BsBugFill,
		BsFileEarmarkText,
		BsQuestion,
		BsPlusLg,
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
			<option key={index} value={status} selected={index === 0}>
				{status}
			</option>
		));
	};

	const onHandleFormSubmit = (values, action) => {
		console.table(values);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create Ticket</ModalHeader>
				<ModalCloseButton />
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
														<Field as={Select} name="type" type="select">
															{createTicketTypeOptions()}
														</Field>
														<FormErrorMessage>
															{errors.description}
														</FormErrorMessage>
													</FormControl>

													<FormControl
														isInvalid={errors.status && touched.status}
													>
														<FormLabel fontWeight="regular">status</FormLabel>
														<Field as={Select} name="type" type="select">
															{createTicketStatusOptions()}
														</Field>
														<FormErrorMessage>
															{errors.description}
														</FormErrorMessage>
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
