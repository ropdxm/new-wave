import styled from 'styled-components';
import data from '../../shared/variables';
import NumberAnimated from '../../shared/NumberAnimated';
import './second.css';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5rem 2rem;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
`;

const Title = styled.p`
  font-size: 5rem;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 3rem;
  margin: 4rem 0rem;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 6rem;
`;

const Stat = styled.div`
  width: 26vw;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 2.2rem;
  margin-bottom: 2rem;
`;

const Number = styled.div`
  font-size: 5rem;
  color: #0013bc;
  font-weight: bolder;
`;

const SubText = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
`;

const Box = styled.div`
  width: 13vw;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

function Second() {
  const { titles, stats } = data.second;

  return (
    <MainContainer id="about">
      <Header>
        <Title>We save the</Title>
        {/* <Swiper
          initialSlide={1}
          slidesPerView={3}
          modules={[Autoplay]}
          centeredSlides={true}
          loop={true}
          direction={'vertical'}
          style={{
            zIndex: '-1',
            height: '19vh',
            width: '9vw',
            overflow: 'hidden',
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {titles.map((item, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <Title style={{ color: isActive ? '#0013BC' : '#D0D5FF' }}>
                  {item}.
                </Title>
              )}
            </SwiperSlide>
          ))}
        </Swiper> */}
            <div className="ms-slider">
      <ul className="ms-slider__words">
      {titles?.map((item, index) => (
        <li key={index} className="ms-slider__word">{item}</li>
        ))}
        {/* <li className="ms-slider__word">Developer</li>
        <li className="ms-slider__word">Designer</li>
        <li className="ms-slider__word">Creators</li>
        <li className="ms-slider__word">Developer</li> */}
      </ul>
      </div>

      </Header>
      <Title >Together.</Title>
      <Subtitle>How do we tackle with environmental issues?</Subtitle>
      <Content>
        {stats.map((item, index) => (
          <Stat key={index}>
            <Text>{item.text}</Text>
            <Box>
              <Number>
                <NumberAnimated num={item.number} />
              </Number>
              <SubText>{item.subtext}</SubText>
            </Box>
          </Stat>
        ))}
      </Content>
    </MainContainer>
  );
}

export default Second;
