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

const CreateRole = ({ data, isOpen, onClose }) => {
  const alertDialogDisclosure = useDisclosure();
  const formRef = useRef(null);
  const roleData = data || CreateRoleData;
  const [permissions, setPermissions] = useState([]);
  const [error, seterror] = useState(null);

  useEffect(() => {
    if (data) {
      setPermissions(data.permissions);
    }
  }, [data]);

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

  const closeCreateRoleDiaglog = () => {
    setPermissions([]);
    seterror("");
    onClose();
  };

  const onRoleDelete = async (closeAlertModal) => {
    closeAlertModal();

    try {
      await MiscellaneousService.deleteRole(data._id);
      closeCreateRoleDiaglog();
    } catch (error) {
      seterror(error);
    }
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
    <Modal isOpen={isOpen} onClose={closeCreateRoleDiaglog} size="md">
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
                          defaultChecked={roleData.permissions.includes(
                            permission.value
                          )}
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

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => formRef.current?.handleSubmit()}
          >
            Create
          </Button>
          {data ? (
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
        </ModalFooter>
      </ModalContent>

      <AlertModal
        title={"Delete role"}
        body="Are you sure you to delete this role?"
        onCTA={onRoleDelete}
        {...alertDialogDisclosure}
      />
    </Modal>
  );
};

export default CreateRole;
