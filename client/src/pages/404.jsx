import Head from "next/head";
import Image from "next/image";
import { Center } from "@chakra-ui/react";
import React from "react";
import pageNotFound from "@/assets/page_not_found.svg";

const PageNotFound = () => {
  return (
    <Center width="100%">
      <Head>
        <title>Page not found</title>
      </Head>
      <Image src={pageNotFound} width={450} alt="404 Page Not Found" />
    </Center>
  );
};

export default PageNotFound;
