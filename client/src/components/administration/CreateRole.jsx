import {
  Alert,
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
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import MiscellaneousService from "@/services/miscellaneous-service";
import * as Constants from "@/util/Constants";
import { CreateRoleData, CreateRoleSchema } from "@/util/ValidationSchemas";
import AlertModal from "../others/AlertModal";

const CreateRole = ({ isOpen, onClose, role, mutateServer }) => {
  const isNewRole = !role;
  const alertDialogDisclosure = useDisclosure();
  const formRef = useRef(null);
  const [permissions, setPermissions] = useState([]);
  const [roleData, setRoleData] = useState(CreateRoleData);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && role) {
      setRoleData(role);
      console.log(role.permissions);
      setPermissions(role.permissions);
    }
  }, [isOpen]);

  const displayPermissions = [
    {
      name: "Manage Tickets",
      helperText: "Allows user to create, delete, and modify tickets",
      value: Constants.MANAGE_TICKET,
    },
    {
      name: "Manage Projects",
      helperText:
        "Allows users to create, delete, and modify their own projects",
      value: Constants.MANAGE_PROJECT,
    },
    {
      name: "Manage Admin Page",
      helperText: "Allows user to access the admin page",
      value: Constants.MANAGE_ADMIN_PAGE,
    },
  ];

  const onPermissionToggle = ({ target: { checked, value } }) => {
    if (checked) {
      //add permission
      setPermissions([...permissions, value]);
    } else {
      //remove permission
      const updatedPermissions = permissions.filter(
        (permission) => permission !== value
      );
      setPermissions(updatedPermissions);
    }
  };

  const closeModal = () => {
    setRoleData(CreateRoleData);
    setPermissions([]);
    setError("");
    onClose();
  };

  const onRoleDelete = async () => {
    alertDialogDisclosure.onClose();
    try {
      const apiRequestInfo = MiscellaneousService.deleteRole(role._id);
      await mutateServer(apiRequestInfo);
      closeModal();
    } catch (error) {
      setError(error);
    }
  };

  const onFormSubmit = async (data) => {
    try {
      const roleDataCopy = { ...data, permissions };

      let apiRequestInfo = {};

      if (isNewRole) {
        apiRequestInfo = MiscellaneousService.createRole(roleDataCopy);
      } else {
        apiRequestInfo = MiscellaneousService.updateRole(roleDataCopy);
      }

      await mutateServer(apiRequestInfo);

      closeModal();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="md">
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
                  <FormControl isInvalid={errors.name && touched.name} pb={2}>
                    <FormLabel>Role Name</FormLabel>
                    <Field as={Input} name="name" type="text" required />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  {displayPermissions.map((permission, index) => (
                    <FormControl key={index}>
                      <Box display="flex" width="100%">
                        <FormLabel fontSize="sm">{permission.name}</FormLabel>
                        <Spacer />
                        <Switch
                          colorScheme="blue"
                          size="lg"
                          value={permission.value}
                          onChange={onPermissionToggle}
                          isChecked={permissions.includes(permission.value)}
                        />
                      </Box>
                      <FormHelperText fontSize="xs" as="i">
                        {permission.helperText}
                      </FormHelperText>
                    </FormControl>
                  ))}
                </>
              )}
            </Formik>
          </Flex>
        </ModalBody>

        <ModalFooter gap={3}>
          {role ? (
            <Button colorScheme="red" onClick={alertDialogDisclosure.onOpen}>
              Delete
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
          <Button
            colorScheme="blue"
            onClick={() => formRef.current?.handleSubmit()}
          >
            {isNewRole ? "Create" : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>

      <AlertModal
        title={"Delete role"}
        body="Are you sure you to delete this role?"
        onCTA={onRoleDelete}
        isOpen={alertDialogDisclosure.isOpen}
        onClose={alertDialogDisclosure.onClose}
      />
    </Modal>
  );
};

export default CreateRole;
