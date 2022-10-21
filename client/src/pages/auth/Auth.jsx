import React, { useState } from "react";
import { Button, HStack } from "@chakra-ui/react";
import { Text, Heading, VStack, Image } from "@chakra-ui/react";
import { Login } from "../../components/auth/Login";
import { SignUp } from "../../components/auth/SignUp";

export const Auth = () => {
	const [isLogin, setisLogin] = useState(true);

	return (
		<>
			<VStack mt={10}>
				<Image
					boxSize="75px"
					src="https://cdn-icons-png.flaticon.com/512/4409/4409350.png"
				/>
				<Heading as="h3" size="lg" fontWeight="semibold">
					Log in to your account
				</Heading>
				<HStack spacing={1}>
					<Text color="gray">
						{isLogin ? "Don't have an account?" : "Already have an account?"}
					</Text>
					<Button
						variant="link"
						colorScheme="purple"
						onClick={() => setisLogin((prevValue) => !prevValue)}
					>
						{isLogin ? "Sign up" : "Login"}
					</Button>
				</HStack>

				{isLogin ? <Login /> : <SignUp />}
			</VStack>
		</>
	);
};
