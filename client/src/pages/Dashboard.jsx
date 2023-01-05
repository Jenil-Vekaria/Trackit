import {
	Box,
	Center,
	Flex,
	Heading,
	Spinner,
	useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
	BsFillFileTextFill,
	BsPersonFill,
	BsQuestionLg,
	BsPersonCheckFill,
} from "react-icons/bs";
import { useParams } from "react-router-dom";
import StatCard from "../components/others/StatCard";
import ProjectService from "../services/project-service";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	Colors,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import MiscellaneousService from "../services/miscellaneous-service";
import { hexToRgb } from "../util/Utils";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const Dashboard = () => {
	const { projectID } = useParams();

	const [projectStats, setProjectStats] = useState([]);
	const [ticketTypeChartData, setTicketTypeChartData] = useState(null);
	const [ticketStatusChartData, setTicketStatusChartData] = useState(null);
	const [isLoading, setisLoading] = useState(true);
	const iconColor = useColorModeValue("white");

	const iconBackground = [
		useColorModeValue("purple.300"),
		useColorModeValue("green.300"),
		useColorModeValue("red.300"),
		useColorModeValue("blue.300"),
	];

	const createStatInfo = (stat) => {
		return [
			{
				name: "Total Tickets",
				icon: BsFillFileTextFill,
				iconBackground: iconBackground[0],
				iconColor,
				value: stat.ticketCount,
			},
			{
				name: "My Tickets",
				icon: BsPersonFill,
				iconBackground: iconBackground[1],
				iconColor,
				value: stat.myTicketCount,
			},
			{
				name: "Unassigned Tickets",
				icon: BsQuestionLg,
				iconBackground: iconBackground[2],
				iconColor,
				value: stat.unassignedTicketCount,
			},
			{
				name: "Assigned Tickets",
				icon: BsPersonCheckFill,
				iconBackground: iconBackground[3],
				iconColor,
				value: stat.assignedTicketCount,
			},
		];
	};

	const createTicketTypeChartData = (stat) => {
		const data = {
			labels: [],
			datasets: [
				{
					label: "Ticket Type",
					data: [],
					backgroundColor: [],
					borderColor: [],
				},
			],
		};

		stat.ticketTypeCount.forEach((ticketType) => {
			data.datasets[0].data.push(ticketType.value);

			const ticketTypeInfo = MiscellaneousService.getTicketTypeInfo(
				ticketType._id,
			);
			const backgroundColour = hexToRgb(ticketTypeInfo.colour, 1);

			data.labels.push(ticketTypeInfo.name);
			data.datasets[0].backgroundColor.push(backgroundColour);
			data.datasets[0].borderColor.push("rgba(255,255,255,1)");
		});

		return data;
	};

	const createTicketStatusChartData = (stat) => {
		const data = {
			labels: [],
			datasets: [
				{
					label: "Ticket Status",
					data: [],
					backgroundColor: [],
					borderColor: [],
				},
			],
		};

		stat.ticketStatusCount.forEach((ticketStatus, index) => {
			data.datasets[0].data.push(ticketStatus.value);
			data.labels.push(ticketStatus._id);

			let backgroundColour = "";

			switch (ticketStatus._id) {
				case "Open":
					backgroundColour = hexToRgb("#FBD38D", 1);
					break;
				case "In-Progress":
					backgroundColour = hexToRgb("#90CDF4", 1);
					break;
				case "Done":
					backgroundColour = hexToRgb("#68D391", 1);
					break;
				case "Archived":
					backgroundColour = hexToRgb("#E2E8F0", 1);
					break;
				default:
					backgroundColour = hexToRgb("#FBD38D", 1);
					break;
			}

			data.datasets[0].backgroundColor.push(backgroundColour);
			data.datasets[0].borderColor.push("rgba(255,255,255,1)");
		});

		return data;
	};

	const getProjectStats = async () => {
		const stat = await ProjectService.getProjectStats(projectID);
		setProjectStats(createStatInfo(stat));
		setTicketTypeChartData(createTicketTypeChartData(stat));
		setTicketStatusChartData(createTicketStatusChartData(stat));

		setTimeout(() => setisLoading(false), 100);
	};

	useEffect(() => {
		getProjectStats();
	}, [projectID]);

	return (
		<Flex w="100%" direction="column">
			<Flex w="100%" grow="2" justifyContent="space-evenly" gap={3}>
				{projectStats.map((stat) => (
					<StatCard {...stat} />
				))}
			</Flex>
			<br />

			{isLoading ? (
				<Center w="100%">
					<Spinner color="purple" size="xl" />
				</Center>
			) : (
				<Flex h="100%" justifyContent="space-evenly">
					{ticketTypeChartData ? (
						<Box w={400} h={400} align="center">
							<Heading as="h5" size="md">
								Ticket Type
							</Heading>
							<Pie
								data={ticketTypeChartData}
								options={{ plugins: { colors: { enabled: true } } }}
							/>
						</Box>
					) : null}

					{ticketStatusChartData ? (
						<Box w={400} h={400} align="center">
							<Heading as="h5" size="md">
								Ticket Status
							</Heading>
							<Pie
								data={ticketStatusChartData}
								options={{ plugins: { colors: { enabled: true } } }}
							/>
						</Box>
					) : null}
				</Flex>
			)}
		</Flex>
	);
};

export default Dashboard;
