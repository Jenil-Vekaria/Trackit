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

const CreateTicketType = ({
  data,
  isOpen,
  onClose,
  canDeleteTicketType = true,
}) => {
  const alertDialgoDisclosure = useDisclosure();
  const [ticketType, setTicketType] = useState(CreateTicketTypeData);
  const [iconColour, setIconColour] = useState("#000000");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [error, setError] = useState("");
  const formRef = useRef(null);
  let bsIcons = null;

  const getIcon = async (iconName) => {
    try {
      bsIcons = await import("react-icons/bs");
      if (bsIcons[iconName]) {
        setSelectedIcon(() => bsIcons[iconName]);
        setTicketType((prevData) => ({ ...prevData, iconName }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setIconColour(data.colour);
      setTicketType(data);
      getIcon(data.iconName);
    }
  }, [data]);

  useEffect(() => {}, []);

  const onIconSearch = ({ target: { value } }) => {
    const trimmedValue = value.trim();
    getIcon(trimmedValue);
  };

  const onColourChange = ({ target: { value } }) => {
    setIconColour(value);
  };

  const closeCreateTicketTypeModal = () => {
    setError("");
    setIconColour("#000000");
    setSelectedIcon(null);
    setTicketType(CreateTicketTypeData);
    onClose();
  };

  const deleteTicketType = async (closeAlertModal) => {
    closeAlertModal();

    try {
      await MiscellaneousService.deleteTicketType(ticketType.name);
      closeCreateTicketTypeModal();
    } catch (error) {
      setError(error);
    }
  };

  const onFormSubmit = async (value, action) => {
    const ticketTypeData = { ...value, colour: iconColour };

    try {
      if (data) {
        await MiscellaneousService.updateTicketType(ticketTypeData);
      } else {
        await MiscellaneousService.createTicketType(ticketTypeData);
      }
      closeCreateTicketTypeModal();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeCreateTicketTypeModal} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data ? "Update" : "Create"} Ticket Type</ModalHeader>
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
              initialValues={ticketType}
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

                  <FormControl isInvalid={errors.iconName && touched.iconName}>
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
                    <FormErrorMessage>{errors.iconName}</FormErrorMessage>
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

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => formRef.current?.handleSubmit()}
          >
            Create
          </Button>
          {data && canDeleteTicketType ? (
            <Button colorScheme="red" onClick={alertDialgoDisclosure.onOpen}>
              Delete
            </Button>
          ) : (
            <Button colorScheme="gray" onClick={closeCreateTicketTypeModal}>
              Cancel
            </Button>
          )}
        </ModalFooter>
      </ModalContent>

      <AlertModal
        title={"Delete Ticket Type"}
        body={`Are you sure you to delete this "${ticketType.name}" ticket type ?`}
        onCTA={deleteTicketType}
        {...alertDialgoDisclosure}
      />
    </Modal>
  );
};

export default CreateTicketType;
