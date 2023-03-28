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
import * as BsIcon from "react-icons/bs";
import MiscellaneousService from "@/services/miscellaneous-service";
import { BS_ICONS } from "@/util/Constants";
import { ICONS_COLUMNS } from "@/util/TableDataDisplay";
import {
  CreateTicketTypeData,
  CreateTicketTypeSchema,
} from "@/util/ValidationSchemas";
import AlertModal from "../others/AlertModal";
import Table from "../others/Table";

const CreateTicketType = ({
  data,
  isOpen,
  onClose,
  canDeleteTicketType = true,
}) => {
  const alertDialgoDisclosure = useDisclosure();
  const [ticketType, setTicketType] = useState(CreateTicketTypeData);
  const [iconColour, setIconColour] = useState("#000000");
  const [iconName, setIconName] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    if (data) {
      setIconColour(data.colour);
      setIconName(data.iconName);
      setTicketType(data);
    }
  }, [data]);

  const onColourChange = ({ target: { value } }) => {
    setIconColour(value);
  };

  const onIconClick = (rowProps, action) => {
    setIconName(rowProps.data.name);
    setTicketType({
      ...formRef.current?.values,
      iconName: rowProps.data.name,
    });
  };

  const closeCreateTicketTypeModal = () => {
    setError("");
    setIconColour("#000000");
    setIconName("");
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
              {iconName ? (
                <Icon
                  as={BsIcon[iconName]}
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
                    </FormLabel>
                    <FormErrorMessage>{errors.iconName}</FormErrorMessage>

                    <Table
                      tableData={BS_ICONS}
                      columns={ICONS_COLUMNS}
                      searchPlaceholder="Search for icon"
                      searchbarVariant="outline"
                      onRowClick={onIconClick}
                      height={210}
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
