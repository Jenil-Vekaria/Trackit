import Image from "next/image";
import {
  Button,
  HStack,
  Heading,
  Icon,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { Login } from "@/components/authentication/Login";
import { DEMO_LOGIN_INFO } from "@/util/Constants";
import logo from "@/assets/Trackit_Plain.png";

export const Auth = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setisLogin] = useState(true);

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
          {isLogin ? "Log in to your account" : "Create an account"}
        </Heading>
        <HStack spacing={1}>
          <Text color="gray">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Text>
          <Button
            variant="link"
            colorScheme="blue"
            onClick={() => setisLogin((prevValue) => !prevValue)}
          >
            {isLogin ? "Sign up" : "Login"}
          </Button>
        </HStack>

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
