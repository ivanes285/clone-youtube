import { IComment } from "@/intefaces/IComment";
import { AppStore } from "@/redux/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import Comment from "../Comment/Comment";
export interface CommentsInterface {
  videoId: string;
}

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments: React.FC<CommentsInterface> = ({ videoId }) => {
  const { currentUser } = useSelector((state: AppStore) => state.user);
  const [comments, setComments] = useState<IComment[]>([]);
  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await axios.get(`/api/comments/${videoId}`);
        setComments(res.data);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };
    fecthData();
  }, []);

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
