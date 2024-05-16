import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from '../../context/Context';
import { EventProps } from '../Home/Carousel/Carousel';
import Button, { ButtonMode } from '../shared/Button';
import json from '../shared/variables';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const descriptionFontSize = '2rem';
const gapConstant = '2rem';

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 12vh;
  padding-bottom: 12vh;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  gap: 4rem;
`;

const EventInfoText = styled.article`
  display: flex;
  flex-direction: column;
  width: 45rem;
  gap: ${gapConstant};
`;
const EventImg = styled.img`
  object-fit: cover;
  width: 60rem;
`;
const EventTitle = styled.h1`
  font-size: 5rem;
`;
const Blueify = styled.div`
  display: inline;
  font-size: inherit;
  color: #0013bc;
  font-weight: 700;
`;
const EventFDescription = styled.p`
  font-weight: 600;
  font-size: ${descriptionFontSize};
`;
const EventSDescription = styled.p`
  font-size: ${descriptionFontSize};
`;
const DetailsSection = styled.ul`
  list-style: none;
`;
const DetailItem = styled.li`
  font-size: ${descriptionFontSize};
  margin-top: 1rem;
`;

interface EventType extends EventProps {
  location: string;
  plannedStartTime: string;
  plannedEndTime: string;
  places: number;
  availablePlaces: number;
}

function EventInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState<any>();
  const { months } = json;

  useEffect(() => {

    const getEventssss = async () => {
      try{
        const trueID = id || "";
        const AAAAAAA = await getDoc(doc(db, "events", trueID))
        console.log(AAAAAAA.id + "AAA - ", AAAAAAA.data())
        setEvent(AAAAAAA.data());
  
      }catch(err) {
        console.log(err);
      }
    }
    getEventssss();
    console.log(event);
  }, []);

  if (!id) {
    navigate('/');
    return;
  }

  const showEvent = (item: EventType) => {
    const text = item.text.split('\n');
    const date = item.date.split('-');
    return (
      <MainContainer>
        <EventInfoText>
          <EventTitle>
            <Blueify>{item?.title}</Blueify> Event
          </EventTitle>
          <EventFDescription>{text[0]}</EventFDescription>
          <EventSDescription>{text[1]}</EventSDescription>
          <DetailsSection>
            <DetailItem>
              City: <Blueify>{item?.city}</Blueify>
            </DetailItem>
            <DetailItem>
              Location: <Blueify>{item?.location}</Blueify>
            </DetailItem>
            <DetailItem>
              Time:{' '}
              <Blueify>{`from ${item.plannedStartTime} to ${item.plannedEndTime}`}</Blueify>
            </DetailItem>
            <DetailItem>
              Date:{' '}
              <Blueify>
                {months[parseInt(date[1]) - 1] + ' ' + date[2] + ' ' + date[0]}
              </Blueify>
            </DetailItem>
            <DetailItem>
              Volunteers needed: <Blueify>{item?.places}</Blueify>
            </DetailItem>
            <DetailItem>
              Available places: <Blueify>{item?.availablePlaces}</Blueify>
            </DetailItem>
          </DetailsSection>
          <Button
            style={{ marginTop: '1rem' }}
            mode={ButtonMode.PRIMARY}
            isUppercase
          >
            Attend event
          </Button>
        </EventInfoText>
        <EventImg src={item.image} />
      </MainContainer>
    );
  };

  return event ? (
    showEvent(event)
    ) : (
    <p>loading</p>
  );
}

export default EventInfo;
