import Link from "next/link";
import {
  Alert,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import MiscellaneousService from "@/services/miscellaneous-service";
import {
  CreateTicketTypeData,
  CreateTicketTypeSchema,
} from "@/util/ValidationSchemas";
import AlertModal from "../others/AlertModal";
import SearchBar from "../others/SearchBar";

const CreateTicketType = ({ isOpen, onClose, ticketType, mutateServer }) => {
  const isNewTicketType = !ticketType;

  const [ticketTypeData, setTicketTypeData] = useState(CreateTicketTypeData);
  const [iconColour, setIconColour] = useState("#000000");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [iconName, setIconName] = useState(null);
  const [error, setError] = useState("");

  const formRef = useRef(null);
  const alertDialogDisclosure = useDisclosure();

  let bsIcons = null;

  useEffect(() => {
    if (isOpen && ticketType) {
      setTicketTypeData(ticketType);
      setIconColour(ticketType.colour);
      getIcon(ticketType.iconName);
    }
  }, [isOpen]);

  const getIcon = async (iconName) => {
    try {
      bsIcons = await import("react-icons/bs");
      if (bsIcons[iconName]) {
        setSelectedIcon(() => bsIcons[iconName]);
        setIconName(iconName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onIconSearch = ({ target: { value } }) => {
    const trimmedValue = value.trim();
    getIcon(trimmedValue);
  };

  const onColourChange = ({ target: { value } }) => {
    setIconColour(value);
  };

  const closeModal = () => {
    setError("");
    setIconColour("#000000");
    setSelectedIcon(null);
    setTicketTypeData(CreateTicketTypeData);
    onClose();
  };

  const deleteTicketType = async () => {
    alertDialogDisclosure.onClose();

    try {
      const apiRequestInfo = MiscellaneousService.deleteTicketType(
        ticketTypeData._id
      );
      await mutateServer(apiRequestInfo);
      closeModal();
    } catch (error) {
      setError(error);
    }
  };

  const onFormSubmit = async (data) => {
    console.log("FORM");
    if (!iconName) {
      setError("Must select an icon");
      return;
    }

    try {
      const ticketTypeCopy = { ...data, iconName, colour: iconColour };
      let apiRequestInfo;

      if (isNewTicketType) {
        apiRequestInfo = MiscellaneousService.createTicketType(ticketTypeCopy);
      } else {
        apiRequestInfo = MiscellaneousService.updateTicketType(ticketTypeCopy);
      }

      await mutateServer(apiRequestInfo);

      closeModal();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isNewTicketType ? "Update" : "Create"} Ticket Type
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={3}>
            <Flex gap={2}>
              <Text as="b">Preview:</Text>
              {selectedIcon ? (
                <Icon
                  as={selectedIcon}
                  bg={iconColour}
                  color="gray.50"
                  w={6}
                  h={6}
                  p={1}
                  borderRadius={5}
                />
              ) : null}
            </Flex>

            <Formik
              initialValues={ticketTypeData}
              validationSchema={CreateTicketTypeSchema}
              onSubmit={onFormSubmit}
              innerRef={formRef}
              enableReinitialize
            >
              {({ errors, touched }) => (
                <>
                  {error && (
                    <Alert
                      status="error"
                      variant="left-accent"
                      mb={2}
                      fontSize="sm"
                    >
                      {error}
                    </Alert>
                  )}
                  <Flex gap={3}>
                    <FormControl isInvalid={errors.name && touched.name}>
                      <FormLabel>Ticket Type Name</FormLabel>
                      <Field as={Input} name="name" type="text" required />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.colour && touched.colour}>
                      <FormLabel>Colour (select icon colour)</FormLabel>
                      <Field
                        as={Input}
                        name="colour"
                        type="color"
                        value={iconColour}
                        onChange={onColourChange}
                      />
                      <FormErrorMessage>{errors.colour}</FormErrorMessage>
                    </FormControl>
                  </Flex>

                  <FormControl>
                    <FormLabel fontWeight="bold" font color="inputLabel">
                      Select an Icon
                      <Link
                        href="https://react-icons.github.io/react-icons/icons?name=bs"
                        passHref
                        target="_blank"
                      >
                        (Click Here)
                      </Link>
                    </FormLabel>
                    <SearchBar
                      handleSearchInputChange={onIconSearch}
                      placeholder="Search for icon"
                      variant="outline"
                    />
                  </FormControl>
                </>
              )}
            </Formik>
          </Flex>
        </ModalBody>

        <ModalFooter gap={3}>
          {!isNewTicketType ? (
            <Button colorScheme="red" onClick={alertDialogDisclosure.onOpen}>
              Delete
            </Button>
          ) : (
            <Button colorScheme="gray" onClick={closeModal}>
              Cancel
            </Button>
          )}
          <Button
            colorScheme="blue"
            onClick={() => {
              console.log("create ticket type", formRef.current);
              formRef.current?.handleSubmit();
            }}
          >
            {isNewTicketType ? "Create" : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>

      <AlertModal
        title={"Delete Ticket Type"}
        body={`Are you sure you to delete this "${ticketTypeData.name}" ticket type ?`}
        onCTA={deleteTicketType}
        onClose={alertDialogDisclosure.onClose}
        isOpen={alertDialogDisclosure.isOpen}
      />
    </Modal>
  );
};

export default CreateTicketType;
