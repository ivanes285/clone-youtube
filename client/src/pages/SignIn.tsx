import { ErrorNotification } from "@/components";
import { loginFailure, loginStart, loginSuccess } from "@/redux/userSlice";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { auth, gitHubAuthProvider, googleAuthProvider } from "../Auth/firebase";
 axios.defaults.withCredentials = true // ? Important for cookies to work You can also add it to each request individually {withCredentials: true}

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
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 3px;
  border: none;
  font-size: 14px;
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
    setSignin({ ...signin, [name]: value });
  };

  const handleChangeSignup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
    
      const res = await axios.post("/api/users/signin", signin);
      dispatch(loginSuccess(res.data));
      toast.success("Login success");
    } catch (error: any) {
      dispatch(loginFailure());
      toast.error(error.response.data.message);
    }
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/signup", signup);
      toast.success(res.data.message);
      setSignup({ name: "", email: "", password: "" });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };


  //TODO: Read in https://console.firebase.google.com/u/0/project/clone-auth-5e1a1/authentication/providers?hl=es-419 for more info (Auth with Google, GitHub )

  const signInWhithGoogle = async () => {
    dispatch(loginStart());
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      const response = await axios.post("/api/auth/google", {
        name: user.displayName,
        email: user.email,
        password: user.uid,
        img: user.photoURL,
        fromGoogle: true
      });
      dispatch(loginSuccess(response.data));
      toast.success("Login success with Google");
    } catch (error: any) {
      dispatch(loginFailure());
      toast.error(error.response.data.message);
    }
  };

  //TODO: Read in https://github.com/settings/developers for more info (Auth with GitHub)
  const signInWhithGitHub = async () => {
    dispatch(loginStart());
    try {
      const result = await signInWithPopup(auth, gitHubAuthProvider);
      const user = result.user.providerData[0];
  
      const re=await axios.get("/api/users")
     console.log("respuestaa",re.data);
      const response = await axios.post("/api/auth/google", {
        name: user.displayName,
        email: user.email,
        password: user.uid,
        img: user.photoURL,
        fromGitHub: true
      });
       dispatch(loginSuccess(response.data));
      toast.success("Login success with GitHub");
    } catch (error: any) {
      dispatch(loginFailure());
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to Dev Ivanes</SubTitle>
        <Input name="email" type="email" placeholder="email" required onChange={handleChangeSignin} />
        <Input name="password" type="password" placeholder="password" required onChange={handleChangeSignin} />
        <Button onClick={handleLogin}>
          Sign in <VpnKeyIcon />{" "}
        </Button>
        <Button onClick={signInWhithGoogle}>
          Sign in with Google
          <GoogleIcon />
        </Button>
        <Button onClick={signInWhithGitHub}>
          Sign in with GitHub
          <GitHubIcon />
        </Button>
        <Title>or</Title>
        <Input name="name" placeholder="username" onChange={handleChangeSignup} value={signup.name}/>
        <Input name="email" placeholder="email" onChange={handleChangeSignup} value={signup.email}/>
        <Input name="password" type="password" placeholder="password" onChange={handleChangeSignup} value={signup.password}/>
        <Button onClick={handleSignUp}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
      <ErrorNotification position={"top-right"} />
    </Container>
  );
};

export default SignIn;
