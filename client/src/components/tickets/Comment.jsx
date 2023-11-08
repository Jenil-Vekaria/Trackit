import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import AuthService from "@/services/auth-service";
import CommentService from "@/services/comment-service";
import { Permissions, getUserFullname } from "@/util/Utils";
import PermissionsRender from "../others/PermissionsRender";

const Comment = ({ mutateServer, commentData, setError }) => {
  const [isEditing, setisEditing] = useState(false);
  const [comment, setcomment] = useState(commentData.text);
  const { isOpen, onToggle, onClose } = useDisclosure();

  const signedInUserId = AuthService.getCurrentUser()?._id;
  const isMyComment = commentData.userId._id === signedInUserId;
  const isCommentEdited = commentData.createdOn !== commentData.updatedOn;

  const onCommentEditSaveClick = async () => {
    setisEditing((prev) => !prev);
    onClose();

    if (isEditing) {
      try {
        await mutateServer(
          CommentService.updateTicketComment(commentData._id, {
            text: comment,
          })
        );
        onClose();
        setError("");
      } catch (error) {
        setError(error);
      }
    }
  };

  const onCommentDeleteClick = async () => {
    try {
      onClose();
      await mutateServer(CommentService.deleteTicketComment(commentData._id));
    } catch (error) {
      setError(error);
    }
  };

  const getCommentDateTime = () => {
    const now = moment();
    const end = moment(commentData.updatedOn);
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
      <Avatar name={getUserFullname(commentData.userId)} size="sm" />
      <Flex direction="column" width="100%">
        <Flex gap={3}>
          <Text fontSize="sm" as="b">
            {getUserFullname(commentData.userId)}
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
        {isMyComment ? (
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
