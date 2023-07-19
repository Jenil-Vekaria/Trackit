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
import { useSelector } from "react-redux";
import MiscellaneousService from "@/services/miscellaneous-service";
import { getRoles } from "@/features/miscellaneousSlice";
import { ManageUserSchema, SignupSchema } from "@/util/ValidationSchemas";

const UpdateUser = ({
  isOpen,
  closeModal,
  viewUser,
  isUpdateMyProfile = false,
}) => {
  const roles = useSelector(getRoles);
  const formRef = useRef(null);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [showPassword, setShowPassword] = useBoolean();

  useEffect(() => {
    if (viewUser) {
      const userInfoCopy = { ...viewUser };
      userInfoCopy.roleId = viewUser.roleId?._id;

      setUserInfo(userInfoCopy);
    }
  }, [viewUser]);

  const onUpdateUser = async (values, action) => {
    try {
      await MiscellaneousService.updateUserProfile(values);
      closeModal();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const createRoleTypeOption = () => {
    return roles.map((role) => (
      <option key={role._id} value={role._id}>
        {role.name}
      </option>
    ));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setShowPassword.off();
        setError("");
        closeModal();
      }}
      size="md"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={userInfo}
            validationSchema={
              isUpdateMyProfile ? SignupSchema : ManageUserSchema
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
                    <Field
                      as={Input}
                      name="firstName"
                      type="text"
                      disabled={!isUpdateMyProfile}
                    />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.lastName && touched.lastName}>
                    <FormLabel>Last Name</FormLabel>
                    <Field
                      as={Input}
                      name="lastName"
                      type="text"
                      disabled={!isUpdateMyProfile}
                    />
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                  </FormControl>
                </Flex>

                <FormControl mt={4} isInvalid={errors.email && touched.email}>
                  <FormLabel>Email</FormLabel>
                  <Field
                    as={Input}
                    name="email"
                    type="email"
                    disabled={!isUpdateMyProfile}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={errors.roleId && touched.roleId}>
                  <FormLabel>Role</FormLabel>
                  <Field
                    as={Select}
                    name="roleId"
                    type="select"
                    disabled={isUpdateMyProfile}
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    {createRoleTypeOption()}
                  </Field>
                  <FormErrorMessage>{errors.roleId}</FormErrorMessage>
                </FormControl>

                {isUpdateMyProfile ? (
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
                        disabled
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
                          disabled
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            size="sm"
                            onClick={setShowPassword.toggle}
                            isDisabled
                          >
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

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            isDisabled
            onClick={() => formRef.current?.handleSubmit()}
          >
            Save
          </Button>
          {isUpdateMyProfile ? (
            <Button
              colorScheme="gray"
              onClick={() => {
                setShowPassword.off();
                setError("");
                closeModal();
              }}
            >
              Cancel
            </Button>
          ) : (
            <Tooltip label="Not Implemeted">
              <Button colorScheme="red">Delete</Button>
            </Tooltip>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateUser;
