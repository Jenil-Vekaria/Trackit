import { useRouter } from "next/router";
import Auth from "@/pages/auth";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AuthService from "@/services/auth-service";
import Navbar from "./navigationBar/Navbar";

const Layout = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(AuthService.isAuthorized());

  const router = useRouter();

  useEffect(() => {
    setIsAuthorized(AuthService.isAuthorized());
  }, []);

  if (!isAuthorized) {
    router.push("/");
    return <Auth />;
  }

  return (
    <Flex w="100vw">
      <Navbar />
      {children}
    </Flex>
  );
};

export default Layout;
