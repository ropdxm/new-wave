import { useRef, useState } from 'react';
import Link from '../../shared/Link';
import styled from 'styled-components';
import Input from '../../shared/Input';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonMode } from '../../shared/Button';
import "../styles.css";
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../../firebase';

const MainContainer = styled.div`
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Title = styled.p`
  font-size: 5rem;
  font-weight: 500;
`;

const Form = styled.div`
  gap: 3rem;
  display: flex;
  flex-direction: column;
  padding: 3rem 4rem;
  background-color: rgba(208, 213, 255, 0.5);
`;

const Navigate = styled(Link)`
  text-transform: none;
  font-size: 1.6rem;
  color: grey;
  align-self: center;
`;

const PasswordValidation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface CheckProps {
  check: boolean;
}

const Check = styled.p<CheckProps>`
  font-size: 0.1.6rem;
  color: ${(props) => (props.check ? 'green' : 'red')};
`;

const pendingClassName = 'loading-btn--pending';
const successClassName = 'loading-btn--success';
const failClassName    = 'loading-btn--fail';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));


function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showValidation, setShowValidation] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const onSelect = () => setShowValidation(true);

  const doesContainNumber = () => {
    return /(?=.*[0-9])/.test(password);
  };

  const doesContainCharacter = () => {
    return /(?=.*[^\w\s])/.test(password);
  };

  const doesContainLowerLetter = () => {
    return /(?=.*[a-z])/.test(password);
  };

  const doesContainUpperLetter = () => {
    return /(?=.*[A-Z])/.test(password);
  };

  const checkLength = () => {
    return /[0-9a-zA-Z^\w\s].{8,}/.test(password);
  };

  const checkPassword = () => {
    return (
      doesContainNumber() &&
      doesContainCharacter() &&
      doesContainLowerLetter() &&
      doesContainUpperLetter() &&
      checkLength()
    );
  };

  const onPressButton = async () => {
    buttonRef.current?.classList.add(pendingClassName);

    const q = query(usersRef, where("email", "==", email));
    const docSnap = await getDocs(q);

    if(docSnap.size>0){
      buttonRef.current?.classList.remove(pendingClassName);
      buttonRef.current?.classList.add(failClassName);
      const setModalllll = async () => {
        alert("Account already exists");
        await sleep(2000);
        buttonRef.current?.classList.remove(failClassName);
      }
      setModalllll();
    }else{
      buttonRef.current?.classList.remove(pendingClassName);
      buttonRef.current?.classList.add(successClassName);
      const removeSuccessss = async () => {
        await sleep(1000);
        buttonRef.current?.classList.remove(successClassName);
        checkPassword() &&
        navigate('/fullsignupform', { state: { email, password, edit: false } });
    
      }
      removeSuccessss();

    }
};

  const OnBlur = () => {
    // refetch();
    // if (error && !loading) {
    //   console.log('apollo server error (onBlur)');
    // }
    // if (!error && !loading && data) {
    //   return data.checkEmail;
    // }
  };

  const onPressNavigate = () => navigate('/signin');

  return (
    <MainContainer>
      <Title>Sign up</Title>
      <Form>
        <Input
          must={false}
          type="email"
          title="E-mail"
          value={email}
          onChange={setEmail}
          // onBlur={OnBlur}
          placeholder="example@mail.com"
        />
        <Input
          must={false}
          type="password"
          title="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          onSelect={onSelect}
        />
        {showValidation && (
          <PasswordValidation>
            <Check check={doesContainNumber()}>1 number</Check>
            <Check check={doesContainUpperLetter()}>1 big letter</Check>
            <Check check={doesContainLowerLetter()}>1 small letter</Check>
            <Check check={doesContainCharacter()}>
              1 special character (example: !@.,#$%^&*"')
            </Check>
            <Check check={checkLength()}>Minimum 8 characters</Check>
          </PasswordValidation>
        )}
        {/* <Button onClick={onPressButton} mode={ButtonMode.PRIMARY}>
          sign up
        </Button> */}
        <span className="loading-btn-wrapper" onClick={onPressButton}>
          <button className="loading-btn js_success-animation-trigger" ref={buttonRef}>
            <span className="loading-btn__text">
              Sign Up
            </span>
          </button>
        </span>

        <Navigate onClick={onPressNavigate}>
          Already have an account? Sign in
        </Navigate>
      </Form>
    </MainContainer>
  );
}

export default SignIn;
