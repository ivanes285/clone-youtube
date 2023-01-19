import { IVideo } from "@/intefaces/IVideo";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import moment from 'moment'
import { IUser } from "@/intefaces/IUser";
import axios from "axios";
import { format } from "timeago.js";

export interface CardInterfaceStyle {
  type?: string;
}
export interface CardInterface {
  type?: string;
  video?: IVideo;
}

const Container = styled.div<CardInterfaceStyle>`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img<CardInterfaceStyle>`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div<CardInterfaceStyle>`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img<CardInterfaceStyle>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card: React.FC<CardInterface> = ({ type, video }) => {
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
    const fecthData = async () => {
      const res = await axios.get(`http://localhost:4000/api/V1/users/${video!.userId}`);
      setChannel(res.data);
    };
    fecthData();
  }, [video!.userId]);

  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={video!.imgUrl} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img} />
          <Texts>
            <Title>{video!.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            {/* <Info>{video.views} views • {moment(video.createdAt,"YYYYMMDD").fromNow()}</Info> */}
            <Info>
              {video!.views} views • {format(video!.createdAt).toString()}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
