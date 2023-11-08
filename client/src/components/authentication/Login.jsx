import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import AuthService from "@/services/auth-service";
import MiscellaneousService from "@/services/miscellaneous-service";
import { LoginData, LoginSchema } from "@/util/ValidationSchemas";

export const Login = () => {
  const [error, seterror] = useState("");
  const [isLogging, setisLogging] = useState(false);
  const router = useRouter();

  const onHandleFormSubmit = async (values) => {
    seterror("");
    setisLogging(true);

    try {
      await AuthService.login(values);
      await MiscellaneousService.fetchInitialData();
      router.reload();
      setisLogging(false);
    } catch (error) {
      seterror(error.response.data.message);
    }
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
        initialValues={LoginData}
        validationSchema={LoginSchema}
        onSubmit={onHandleFormSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            {error && (
              <Alert status="error" variant="left-accent" mb={2} fontSize="sm">
                {error}
              </Alert>
            )}

            <FormControl isInvalid={errors.email && touched.email}>
              <FormLabel>Email</FormLabel>
              <Field as={Input} name="email" type="email" />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.password && touched.password}>
              <FormLabel>Password</FormLabel>
              <Field as={Input} name="password" type="password" />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="blue"
              w="full"
              mt={10}
              type="submit"
              isLoading={isLogging}
              loadingText="Logging In"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
