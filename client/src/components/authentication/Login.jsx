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
import { useEffect, useState } from "react";
import AuthService from "@/services/auth-service";
import MiscellaneousService from "@/services/miscellaneous-service";
import useApi from "@/hooks/useApi";
import useAuthStore from "@/hooks/useAuth";
import { LoginData, LoginSchema } from "@/util/ValidationSchemas";

export const Login = () => {
  const [error, seterror] = useState("");
  const [isLogging, setisLogging] = useState(false);
  const router = useRouter();
  const loginSWR = useApi(null);
  const authStore = useAuthStore();

  useEffect(() => {
    if (loginSWR.data) {
      authStore.setAccessToken(loginSWR.data.accessToken);
      authStore.setUserProfile(loginSWR.data.userProfile);
      router.reload();
    }
  }, [loginSWR.data]);

  const onHandleFormSubmit = async (values) => {
    seterror("");
    setisLogging(true);

    try {
      await loginSWR.mutateServer(AuthService.login(values));
    } catch (error) {
      seterror(error);
    }
    setisLogging(false);
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
