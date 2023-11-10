import {
  Button,
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
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { DEMO_LOGIN_INFO } from "@/util/Constants";

const DemoLoginInfoModal = ({ isOpen, onClose }) => {
  return (
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
  );
};

export default DemoLoginInfoModal;
