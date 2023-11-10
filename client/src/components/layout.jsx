import { useRouter } from "next/router";
import Auth from "@/pages/auth";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AuthService from "@/services/auth-service";
import Loading from "./others/Loading";
import Navbar from "./others/navigationBar/Navbar";

const Layout = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);

    const authorized = AuthService.isAuthorized();
    setIsAuthorized(authorized);

    setTimeout(() => {
      setIsLoading(false);
      if (!authorized) {
        router.replace("/");
      }
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
