import { useLazyQuery, useMutation } from '@apollo/client'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useContext } from '../../context/Context'
import { CameraIcon } from '../assets/icons/CameraIcon'
import { ImageIcon } from '../assets/icons/ImageIcon'
import Button, { ButtonMode } from '../shared/Button'
import CreatableMultiSelect from '../shared/CreatableMultiSelect'
import Input from '../shared/Input'
import MultiSelect, { Option } from '../shared/MultiSelect'
import Selector from '../shared/Selector'
import TextArea from '../shared/TextArea'
import data from '../shared/variables'
import { addDoc, getDocs, query, where } from 'firebase/firestore'
import { eventsRef, inventoryRef, storage, usersRef } from '../../firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

const MainContainer = styled.div`
  gap: 4rem;
  display: flex;
  padding: 5rem 2rem;
  align-items: center;
  flex-direction: column;
`

const Title = styled.p`
  font-size: 5rem;
  font-weight: 500;
`

const Form = styled.div`
  gap: 4rem;
  display: flex;
  padding: 3rem 4rem;
  flex-direction: column;
  background-color: rgba(208, 213, 255, 0.5);
`

const Fields = styled.div`
  display: grid;
  gap: 4rem 8rem;
  grid-template-columns: 40.2rem 40.2rem;
`

const Field = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1rem;
`

const Duration = styled(Field)`
  flex: initial;
`

const TimeFields = styled(Field)`
  gap: 0rem;
  justify-content: space-between;
`

const FieldTitle = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  display: flex;
  gap: 1rem;
`

const Must = styled.p`
  color: red;
`

const EventImage = styled.div`
  display: flex;
  width: 40.2rem;
  height: 40.2rem;
  overflow: hidden;
  justify-content: center;
  &:hover div {
    opacity: 1;
  }
`

const Image = styled.img``

const ImageInput = styled.input`
  position: absolute;
  z-index: 2;
  width: 40.2rem;
  height: 40.2rem;
  opacity: 0;
  cursor: pointer;
`

const EditImage = styled.div`
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 40.2rem;
  height: 40.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`

const EditText = styled.p`
  color: white;
  font-size: 1.8rem;
`

const DurationText = styled(FieldTitle)`
  color: #0013bc;
`

interface Coordinator {
  _id: string
  name: string
}

interface InventoryItem {
    title: string;
    amount: number;
    ownerId: string; // users id
}

function NewInventoryItem() {
  const navigate = useNavigate();
  const { types, formats, partners, cities } = data.newEvent
  const [coordinators, setCoordinators] = useState<Coordinator[]>([])
  const [inventory, setInventory] = useState<InventoryItem>({
    title: '',
    amount: 0,
    ownerId: ''
  })
  const { user, setUser } = useContext();

  const [ePhoto, setEPhoto] = useState<any>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const setTitle = (value: string) => {
    setInventory({ ...inventory, title: value })
  }
  const setAmount = (value: number) => {
    setInventory({ ...inventory, amount: value })
  }

  useEffect(() => {
    const usser = localStorage.getItem("user") as string;
    
    const getUserrrrr = async () => {
        try{
            const q = query(usersRef, where("email", "==", JSON.parse(usser).email));
            const docSnap = await getDocs(q);
            docSnap.forEach((docc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(docc.id, " => ", docc.data());
            const aaaaaa = docc.data();
            // localStorage.setItem('user', JSON.stringify({...doc.data(), id: doc.id}));
            setUser({...aaaaaa, id: docc.id})
            });
        }catch(err){
            console.log(err);
        }
    }
    getUserrrrr();
  

    if(!usser){
      navigate("/signin");
      return;
    }

  }, [])

  const onPress = () => {

    const pendingClassName = 'loading-btn--pending';
    const successClassName = 'loading-btn--success';
    const failClassName    = 'loading-btn--fail';
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    if(buttonRef.current?.classList.contains(pendingClassName)){
      return;
    }
    buttonRef.current?.classList.add(pendingClassName);

    addDoc(inventoryRef, {...inventory, ownerId: user?.id}).then(eventFRef => {
      console.log(eventFRef);

      buttonRef.current?.classList.remove(pendingClassName);
      buttonRef.current?.classList.add(successClassName);
      const removeSuccessss = async () => {
        await sleep(10);
        buttonRef.current?.classList.remove(successClassName);
        navigate('/');
  
      }
      removeSuccessss();

    }).catch(err => {
      
      buttonRef.current?.classList.remove(pendingClassName);
      buttonRef.current?.classList.add(failClassName);
      const setModalllll = async () => {
        await sleep(2000);
        buttonRef.current?.classList.remove(failClassName);
      }
      setModalllll();
  
      console.log(err)
  
    });

    // console.log(event);

  }

  return (
    <MainContainer>
      <Title>Create an Inventory Item</Title>
      <Form>
        <Fields>
          <Input
            title="Item Name"
            value={inventory.title}
            type="text"
            onChange={setTitle}
            placeholder="Enter the name"
          />
          <Input
            type="number"
            value={inventory.amount}
            onChange={setAmount}
            title="Amount"
            placeholder="Enter amount"
          />
        </Fields>
        <span className="loading-btn-wrapper" onClick={onPress}>
          <button className="loading-btn js_success-animation-trigger" ref={buttonRef}>
            <span className="loading-btn__text">
              submit
            </span>
          </button>
        </span>
      </Form>
    </MainContainer>
  )
}

export default NewInventoryItem;
