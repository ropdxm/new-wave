import styled from 'styled-components';
import Button, { ButtonMode } from './Button';
import { useContext } from '../../context/Context';
import Link from './Link';
import { useNavigate } from 'react-router-dom';

const MainContainer = styled.div`
  height: 8vh;
  width: 100%;
  z-index: 10;
  display: flex;
  position: fixed;
  flex-wrap: wrap;
  align-items: center;
  background-color: white;
  justify-content: space-evenly;
  border-bottom: 0.2rem solid #0013bc;
`;

const Logo = styled(Link)`
  font-size: 2.4rem;
  font-weight: 700;
`;

const LinksContainer = styled.div`
  gap: 5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext();

  const NavBarLink = () => navigate('/');

  const LogOut = () => {
    navigate('/');
    localStorage.removeItem('user');
  };

  return (
    <MainContainer>
      <Logo onClick={NavBarLink}>new wave</Logo>
      <LinksContainer>
        <Link href="#about" onClick={NavBarLink}>
          about us
        </Link>
        <Link href="#takeaction" onClick={NavBarLink}>
          take action!
        </Link>
        <Link href="#community" onClick={NavBarLink}>
          community
        </Link>
        <Link onClick={NavBarLink} style={{ color: '#0013BC' }}>
          our projects
        </Link>
      </LinksContainer>
      <LinksContainer>
        {user ? (
          <>
            <Link onClick={() => navigate('/profile')}>profile</Link>
            <Link onClick={LogOut}>log out</Link>
          </>
        ) : (
          <>
            <Link onClick={() => navigate('/signin')}>sign in</Link>
            <Link onClick={() => navigate('/signup')}>sign up</Link>
          </>
        )}
        <Button onClick={() => {}} mode={ButtonMode.PRIMARY}>
          donate
        </Button>
      </LinksContainer>
    </MainContainer>
  );
}

export default Navbar;
