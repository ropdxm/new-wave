import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from '../../context/Context';
import { EventProps } from '../Home/Carousel/Carousel';
import Button, { ButtonMode } from '../shared/Button';
import json from '../shared/variables';
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db, ticketsRef } from '../../firebase';

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

const pendingClassName = 'loading-btn--pending';
const successClassName = 'loading-btn--success';
const failClassName    = 'loading-btn--fail';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function EventInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState<any>();
  const [tickets, setTickets] = useState<any>();
  const { months } = json;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { user } = useContext();

  useEffect(() => {

    const getEventssss = async () => {
      try{
        const trueID = id || "";
        const AAAAAAA = await getDoc(doc(db, "events", trueID))
        console.log(AAAAAAA.id + "AAA - ", AAAAAAA.data())
        const qq = query(ticketsRef, where("eventId", "==", AAAAAAA.id));
        const docSnap = await getDocs(qq);
        let tempTickets: any[] = [];
        docSnap.forEach(docc => {
          tempTickets.push(docc.data());
        })
        setTickets(tempTickets);
        setEvent({id: AAAAAAA.id, ...AAAAAAA.data(), availablePlaces: AAAAAAA.data()?.places - docSnap.size});
  
      }catch(err) {
        console.log(err);
        setEvent("NOTFOUND");
      }
    }
    getEventssss();
    console.log(event);
    console.log(tickets)
  }, []);

  const attendEvent = async () => {
    if(!user){
      navigate('/signin')
    }
    if(event.availablePlaces<=0){
      alert("Not enough places");
      return;
    }

    if(buttonRef.current?.classList.contains(pendingClassName)){
      return;
    }
    buttonRef.current?.classList.add(pendingClassName);

    try {
      const q = query(ticketsRef, where("eventId", "==", event.id), where("userId", "==", user.id));

      const docSnap = await getDocs(q);
      if(docSnap.size!=0){
        throw new Error("Already registered")
      }

      await addDoc(ticketsRef, {
        userId: user.id,
        eventId: event.id,
        firstName: user.firstName,
        secondName: user.secondName
      });
      buttonRef.current?.classList.remove(pendingClassName);
      buttonRef.current?.classList.add(successClassName);
      const removeSuccessss = async () => {
        await sleep(2000);
        buttonRef.current?.classList.remove(successClassName);
      }
      removeSuccessss();
      window.location.reload();

    } catch(e: any) {
      alert(e);
      buttonRef.current?.classList.remove(pendingClassName);
      buttonRef.current?.classList.add(failClassName);
      const setModalllll = async () => {
        await sleep(2000);
        buttonRef.current?.classList.remove(failClassName);
      }
      setModalllll();
    }
  }  

  if (!id) {
    navigate('/');
    return;
  }
  if(!user){
    navigate('/signin')
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
          <span className="loading-btn-wrapper" onClick={attendEvent}>
          <button className="loading-btn js_success-animation-trigger" ref={buttonRef}>
            <span className="loading-btn__text">
              Attend event
            </span>
          </button>
        </span>
        </EventInfoText>
        <EventImg src={item.image} />
      </MainContainer>
    );
  };

  const showStat = (item: EventType) => {
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
            <DetailItem>
              Volunteers participating: <br/>
              {tickets.map((ticke: any, index: number) => <DetailItem key={index}>{index}) {ticke.firstName} {ticke.secondName}</DetailItem>)}
            </DetailItem>
            
          </DetailsSection>
        </EventInfoText>
        <EventImg src={item.image} />
      </MainContainer>
    );
  }

  return event ? (
    event=="NOTFOUND" ? 
    <p>Not Found</p>
    : (user.status=="c" ? showStat(event) : showEvent(event))
    ) : (
    <p>loading</p>
  );
}

export default EventInfo;
