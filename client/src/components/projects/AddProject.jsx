import { useRouter } from "next/router";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
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
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useRef, useState } from "react";
import AuthService from "@/services/auth-service";
import MiscellaneousService from "@/services/miscellaneous-service";
import ProjectService from "@/services/project-service";
import useApi from "@/hooks/useApi";
import {
  PROJECT_ASSIGNEES_COLUMNS,
  USERS_COLUMNS,
} from "@/util/TableDataDisplay";
import {
  CreateProjectData,
  CreateProjectSchema,
} from "@/util/ValidationSchemas";
import RichTextEditor from "../editor/RichTextEditor";
import AlertModal from "../others/AlertModal";
import Table from "../others/Table";

const AddProject = ({ isOpen, onClose, projectInfo, mutateServer }) => {
  const isNewProject = projectInfo === undefined;

  const router = useRouter();
  const formRef = useRef();
  const deleteProjectDisclosure = useDisclosure();

  const [error, setError] = useState("");
  const [selectedAssigneeIds, setSelectedAssigneeIds] = useState([]);
  const [projectDescription, setProjectDescription] = useState("");
  const [projectInfoData, setProjectInfoData] = useState(CreateProjectData);
  const [isProjectAuthor, setIsProjectAuthor] = useState(isNewProject);

  const allUsersSWR = useApi(MiscellaneousService.getUsers(), isOpen);

  useEffect(() => {
    if (isOpen && projectInfo) {
      setProjectInfoData({
        title: projectInfo.title,
        description: projectInfo.description,
        assignees: projectInfo.assignees.map((assignee) => assignee._id) || [],
      });

      setProjectDescription(projectInfo.description);

      setSelectedAssigneeIds(
        projectInfo.assignees.map((assignee) => assignee._id)
      );

      setIsProjectAuthor(
        AuthService.getCurrentUser()._id === projectInfo.authorId._id
      );
    }
  }, [isOpen]);

  const onAssigneeClick = ({ selected }) => {
    setSelectedAssigneeIds(Object.keys(selected));
  };

  const onProjectDelete = async () => {
    try {
      await mutateServer(ProjectService.deleteProject(projectInfo._id));
      onCloseModal();
      router.back();
    } catch (error) {
      setError(error);
      deleteProjectDisclosure.onClose();
    }
  };

  const onCloseModal = () => {
    setError("");
    setProjectInfoData(CreateProjectData);
    setProjectDescription("");
    setSelectedAssigneeIds([]);
    onClose();
  };

  const onHandleFormSubmit = async (data) => {
    try {
      const projectData = { ...data };
      projectData.assignees = selectedAssigneeIds;
      projectData.description = projectDescription;

      let apiRequestInfo = {};

      if (isNewProject) {
        apiRequestInfo = ProjectService.createProject(projectData);
      } else {
        projectData._id = projectInfo._id;
        apiRequestInfo = ProjectService.updateProject(
          projectData,
          projectInfo._id
        );
      }

      await mutateServer(apiRequestInfo);

      onClose();
      onCloseModal();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onCloseModal}
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isNewProject ? "Create" : "Update"} Project</ModalHeader>
        <ModalCloseButton onClick={onClose} />

        <ModalBody overflowY="auto" mt={-10}>
          <Tabs variant="enclosed" size="sm" colorScheme="blue" mt={10}>
            <TabList>
              <Tab>Project Info</Tab>
              <Tab>Contributors</Tab>
            </TabList>

            {error && (
              <Alert status="error" variant="left-accent" fontSize="sm" mb={2}>
                <AlertIcon />
                {error}
              </Alert>
            )}

            <TabPanels maxHeight="100%" height="100%">
              <TabPanel>
                <Formik
                  initialValues={projectInfoData}
                  validationSchema={CreateProjectSchema}
                  onSubmit={onHandleFormSubmit}
                  innerRef={formRef}
                  enableReinitialize
                >
                  {({ errors, touched }) => (
                    <Flex direction="column" justify="space-between">
                      <Form>
                        <Box>
                          <Flex direction="column" gap={3}>
                            <FormControl
                              isInvalid={errors.title && touched.title}
                            >
                              <FormLabel>Title</FormLabel>
                              <Field
                                as={Input}
                                name="title"
                                type="text"
                                borderWidth="2px"
                                disabled={!isProjectAuthor}
                              />
                              <FormErrorMessage>
                                {errors.title}
                              </FormErrorMessage>
                            </FormControl>

                            <FormControl>
                              <FormLabel>Description</FormLabel>
                              <RichTextEditor
                                content={projectDescription}
                                setContent={setProjectDescription}
                                disabled={!isProjectAuthor}
                              />
                            </FormControl>
                          </Flex>
                        </Box>
                      </Form>
                    </Flex>
                  )}
                </Formik>
              </TabPanel>
              <TabPanel>
                <Table
                  tableData={
                    !isNewProject && !isProjectAuthor
                      ? projectInfo.assignees
                      : allUsersSWR.data
                  }
                  columns={
                    !isNewProject && !isProjectAuthor
                      ? PROJECT_ASSIGNEES_COLUMNS
                      : USERS_COLUMNS
                  }
                  searchPlaceholder={"Search for users"}
                  height={330}
                  hasCheckboxColumn={isProjectAuthor}
                  sortable={false}
                  selectedRowIds={selectedAssigneeIds}
                  onSelectionChange={onAssigneeClick}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter mr={3} gap={3}>
          {!isNewProject && isProjectAuthor ? (
            <Button colorScheme="red" onClick={deleteProjectDisclosure.onOpen}>
              Delete Project
            </Button>
          ) : null}

          {isProjectAuthor ? (
            <Button
              colorScheme="blue"
              onClick={() => {
                formRef.current?.submitForm();
              }}
            >
              {isNewProject ? "Create" : "Save Changes"}
            </Button>
          ) : null}

          {!isProjectAuthor ? <Button onClick={onClose}>Close</Button> : null}
        </ModalFooter>

        <AlertModal
          title={"Delete project"}
          body="Are you sure you to delete project?"
          isOpen={deleteProjectDisclosure.isOpen}
          onClose={deleteProjectDisclosure.onClose}
          onCTA={onProjectDelete}
        />
      </ModalContent>
    </Modal>
  );
};

export default AddProject;
