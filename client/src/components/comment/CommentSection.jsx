import {
	Flex,
	Input,
	IconButton,
	InputGroup,
	InputRightElement,
	FormControl,
	FormErrorMessage,
	Alert,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
	CreateCommentData,
	CreateCommentSchema,
} from "../../util/ValidationSchemas";
import { IoMdSend } from "react-icons/io";
import Comment from "./Comment";
import CommentService from "../../services/comment-service";
import PermissionsRender from "../others/PermissionsRender";
import { Permissions } from "../../util/Utils";

const CommentSection = ({ ticketId }) => {
	const [comments, setComments] = useState([]);
	const [error, seterror] = useState("");

	const getTicketComments = async () => {
		if (ticketId) {
			const comments = await CommentService.getTicketComments(ticketId);
			setComments(comments);
		}
	};

	useEffect(() => {
		getTicketComments();
	}, []);

	const onComment = async (values, { resetForm }) => {
		seterror("");

		try {
			await CommentService.createTicketComment(ticketId, values);
			resetForm();
			getTicketComments();
		} catch (error) {
			seterror(error);
		}
	};
	return (
		<Flex width="100%" direction="column">
			<Flex
				direction="column"
				width="100%"
				gap={3}
				height="310px"
				overflowY="auto"
				mb={4}
			>
				{comments.map((comment) => (
					<Comment
						key={comment._id}
						getTicketComments={getTicketComments}
						seterror={seterror}
						{...comment}
					/>
				))}
			</Flex>
			{error && (
				<Alert status="error" variant="left-accent" mb={2} fontSize="sm">
					{error}
				</Alert>
			)}
			<PermissionsRender permissionCheck={Permissions.canManageTickets}>
				<Formik
					initialValues={CreateCommentData}
					validationSchema={CreateCommentSchema}
					onSubmit={onComment}
				>
					{({ errors, touched }) => (
						<Form>
							<FormControl isInvalid={errors.text && touched.text}>
								<InputGroup>
									<Field
										as={Input}
										placeholder="Comment"
										name="text"
										type="text"
									/>
									<InputRightElement width="fit-content">
										<IconButton
											size="sm"
											variant="link"
											colorScheme="blue"
											icon={<IoMdSend size={20} />}
											type="submit"
										/>
									</InputRightElement>
								</InputGroup>
								<FormErrorMessage>{errors.text}</FormErrorMessage>
							</FormControl>
						</Form>
					)}
				</Formik>
			</PermissionsRender>
		</Flex>
	);
};

export default CommentSection;
