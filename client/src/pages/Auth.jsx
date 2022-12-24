import React, { useState } from "react";
import { Button, HStack } from "@chakra-ui/react";
import { Text, Heading, VStack, Image } from "@chakra-ui/react";
import { Login } from "../components/authentication/Login";
import { SignUp } from "../components/authentication/SignUp";
import logo from "../assests/Trackit_Plain.png";

export const Auth = () => {
	const [isLogin, setisLogin] = useState(true);

	return (
		<>
			<VStack mt={10}>
				<Image width="300px" src={logo} />
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
