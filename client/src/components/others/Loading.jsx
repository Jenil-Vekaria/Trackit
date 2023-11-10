import { Center, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center w="100%">
      <Spinner color="white" size="xl" />
    </Center>
  );
};

export default Loading;
