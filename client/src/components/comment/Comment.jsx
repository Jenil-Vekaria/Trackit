import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import TooltipAvatar from "../others/TooltipAvatar";

const Comment = ({ username, text }) => {
	const [isEditing, setisEditing] = useState(false);
	const [comment, setcomment] = useState(text);

	const onCommentEditSaveClick = () => {
		setisEditing((prev) => !prev);
		console.log(comment);
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
			<Popover>
				<PopoverTrigger>
					<IconButton
						aria-label="Edit comment"
						variant="link"
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
		</Box>
	);
};

export default Comment;
