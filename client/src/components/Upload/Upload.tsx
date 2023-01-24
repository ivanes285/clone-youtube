import app from '@/Auth/firebase';
import axios from 'axios';
import {getDownloadURL,getStorage,ref,uploadBytesResumable} from "firebase/storage";  //?https://firebase.google.com/docs/storage/web/upload-files
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

export interface UploadInterface {
	setOpen: (open: boolean) => void;
}


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;

const Upload : React.FC<UploadInterface> = ({setOpen}) => {

	const [img, setImg] = useState<File | undefined>(undefined);
	const [video, setVideo] = useState<File | undefined>(undefined);
	const [imgPerc, setImgPerc] = useState<number>(0);
	const [videoPerc, setVideoPerc] = useState<number>(0);
	const [inputs, setInputs] = useState({});
	const [tags, setTags] = useState<string[]>([]);
  
	const navigate = useNavigate()

	const handleChange = (e:any) => {
	  setInputs((prev) => {
		return { ...prev, [e.target.name]: e.target.value };
	  });
	};

	const handleImg = (e: React.ChangeEvent<HTMLInputElement>)=>{
		setImg(e.target.files![0]);
	}

	const handleVideo = (e: React.ChangeEvent<HTMLInputElement>)=>{
		setVideo(e.target.files![0]);
	}
  
	const handleTags = (e: React.ChangeEvent<HTMLInputElement> ) => {
	  setTags(e.target.value.split(","));
	};

	const uploadFile = (file: File , urlType:any) => {
	  const storage = getStorage(app);
	  const fileName = new Date().getTime() + file.name;
	  const storageRef = ref(storage, fileName);
	  const uploadTask = uploadBytesResumable(storageRef, file);
  
	  uploadTask.on("state_changed",(snapshot: any) => {
		  const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		  urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
		  switch (snapshot.state) {
			case "paused":
			  console.log("Upload is paused");
			  break;
			case "running":
			  console.log("Upload is running");
			  break;
			default:
			  break;
		  }
		},
		(error: any) => {},

		() => {
		  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
			setInputs((prev) => {
			  return { ...prev, [urlType]: downloadURL };
			});
		  });
		}
	  );
	};
  
	useEffect(() => {
	  video && uploadFile(video , "videoUrl");
	}, [video]);
  
	useEffect(() => {
	  img && uploadFile(img, "imgUrl");
	}, [img]);
  
	const handleUpload = async (e:any )=>{
	  e.preventDefault();
	  const res = await axios.post("/api/videos", {...inputs, tags})
	  setOpen(false)
	  res.status===200 && navigate(`/video/${res.data._id}`)
	}
  
	return (
		<Container>
		  <Wrapper>
			<Close onClick={() => setOpen(false)}>X</Close>
			<Title>Upload a New Video</Title>
			<Label>Video:</Label>
			{videoPerc > 0 ? (
			  "Uploading:" + videoPerc + "%"
			) : (
			  <Input type="file" accept="video/*" onChange={handleVideo} />
			)}
			<Input type="text" placeholder="Title" name="title" onChange={handleChange}/>
			<Desc placeholder="Description" name="desc"rows={8} onChange={handleChange} />
			<Input type="text" placeholder="Separate the tags with commas."  onChange={handleTags}/>
			<Label>Image:</Label>
			{imgPerc > 0 ? (
			  "Uploading:" + imgPerc + "%"
			) : (
			  <Input type="file" accept="image/*"onChange={handleImg} />
			)}
			<Button onClick={handleUpload}>Upload</Button>
		  </Wrapper>
		</Container>
	  );
};

export default Upload;
