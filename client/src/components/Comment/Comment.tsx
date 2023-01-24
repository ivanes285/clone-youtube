import { IComment } from '@/intefaces/IComment';
import { IUser } from '@/intefaces/IUser';
import { AppStore } from '@/redux/store';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
export interface CommentInterface {
  comment:IComment
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment : React.FC<CommentInterface> = ({comment}) => {
  const { currentUser } = useSelector((state: AppStore) => state.user);
  
  const [channel, setChannel] = useState<IUser>({
    _id: "",
    name: "",
    email: "",
    password: "",
    img: "",
    suscribers: 0,
    suscribedUsers: [],
  });

  useEffect(() => {
    const fecthComments = async () => {
      try {
        const res = await axios.get(`/api/users/${comment.userId}`);
        setChannel(res.data);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };
    fecthComments();
  }, [comment.userId]);
  
	return (
		<Container>
		  <Avatar src={channel.img} />
		  <Details>
			<Name>
			  {channel.name} <Date> 1 day ago</Date>
			</Name>
			<Text>
			  {comment.desc}
			</Text>
		  </Details>
		</Container>
	  );
};

export default Comment;
