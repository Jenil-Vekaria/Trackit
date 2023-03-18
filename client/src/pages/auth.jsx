import { useState } from "react";
import {
	Button,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	VStack,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
} from "@chakra-ui/react";
import { Login } from "../components/authentication/Login";
import { SignUp } from "../components/authentication/SignUp";
import Image from "next/image";
import logo from "../assests/Trackit_Plain.png";
import { DEMO_LOGIN_INFO } from "@/util/Constants";

export const Auth = () => {
	const [isLogin, setisLogin] = useState(true);
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<VStack mt={10}>
				<Image width={300} src={logo} alt="logo" />
				<Heading as="h3" size="lg" fontWeight="semibold">
					Log in to your account
				</Heading>
				{isLogin ? <Login /> : <SignUp />}
				<br />
				<Button onClick={onOpen}>Demo Login Info</Button>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Demo Login Info</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<TableContainer>
								<Table variant="simple">
									<Thead>
										<Tr>
											<Th>Email</Th>
											<Th>Password</Th>
											<Th>Role</Th>
										</Tr>
									</Thead>
									<Tbody>
										{DEMO_LOGIN_INFO.map((loginInfo, index) => (
											<Tr key={index}>
												<Td>{loginInfo.email}</Td>
												<Td>{loginInfo.password}</Td>
												<Td>{loginInfo.role}</Td>
											</Tr>
										))}
									</Tbody>
								</Table>
							</TableContainer>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme="blue" mr={3} onClick={onClose}>
								Close
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</VStack>
		</>
	);
};

export default Auth;
