import {
	Card,
	CardBody,
	Center,
	Icon,
	Stat,
	StatLabel,
	StatNumber,
	useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const StatCard = ({ iconBackground, iconColor, icon, name, value }) => {
	return (
		<Card
			direction="row"
			align="center"
			px={2}
			flex="1"
			boxShadow="xs"
			background={useColorModeValue("whiteAlpha.900")}
		>
			<Center background={iconBackground} borderRadius={5} p={1}>
				<Icon as={icon} w={7} h={7} color={iconColor} />
			</Center>
			<CardBody>
				<Stat alignContent="center">
					<StatLabel>{name}</StatLabel>
					<StatNumber>{value}</StatNumber>
				</Stat>
			</CardBody>
		</Card>
	);
};

export default StatCard;
