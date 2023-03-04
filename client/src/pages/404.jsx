import { Center } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import pageNotFound from "../assests/page_not_found.svg";

const PageNotFound = () => {
	return (
		<Center width="100%">
			<Head>
				<title>Page not found</title>
			</Head>
			<Image src={pageNotFound} width={450} />
		</Center>
	);
};

export default PageNotFound;
