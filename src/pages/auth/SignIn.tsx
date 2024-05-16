import { useRef, useState } from 'react';
import Link from '../shared/Link';
import Input from '../shared/Input';
import Modal from '../shared/Modal';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useContext } from '../../context/Context';
import Button, { ButtonMode } from '../shared/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db, usersRef } from '../../firebase';
import { getDocs, query, where } from 'firebase/firestore';
import "./styles.css";

const MainContainer = styled.div`
  gap: 2rem;
  display: flex;
  padding: 5rem 2rem;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 5rem;
  font-weight: 500;
`;

const Form = styled.div`
  gap: 3rem;
  display: flex;
  padding: 3rem 4rem;
  flex-direction: column;
  background-color: rgba(208, 213, 255, 0.5);
`;

const TempA = styled(Link)`
  color: grey;
  font-size: 1.6rem;
  text-transform: none;
`;

const Navigate = styled(TempA)`
  align-self: center;
`;

const Forgot = styled(TempA)`
  align-self: end;
  margin-top: -3rem;
`;

function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useContext();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const onPressNavigate = () => navigate('/signup');

  const onPressButton = async () => {
    
    const pendingClassName = 'loading-btn--pending';
    const successClassName = 'loading-btn--success';
    const failClassName    = 'loading-btn--fail';
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    if(buttonRef.current?.classList.contains(pendingClassName)){
      return;
    }
    buttonRef.current?.classList.add(pendingClassName);
    
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const getUserrrrr = async () => {
      const q = query(usersRef, where("email", "==", email));
      const docSnap = await getDocs(q);
      docSnap.forEach((docc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(docc.id, " => ", docc.data());
        setUser({...docc.data(), id: docc.id})
      });
      buttonRef.current?.classList.remove(pendingClassName);
      buttonRef.current?.classList.add(successClassName);
      const removeSuccessss = async () => {
        await sleep(10);
        buttonRef.current?.classList.remove(successClassName);
      navigate('/');
  
      }
      removeSuccessss();
  
    };

    getUserrrrr();

    // const user = userCredential.user;
})
  .catch((error) => {
    
    buttonRef.current?.classList.remove(pendingClassName);
    buttonRef.current?.classList.add(failClassName);
    const setModalllll = async () => {
      setModal(true);
      await sleep(2000);
      buttonRef.current?.classList.remove(failClassName);
    }
    setModalllll();

    console.log(error)
  });

};

  const onModalPress = () => {
    setModal(false);
  };

  return (
    <MainContainer>
      <Modal
        title="Oops!"
        subtitle="Your email or password is incorrect. Please, try again."
        buttonTitle="okay"
        isVisible={modal}
        onPress={onModalPress}
      />
      <Title>Sign in</Title>
      <Form>
        <Input
          must={false}
          type="email"
          value={email}
          title="E-mail"
          onChange={setEmail}
          placeholder="example@mail.com"
        />
        <Input
          must={false}
          type="password"
          value={password}
          title="Password"
          onChange={setPassword}
          placeholder="Enter your password"
        />
        <Forgot>Forgot password?</Forgot>
        {/* <Button onClick={onPressButton} mode={ButtonMode.PRIMARY}>
          sign in
        </Button> */}
        <span className="loading-btn-wrapper" onClick={onPressButton}>
          <button className="loading-btn js_success-animation-trigger" ref={buttonRef}>
            <span className="loading-btn__text">
              Sign In
            </span>
          </button>
        </span>


        <Navigate onClick={onPressNavigate}>
          Don't have an account? Sign up
        </Navigate>
      </Form>
    </MainContainer>
  );
}

export default SignIn;
