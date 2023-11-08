import {
  Alert,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import CommentService from "@/services/comment-service";
import useApi from "@/hooks/useApi";
import { Permissions } from "@/util/Utils";
import {
  CreateCommentData,
  CreateCommentSchema,
} from "@/util/ValidationSchemas";
import PermissionsRender from "../others/PermissionsRender";
import Comment from "./Comment";

const CommentSection = ({ ticketId }) => {
  const [error, setError] = useState("");
  const commentsSWR = useApi(CommentService.getTicketComments(ticketId));

  const onComment = async (values, { resetForm }) => {
    try {
      await commentsSWR.mutateServer(
        CommentService.createTicketComment(ticketId, values)
      );
      resetForm();
      setError("");
    } catch (error) {
      console.log(error);
      setError(error);
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
        {commentsSWR.data ? (
          commentsSWR.data?.map((comment) => (
            <Comment
              key={comment._id}
              mutateServer={commentsSWR.mutateServer}
              setError={setError}
              commentData={comment}
            />
          ))
        ) : (
          <Center fontSize="sm" height="100%" color="inputLabel">
            No Comments
          </Center>
        )}
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
                    placeholder="Write a comment"
                    name="text"
                    type="text"
                    autoComplete="off"
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
