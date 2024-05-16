import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Autoplay, EffectCreative } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useContext } from '../../../context/Context';
import { ArrowIcon } from '../../assets/icons/ArrowIcon';
import Link from '../../shared/Link';
import json from '../../shared/variables';
import NextButton from '../Carousel/buttons/NextButton';
import PrevButton from '../Carousel/buttons/PrevButton';
import { query, limit, getDocs, collection, DocumentData } from 'firebase/firestore';
import { db, storage } from '../../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';

const Title = styled.p`
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  margin-top: 4rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 4rem 2rem;
`;

const Event = styled.div`
  margin-left: 12.1vw;
  display: flex;
  text-align: left;
  flex-direction: column;
  align-items: start;
  gap: 4rem;
  width: 75em;
`;

const Name = styled.p`
  font-size: 5rem;
  font-weight: 700;
`;

const Info = styled.div`
  margin-left: 5vw;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Text = styled.p`
  font-size: 2.2rem;
  font-weight: 600;
`;

const SubText = styled.p`
  font-size: 2.2rem;
`;

const Date = styled.p`
  font-size: 3rem;
  font-weight: 700;
`;

const Navigate = styled(Link)`
  font-size: 2rem;
`;

const Slider = styled.div`
  display: flex;
  text-align: left;
  margin-left: 10vw;
  overflow-x: hidden;
  flex-direction: column;
`;

const Image = styled.img``;

const Number = styled.p`
  font-size: 4.8rem;
  color: #d0d5ff;
  font-weight: bold;
`;

const Buttons = styled.div`
  display: flex;
`;

const ButtonText = styled.p`
  border: #d0d5ff solid 0.1rem;
  padding: 1.5rem 2rem;
  cursor: pointer;
  display: flex;
  rotate: 180deg;
`;

const Next = styled(ButtonText)`
  background-color: #d0d5ff;
  text-transform: uppercase;
  gap: 1rem;
  rotate: 0deg;
  line-height: 1.8rem;
`;

export interface EventProps {
  date: string;
  title: string;
  text: string;
  image: string;
  city: string;
  number: string;
}

function Carousel() {
  let date: string[];
  let text: string[];
  const { months } = json;
  const { user } = useContext();
  const navigate = useNavigate();

  const [events, setEvents] = useState<any>();

  useEffect(() => {
    const getUserrrrr = async () => {
      const q = query(collection(db, "events"), limit(2));
      const docSnap = await getDocs(q);
      var ASSJNFJASKCND: { id: string; image: string; }[] = [];
      docSnap.forEach((docc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(docc.id, " => ", docc.data());

        const photoRef = ref(storage, docc.id);
        var urrrrrl: string = "";
        getDownloadURL(photoRef)
        .then((url) => {
          urrrrrl = url;
        })
        .catch((error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/object-not-found':
              console.log("File doesn't exist");
              break;
            case 'storage/unauthorized':
              console.log("User doesn't have permission to access the object");
              break;
            case 'storage/canceled':
              console.log("User canceled the upload");
              break;

            case 'storage/unknown':
              console.log("Unknown error occurred, inspect the server response");
              break;
          }
        });


        ASSJNFJASKCND.push({ id: docc.id, image: urrrrrl, ...docc.data()});
      });

      setEvents(ASSJNFJASKCND);
    }
    console.log(events);
    getUserrrrr();
  }, []);

  const renderSLides = (item: any, index: number) => {
    date = item.date.split('-');
    text = item.text.split('\n');
    return (
      <Container>
        <Event>
          <Name>{item.title}</Name>
          <Info>
            <Text>{text[0]}</Text>
            <SubText>{text[1]}</SubText>
            <Date>
              {date[2] + ' ' + months[parseInt(date[1]) - 1] + ' ' + date[0]}
            </Date>
          </Info>
          <Navigate onClick={() => navigate(`event/${item.id}`)}>
            learn more
            <ArrowIcon />
          </Navigate>
        </Event>
        <Slider>
          <Number>0{index + 1}</Number>
          <Image src={item.image} height={420} width={420} />
          <Buttons>
            <PrevButton>
              <ButtonText>
                <ArrowIcon />
              </ButtonText>
            </PrevButton>
            <NextButton>
              <Next>
                next
                <ArrowIcon />
              </Next>
            </NextButton>
          </Buttons>
        </Slider>
      </Container>
    );
  };

  return (
    <Swiper
      loop
      initialSlide={1}
      slidesPerView={1}
      effect={'creative'}
      creativeEffect={{
        prev: {
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      modules={[EffectCreative, Autoplay]}
    >
      {events?.length ? (
        events.map((item: any, index: number) => {
          if (user?.city === item.city) {
            return (
              <SwiperSlide key={index}>
                {renderSLides(item, index)}
              </SwiperSlide>
            );
          }
          return (
            <SwiperSlide key={index}>{renderSLides(item, index)}</SwiperSlide>
          );
        })
      ) : (
        <Title>There are no upcoming events at the moment.</Title>
      )}
    </Swiper>
  );
}

export default Carousel;
