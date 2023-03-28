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
	Tr,
	Th,
	Td,
	TableContainer,
	Icon,
	Link,
} from "@chakra-ui/react";
import { Login } from "../components/authentication/Login";
import Image from "next/image";
import logo from "../assests/Trackit_Plain.png";
import { DEMO_LOGIN_INFO } from "@/util/Constants";
import { AiFillGithub } from "react-icons/ai";

export const Auth = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<VStack p={5}>
				<Link
					href="https://github.com/Jenil-Vekaria/Trackit"
					isExternal
					alignSelf="flex-end"
				>
					<Icon as={AiFillGithub} w={8} h={8} />
				</Link>
				<Image width={300} src={logo} alt="logo" />
				<Heading as="h3" size="lg" fontWeight="semibold">
					Log in to your account
				</Heading>
				<Login />
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
