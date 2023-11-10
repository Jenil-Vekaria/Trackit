import { useRouter } from "next/router";
import Auth from "@/pages/auth";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AuthService from "@/services/auth-service";
import Navbar from "./others/navigationBar/Navbar";

const Layout = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const authorized = AuthService.isAuthorized();
    setIsAuthorized(authorized);

    if (!authorized) {
      router.replace("/");
    }
  }, []);

  if (!isAuthorized) {
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
