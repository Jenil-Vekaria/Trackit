import {
	Flex,
	Input,
	IconButton,
	InputGroup,
	InputRightElement,
	FormControl,
	FormErrorMessage,
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
		try {
			await CommentService.createTicketComment(ticketId, values);
			resetForm();
			getTicketComments();
		} catch (error) {
			console.log(error);
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
						{...comment}
					/>
				))}
			</Flex>

			<PermissionsRender permissionCheck={Permissions.canManageComments}>
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
											colorScheme="purple"
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
