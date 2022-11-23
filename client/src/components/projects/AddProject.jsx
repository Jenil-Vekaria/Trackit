import {
	Tabs,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Box,
	Alert,
	FormControl,
	FormLabel,
	FormErrorMessage,
	IconButton,
	Flex,
	Heading,
	Spacer,
	Textarea,
	Button,
	Input,
	useToast,
	useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import React, { useState, useEffect, useRef } from "react";
import { CreateProjectSchema } from "../../util/ValidationSchemas";
import { USER_COLUMNS } from "../../util/TableDataDisplay";
import { useDispatch } from "react-redux";
import UserService from "../../services/user-service";
import DataTable from "../others/DataTable";
import ProjectService from "../../services/project-service";

const AddProject = () => {
	const navigate = useNavigate();
	const [allUsers, setallUsers] = useState([]);
	const [projectContributors, setprojectContributors] = useState([]);
	const [projectInfo, setProjectInfo] = useState(CreateProjectSchema);
	const [error, seterror] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { projectID } = useParams();
	const formRef = useRef();
	const toast = useToast();
	const dispatch = useDispatch();

	const onCTA = (onClose) => {
		onClose();
		navigate(-1);
	};

	const onProjectDelete = () => {};

	const getAllUsers = async () => {
		const users = await UserService.getUsers();
		setallUsers(users);
	};

	const getProjectInfo = async () => {
		const { _id, title, description, projectAssignees } =
			await ProjectService.getProjectInfo(projectID);
		// console.table(response);
		setProjectInfo({
			_id,
			title,
			description,
			contributors: projectAssignees,
		});

		const assigneesId = [];
		projectAssignees?.forEach((assignee) => {
			assigneesId.push(assignee._id);
		});
		setprojectContributors(assigneesId);
	};

	const onHandleFormSubmit = (values, action) => {
		values.contributors = projectContributors;

		if (projectID) {
			ProjectService.updateProject(values)
				.then((result) => {
					toast({
						title: "Project Updated",
						status: "success",
						duration: 4000,
						isClosable: true,
					});

					navigate(-1);
				})
				.catch((error) => {
					console.info(error.response.data.message);
				});
		} else {
			ProjectService.addProject(values)
				.then((result) => {
					toast({
						title: "Project created",
						status: "success",
						duration: 4000,
						isClosable: true,
					});

					dispatch(ProjectService.getMyProjects());
					navigate(-1);
				})
				.catch((error) => {
					seterror(error.response.data.message);
				});
		}
	};

	useEffect(() => {
		if (projectID) {
			getProjectInfo();
		}
		getAllUsers();
	}, []);

	return (
		<Flex w="100%" h="100%" direction="column">
			<Flex w="100%" h="fit-content">
				<Heading as="h1" size="lg">
					{projectID ? "Edit" : "Add"} Project
				</Heading>
				<Spacer />
				<IconButton
					icon={<CloseIcon />}
					variant="ghost"
					onClick={() => navigate(-1)}
				/>
			</Flex>

			<Tabs variant="soft-rounded" colorScheme="purple" mt={10} h="100%">
				<TabList>
					<Tab>Project Info</Tab>
					<Tab>Contributors</Tab>
				</TabList>

				<TabPanels maxHeight="100%" height="100%">
					<TabPanel>
						<Formik
							initialValues={projectInfo}
							validationSchema={CreateProjectSchema}
							onSubmit={onHandleFormSubmit}
							innerRef={formRef}
							enableReinitialize
						>
							{({ errors, touched }) => (
								<Flex direction="column" justify="space-between">
									<Form>
										<Box>
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
														border="2px"
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
														border="2px"
														height="100%"
													/>
													<FormErrorMessage>
														{errors.description}
													</FormErrorMessage>
												</FormControl>
											</Flex>
										</Box>
									</Form>
								</Flex>
							)}
						</Formik>
					</TabPanel>
					<TabPanel>
						<DataTable
							columns={USER_COLUMNS}
							data={allUsers}
							searchPlaceholder="Search by name"
							searchbarVariant="outline"
							hasSelect={true}
							setSelectValues={setprojectContributors}
							selectedValues={projectContributors}
							height={340}
						/>
					</TabPanel>
				</TabPanels>
			</Tabs>

			<Flex mt={10} justify="flex-end" gap={3}>
				<Button
					colorScheme="purple"
					onClick={() => formRef.current?.handleSubmit()}
				>
					{projectID ? "Save" : "Create"} Project
				</Button>

				{projectID ? (
					<Button colorScheme="red" onClick={onProjectDelete}>
						Delete Project
					</Button>
				) : (
					<Button onClick={() => navigate(-1)}>Cancel</Button>
				)}
			</Flex>

			{/* <AlertModal
				title={"Delete project"}
				body="Are you sure you to delete project?"
				isOpen={isOpen}
				onClose={onClose}
				onCTA={onCTA}
			/> */}
		</Flex>
	);
};

export default AddProject;
