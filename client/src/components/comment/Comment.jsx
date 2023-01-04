import React, { useState } from "react";
import {
	Box,
	Flex,
	Input,
	Text,
	IconButton,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	Button,
	Spacer,
	useDisclosure,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import TooltipAvatar from "../others/TooltipAvatar";
import AuthService from "../../services/auth-service";
import CommentService from "../../services/comment-service";

//_id = commentId

const Comment = ({
	_id,
	ticketId,
	username,
	text,
	userId,
	getTicketComments,
}) => {
	const [isEditing, setisEditing] = useState(false);
	const [comment, setcomment] = useState(text);
	const { isOpen, onToggle, onClose } = useDisclosure();
	const signedInUserId = AuthService.getCurrentUser()?._id;
	const isSignedInUsersComment = userId === signedInUserId;

	const onCommentEditSaveClick = async () => {
		if (isEditing) {
			try {
				await CommentService.updateTicketComment(_id, { text: comment });
			} catch (error) {
				console.log(error);
			}
		}

		onClose();
		setisEditing((prev) => !prev);
	};

	const onCommentDeleteClick = async () => {
		onClose();
		await CommentService.deleteTicketComment(_id);
		getTicketComments();
	};

	return (
		<Box
			display="flex"
			alignItems="center"
			gap={3}
			p={3}
			boxShadow="xs"
			width="100%"
		>
			<TooltipAvatar name={username} size="sm" />
			{isEditing ? (
				<Input
					name="comment"
					value={comment}
					onChange={(e) => setcomment(e.target.value)}
				/>
			) : (
				<Text fontSize="sm">{comment}</Text>
			)}
			<Spacer />

			{isSignedInUsersComment ? (
				<Popover isOpen={isOpen}>
					<PopoverTrigger>
						<IconButton
							aria-label="Edit comment"
							variant="link"
							onClick={onToggle}
							icon={<BsThreeDotsVertical />}
						/>
					</PopoverTrigger>
					<PopoverContent w="fit-content">
						<PopoverBody>
							<Flex direction="column" alignItems="start">
								<Button variant="link" onClick={onCommentEditSaveClick}>
									{isEditing ? "Save" : "Edit"}
								</Button>
								<Button variant="link" onClick={onCommentDeleteClick}>
									Delete
								</Button>
							</Flex>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			) : null}
		</Box>
	);
};

export default Comment;
