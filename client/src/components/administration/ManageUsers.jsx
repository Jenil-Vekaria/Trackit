import { Button, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import MiscellaneousService from "@/services/miscellaneous-service";
import useApi from "@/hooks/useApi";
import { MANAGE_USERS_COLUMNS } from "@/util/TableDataDisplay";
import Table from "../others/Table";
import UpdateUser from "./UpdateUser";

const ManageUsers = () => {
  const allUsersSWR = useApi(MiscellaneousService.getUsers("excludeUser=true"));
  const [viewUser, setViewUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onUserClick = (rowProps, _) => {
    setViewUser(rowProps.data);
    onOpen();
  };

  const closeModal = async () => {
    setViewUser(null);
    onClose();
  };

  return (
    <>
      <Table
        tableData={allUsersSWR.data}
        columns={MANAGE_USERS_COLUMNS}
        searchPlaceholder="Search for users"
        onRowClick={onUserClick}
        height={420}
        isLoading={allUsersSWR.isLoading}
      />
      <br />
      <Spacer />
      <Flex justify="flex-end">
        <Button colorScheme="blue" pos="right" onClick={() => onOpen()}>
          Add New User
        </Button>
      </Flex>
      <UpdateUser
        isOpen={isOpen}
        closeModal={closeModal}
        viewUser={viewUser}
        mutateServer={allUsersSWR.mutateServer}
      />
    </>
  );
};

export default ManageUsers;
