import { Image, Center } from "@chakra-ui/react";
import React from "react";
import pageNotFound from "../../assests/page_not_found.svg";

const PageNotFound = () => {
	return (
		<Center width="100%">
			<Image src={pageNotFound} boxSize="450px" />
		</Center>
	);
};

export default PageNotFound;
