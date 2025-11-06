import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Auth: React.FC = () => {
  return (
    <>
      <Header></Header>
      <LoginForm></LoginForm>
      <RegisterForm></RegisterForm>
    </>
  );
};

export default Auth;
