import { Button, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import MiscellaneousService from "@/services/miscellaneous-service";
import useApi from "@/hooks/useApi";
import { MANAGE_ROLES } from "../../util/TableDataDisplay";
import Table from "../others/Table";
import CreateRole from "./CreateRole";

const ManageRoles = () => {
  const allRolesSWR = useApi(MiscellaneousService.getRoles());
  const [viewRole, setViewRole] = useState(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onRoleClick = (rowProps, _) => {
    setViewRole(rowProps.data);
    onOpen();
  };

  const closeModal = () => {
    setViewRole(null);
    onClose();
  };

  return (
    <>
      <Table
        tableData={allRolesSWR.data}
        columns={MANAGE_ROLES}
        rowHeight={null}
        onRowClick={onRoleClick}
        height={420}
        searchPlaceholder="Search for role"
      />
      <br />
      <Spacer />
      <Flex justify="flex-end">
        <Button colorScheme="blue" pos="right" onClick={() => onOpen()}>
          Add Role
        </Button>
      </Flex>

      <CreateRole
        isOpen={isOpen}
        onClose={closeModal}
        role={viewRole}
        mutateServer={allRolesSWR.mutateServer}
      />
    </>
  );
};

export default ManageRoles;
