import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormLabel,
	Input,
	Flex,
	FormErrorMessage,
	Alert,
} from "@chakra-ui/react";
import { LoginData, LoginSchema } from "../../util/ValidationSchemas";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth-service";
import MiscellaneousService from "../../services/miscellaneous-service";

export const Login = () => {
	const [error, seterror] = useState("");
	const navigate = useNavigate();

	const onHandleFormSubmit = async (values) => {
		seterror("");

		try {
			await AuthService.login(values);
			await MiscellaneousService.fetchInitialData();

			navigate("/dashboard");
			window.location.reload();
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
			background={["white"]}
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
							<FormLabel fontWeight="regular">Email</FormLabel>
							<Field as={Input} name="email" type="email" />
							<FormErrorMessage>{errors.email}</FormErrorMessage>
						</FormControl>

						<FormControl mt={4} isInvalid={errors.password && touched.password}>
							<FormLabel fontWeight="regular">Password</FormLabel>
							<Field as={Input} name="password" type="password" />
							<FormErrorMessage>{errors.password}</FormErrorMessage>
						</FormControl>

						<Flex direction="row" justifyContent="space-between" mt={4}>
							<Checkbox>Remember me</Checkbox>
							<Button variant="link" fontWeight="semibold" colorScheme="purple">
								Forgot Password?
							</Button>
						</Flex>

						<Button colorScheme="purple" w="full" mt={10} type="submit">
							Login
						</Button>
					</Form>
				)}
			</Formik>
		</Box>
	);
};
