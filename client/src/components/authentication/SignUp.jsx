import {
  Alert,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import AuthService from "@/services/auth-service";
import { SignUpData, SignupSchema } from "@/util/ValidationSchemas";

export const SignUp = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [error, seterror] = useState("");
  const handleClick = () => setShowPassword((prevState) => !prevState);

  const onHandleFormSubmit = (values, action) => {
    seterror("");

    AuthService.signup(values)
      .then((result) => {
        toast({
          title: "Account created",
          description: "We've created your account for you",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        action.resetForm();
      })
      .catch((error) => {
        seterror(error.response.data.message);
      });
  };

  return (
    <Box
      w={["full", "md"]}
      p={[8, 10]}
      mt={[10]}
      mx="auto"
      background="secondary"
      borderRadius={10}
      boxShadow="md"
    >
      <Formik
        initialValues={SignUpData}
        validationSchema={SignupSchema}
        onSubmit={onHandleFormSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            {error && (
              <Alert status="error" variant="left-accent" mb={2} fontSize="sm">
                {error}
              </Alert>
            )}
            <Flex direction={{ base: "column", md: "row" }} gap={3}>
              <FormControl isInvalid={errors.firstName && touched.firstName}>
                <FormLabel fontWeight="regular">First Name</FormLabel>
                <Field as={Input} name="firstName" type="text" />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.lastName && touched.lastName}>
                <FormLabel fontWeight="regular">Last Name</FormLabel>
                <Field as={Input} name="lastName" type="text" />
                <FormErrorMessage>{errors.lastName}</FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl mt={4} isInvalid={errors.email && touched.email}>
              <FormLabel fontWeight="regular">Email</FormLabel>
              <Field as={Input} name="email" type="email" />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.password && touched.password}>
              <FormLabel fontWeight="regular">Password</FormLabel>
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
              isInvalid={errors.confirmPassword && touched.confirmPassword}
            >
              <FormLabel fontWeight="regular">Confirm Password</FormLabel>
              <InputGroup size="md">
                <Field
                  as={Input}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="confirmPassword"
                />
                <InputRightElement width="4.5rem">
                  <Button size="sm" onClick={handleClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
            </FormControl>

            <Button colorScheme="blue" w="full" mt={10} type="submit">
              Sign up
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
