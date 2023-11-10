import {
  Alert,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tooltip,
  useBoolean,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import MiscellaneousService from "@/services/miscellaneous-service";
import useApi from "@/hooks/useApi";
import {
  ManageUserSchema,
  SignUpData,
  SignupSchema,
} from "@/util/ValidationSchemas";

const UpdateUser = ({
  isOpen,
  closeModal,
  viewUser,
  isUpdateMyProfile = false,
  mutateServer,
}) => {
  const allRolesSWR = useApi(MiscellaneousService.getRoles());
  const formRef = useRef(null);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(SignUpData);
  const [showPassword, setShowPassword] = useBoolean();
  const isUpdatingUserProfile = !isUpdateMyProfile && viewUser;

  const modalTitle = isUpdateMyProfile
    ? "My Profile"
    : viewUser
    ? "Update User"
    : "Create User";

  useEffect(() => {
    if (isOpen && viewUser) {
      const userInfoCopy = {
        _id: viewUser._id,
        firstName: viewUser.firstName,
        lastName: viewUser.lastName,
        roleId: viewUser.roleId?._id,
        email: viewUser.email,
      };

      if (isUpdateMyProfile) {
        userInfoCopy.password = "";
        userInfoCopy.confirmPassword = "";
      }

      setUserInfo(userInfoCopy);
    }
  }, [isOpen]);

  const onUpdateUser = async (data) => {
    try {
      let apiRequestInfo;

      if (viewUser) {
        apiRequestInfo = isUpdateMyProfile
          ? MiscellaneousService.updateMyProfile(data)
          : MiscellaneousService.updateUserProfile(data);
      } else {
        apiRequestInfo = MiscellaneousService.createUser(data);
      }

      await mutateServer(apiRequestInfo);

      setError("");
      onCloseModal();
    } catch (error) {
      console.log("ERROR: ", error);
      setError(error);
    }
  };

  const onCloseModal = () => {
    setShowPassword.off();
    setUserInfo(SignUpData);
    setError("");
    closeModal();
  };

  const createRoleTypeOption = () => {
    return allRolesSWR.data?.map((role) => (
      <option key={role._id} value={role._id}>
        {role.name}
      </option>
    ));
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={userInfo}
            validationSchema={
              isUpdatingUserProfile ? ManageUserSchema : SignupSchema
            }
            onSubmit={onUpdateUser}
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
                <Flex direction={{ base: "column", md: "row" }} gap={3}>
                  <FormControl
                    isInvalid={errors.firstName && touched.firstName}
                  >
                    <FormLabel>First Name</FormLabel>
                    <Field as={Input} name="firstName" type="text" />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.lastName && touched.lastName}>
                    <FormLabel>Last Name</FormLabel>
                    <Field as={Input} name="lastName" type="text" />
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                  </FormControl>
                </Flex>

                <FormControl mt={4} isInvalid={errors.email && touched.email}>
                  <FormLabel>Email</FormLabel>
                  <Field as={Input} name="email" type="email" />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                {!isUpdateMyProfile ? (
                  <FormControl
                    mt={4}
                    isInvalid={errors.roleId && touched.roleId}
                  >
                    <FormLabel>Role</FormLabel>
                    <Field as={Select} name="roleId" type="select">
                      <option value="" disabled>
                        Select
                      </option>
                      {createRoleTypeOption()}
                    </Field>
                    <FormErrorMessage>{errors.roleId}</FormErrorMessage>
                  </FormControl>
                ) : null}

                {!isUpdatingUserProfile ? (
                  <>
                    <FormControl
                      mt={4}
                      isInvalid={errors.password && touched.password}
                    >
                      <FormLabel>Password</FormLabel>
                      <Field
                        as={Input}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        name="password"
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      mt={4}
                      isInvalid={
                        errors.confirmPassword && touched.confirmPassword
                      }
                    >
                      <FormLabel>Confirm Password</FormLabel>
                      <InputGroup>
                        <Field
                          as={Input}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          name="confirmPassword"
                        />
                        <InputRightElement width="4.5rem">
                          <Button size="sm" onClick={setShowPassword.toggle}>
                            {showPassword ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {errors.confirmPassword}
                      </FormErrorMessage>
                    </FormControl>
                  </>
                ) : null}
              </Form>
            )}
          </Formik>
        </ModalBody>

        <ModalFooter gap={3}>
          {viewUser ? (
            <Tooltip label="Not Implemeted">
              <Button colorScheme="red">Delete</Button>
            </Tooltip>
          ) : null}

          <Button
            colorScheme="blue"
            onClick={() => formRef.current?.handleSubmit()}
          >
            {!viewUser ? "Create" : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateUser;
