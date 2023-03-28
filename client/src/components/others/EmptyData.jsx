import { Center, Image, Text } from "@chakra-ui/react";
import React from "react";
import empty from "@/assets/empty.svg";

const EmptyData = () => {
  return (
    <Center width="100%" height="100%" flexDir="column">
      <Image src={empty} boxSize="150px" alt="Empty Data" />
      <Text fontSize="2xl" as="samp">
        No Data
      </Text>
    </Center>
  );
};

export default EmptyData;
