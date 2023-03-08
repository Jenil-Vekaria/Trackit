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
	Avatar,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import AuthService from "../../services/auth-service";
import CommentService from "../../services/comment-service";
import moment from "moment";
import PermissionsRender from "../others/PermissionsRender";
import { Permissions } from "../../util/Utils";

const Comment = ({
	_id,
	username,
	text,
	userId,
	getTicketComments,
	updatedOn,
	createdOn,
	seterror,
}) => {
	const [isEditing, setisEditing] = useState(false);
	const [comment, setcomment] = useState(text);
	const { isOpen, onToggle, onClose } = useDisclosure();
	const signedInUserId = AuthService.getCurrentUser()?._id;
	const isSignedInUsersComment = userId === signedInUserId;
	const isCommentEdited = createdOn !== updatedOn;

	const onCommentEditSaveClick = async () => {
		seterror("");
		if (isEditing) {
			try {
				await CommentService.updateTicketComment(_id, { text: comment });
				getTicketComments();
			} catch (error) {
				seterror(error);
			}
		}

		onClose();
		setisEditing((prev) => !prev);
	};

	const onCommentDeleteClick = async () => {
		seterror("");
		try {
			onClose();
			await CommentService.deleteTicketComment(_id);
			getTicketComments();
		} catch (error) {
			seterror(error);
		}
	};

	const getCommentDateTime = () => {
		const now = moment();
		const end = moment(updatedOn);
		const duration = moment.duration(now.diff(end));
		const days = duration.asDays();

		if (days >= 1) {
			return end.format("MMM D, YYYY hh:mm A");
		} else {
			return end.fromNow();
		}
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
			<Avatar name={username} size="sm" />
			<Flex direction="column" width="100%">
				<Flex gap={3}>
					<Text fontSize="sm" as="b">
						{username}
					</Text>
					<Text fontSize="sm" color="gray" align="right">
						{getCommentDateTime()} {isCommentEdited ? "(Edited)" : ""}
					</Text>
				</Flex>
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
			</Flex>

			<PermissionsRender permissionCheck={Permissions.canManageTickets}>
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
			</PermissionsRender>
		</Box>
	);
};

export default Comment;
