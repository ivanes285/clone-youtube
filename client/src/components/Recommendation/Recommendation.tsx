import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '../Card';
import { IVideo } from '@/intefaces/IVideo';
export interface RecommendationInterface {
	tags: string[];
}
const Container = styled.div`
  flex: 2;
`;
const Recommendation : React.FC<RecommendationInterface> = ({tags}) => {
	const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/api/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);
	return (
		<Container>
		  {videos.map((video) => (
			<Card type="sm" key={video._id} video={video} />
		  ))}
		</Container>
	  );
};

export default Recommendation;
