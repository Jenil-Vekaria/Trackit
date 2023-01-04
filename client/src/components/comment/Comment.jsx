import React, { useState, useRef } from "react";
import {
	Box,
	Flex,
	Input,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
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

const Comment = ({ username, text, userId }) => {
	const [isEditing, setisEditing] = useState(false);
	const [comment, setcomment] = useState(text);
	const { isOpen, onToggle, onClose } = useDisclosure();
	const signedInUserId = AuthService.getCurrentUser()?._id;
	const isSignedInUsersComment = userId === signedInUserId;

	const onCommentEditSaveClick = () => {
		onClose();
		setisEditing((prev) => !prev);
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
								<Button variant="link">Delete</Button>
							</Flex>
						</PopoverBody>
					</PopoverContent>
				</Popover>
			) : null}
		</Box>
	);
};

export default Comment;
