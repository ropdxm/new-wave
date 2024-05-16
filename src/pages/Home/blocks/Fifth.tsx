import styled from 'styled-components';
import { lazy, Suspense } from 'react';

const MainContainer = styled.div`
  padding: 5rem 2rem;
`;

const Title = styled.p`
  font-size: 5rem;
  font-weight: bold;
  text-align: center;
`;

const Carousel = lazy(() => import('../Carousel/Carousel'));

function Fifth() {
  return (
      <MainContainer id="community">
        <Title>Upcoming events</Title>
        <Suspense fallback={<p>Loading...</p>}>
          <Carousel />
        </Suspense>
      
      </MainContainer>
  );
}

export default Fifth;
