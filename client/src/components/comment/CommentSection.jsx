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

const CommentSection = ({ ticketId }) => {
	const [comments, setComments] = useState([]);

	const getComments = async () => {
		if (ticketId) {
			const comments = await CommentService.fetchTicketComments(ticketId);
			setComments(comments);
		}
	};
	useEffect(() => {
		getComments();
	}, []);

	const onCommentEditClick = () => {};

	const onComment = async (values, { resetForm }) => {
		try {
			await CommentService.createTicketComment(ticketId, values);
			resetForm();
			getComments();
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
					<Comment onCommentEditClick={onCommentEditClick} {...comment} />
				))}
			</Flex>

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
		</Flex>
	);
};

export default CommentSection;
