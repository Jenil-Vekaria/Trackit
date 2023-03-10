import { useState } from "react";
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
import { useRouter } from "next/router";
import AuthService from "../../services/auth-service";
import MiscellaneousService from "../../services/miscellaneous-service";

export const Login = () => {
	const [error, seterror] = useState("");
	const router = useRouter();

	const onHandleFormSubmit = async (values) => {
		seterror("");

		try {
			await AuthService.login(values);
			await MiscellaneousService.fetchInitialData();

			router.reload();
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

						<Button colorScheme="blue" w="full" mt={10} type="submit">
							Login
						</Button>
					</Form>
				)}
			</Formik>
		</Box>
	);
};
