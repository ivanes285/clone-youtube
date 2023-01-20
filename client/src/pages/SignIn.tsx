import { ErrorNotification } from "@/components";
import { loginFailure, loginStart, loginSuccess } from "@/redux/userSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";

interface ISignIn {
  email: string;
  password: string;
}

interface ISignUp {
  name: string;
  email: string;
  password: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
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

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const [signin, setSignin] = useState<ISignIn>({ email: "", password: "" });
  const [signup, setSignup] = useState<ISignUp>({ name: "", email: "", password: "" });

  const handleChangeSignin = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target;
   setSignin({ ...signin, [name]: value})
  };

  const handleChangeSignup = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setSignup({ ...signup, [name]: value})
  };

  const handleLogin =async (e:any) => {
    e.preventDefault();
    dispatch(loginStart()) 
    try {
      axios.defaults.withCredentials = true
      const res = await axios.post("http://localhost:4000/api/v1/users/signin", signin);
      dispatch(loginSuccess(res.data))
      toast.success("Login success")
    } catch (error:any) {
      dispatch(loginFailure())
      toast.error(error.response.data.message);
    }
    
  }


  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to Dev Ivanes</SubTitle>
        <Input name="email" type="email" placeholder="email"  required onChange={handleChangeSignin}/>
        <Input name="password" type="password" placeholder="password" required onChange={handleChangeSignin}/>
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Input name="name" placeholder="username"  onChange={handleChangeSignup}/>
        <Input name="email" placeholder="email" onChange={handleChangeSignup}/>
        <Input name="password" type="password" placeholder="password" onChange={handleChangeSignup}/>
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
      <ErrorNotification position={"top-right"}/>
    </Container>
  );
};

export default SignIn;
