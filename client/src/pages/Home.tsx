import { IVideo } from "@/intefaces/IVideo";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import Card from "../components/Card/Card";
import { ErrorNotification } from "@/components";

export interface HomeInterface {
  type: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home: React.FC<HomeInterface> = ({ type }) => {
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await axios.get(`/api/videos/${type}`);
        setVideos(res.data);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };
    fecthData();
  }, [type]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
      <ErrorNotification position={"top-right"}/>
    </Container>
  );
};

export default Home;
