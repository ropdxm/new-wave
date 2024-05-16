import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from '../../context/Context';
import { CameraIcon } from '../assets/icons/CameraIcon';
import { ProfileIcon } from '../assets/icons/ProfileIcon';
import Button, { ButtonMode } from '../shared/Button';
import { collection } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { getBlob, ref, uploadBytes } from 'firebase/storage';
import "./profile.css";

const MainContainer = styled.div`
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const Title = styled.p`
  font-size: 5rem;
  font-weight: 500;
`;

const Content = styled.div`
  display: flex;
  gap: 30rem;
`;

const UserInfo = styled.div`
  display: flex;
  gap: 4rem;
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;

const Field = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  color: #0013bc;
`;

const Info = styled(Field)`
  color: black;
`;

const Actions = styled(Data)`
  gap: 1rem;
`;

const ProfileImage = styled.div`
  display: flex;
  width: 30rem;
  height: 30rem;
  overflow: hidden;
  position: relative;
  justify-content: center;
  &:hover div {
    opacity: 1;
  }
`;

const Image = styled.img``;

const ImageInput = styled.input`
  position: absolute;
  z-index: 2;
  width: 30rem;
  height: 30rem;
  opacity: 0;
  cursor: pointer;
`;

const EditImage = styled.div`
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 30rem;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

const EditText = styled.p`
  color: white;
  font-size: 1.8rem;
`;

const disableLoadingClass = "disableLoadingiwannakms";

function Profile() {
  const navigate = useNavigate();
  const { user, setUser, compressImage } = useContext();
  const [photo, setPhoto] = useState<any>();

  const loadingRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const usser = localStorage.getItem("user");
    console.log(usser)
    if(!usser){
      navigate("/signin");
      return;
    }
    setUser(() => JSON.parse(usser));
    const getPhoto = async () => {
      const photoRef = ref(storage, JSON.parse(usser).email);
      getBlob(photoRef).then(myPhotohehe => {
        var objectURL = URL.createObjectURL(myPhotohehe);
        console.log("SETTTEDDD", objectURL);
        setPhoto(objectURL);
        loadingRef.current?.classList.add(disableLoadingClass);
      }).catch(err => {console.log("AHAHAH" + err); 
      loadingRef.current?.classList.add(disableLoadingClass);
    });
    }
    getPhoto();

  }, []);

  
  const uploadImage = async (files: FileList | null) => {
    if (files) {
      const newImage = files[0];
      const compressedFile = await compressImage(newImage);
      setPhoto(compressedFile as File);      
          
      const storageRef = ref(storage, user.email);
      console.log("SANDKNASJ")
      uploadBytes(storageRef, compressedFile).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    }
  };

  const editProfile = () => {
    navigate('/fullsignupform', { state: { edit: true } });
  };

  const getCertificatePress = () => {
    // getCertificate({
    //   variables: { input: user?.email },
    // })
    //   .then((res) => {
    //     const file = `data:application/pdf;base64,${res.data.getCertificate}`;
    //     saveAs(file, `certificate.pdf`);
    //   })
    //   .catch(() => console.log('apollo server error (getCertificatePress)'));
  };

  const createEventPress = () => {
    navigate('/newevent');
  };

  const createReportPress = () => {
    navigate('/newreport', { state: { type: 'Clean up', _id: '' } });
  };
  const createInv = () => {
    navigate('/newinventoryitem')
  }

  return (
    <MainContainer>
      <Title>Profile</Title>
      <Content>
        <UserInfo>
          <Data>
            <Field>Full name:</Field>
            <Field>Date of birth:</Field>
            <Field>Gender:</Field>
            <Field>Status:</Field>
            <Field>Volunteering hours:</Field>
            <Field>Country:</Field>
            <Field>City:</Field>
            <Field>Affiliation:</Field>
            {user?.affiliation.type !== 'Work' &&
              user?.affiliation.type !== 'Unemployed' && (
                <>
                  <Field>{user?.affiliation.type}:</Field>
                  <Field>
                    {user?.affiliation.type === 'School' ? 'Grade' : 'Course'}:
                  </Field>
                </>
              )}
            {user?.affiliation.type === 'University' && <Field>Degree:</Field>}
            <Field>E-mail:</Field>
            <Field>Phone number:</Field>
            <Field>Instagram account:</Field>
          </Data>
          </UserInfo>
          <Data>
            <Info>
              {user?.firstName} {user?.secondName}
            </Info>
            <Info>{user?.dateOfBirth}</Info>
            <Info>{user?.gender}</Info>
            <Info>{user?.status=="v" ? "Volunteer" : "Coordinator"}</Info>
            <Info>{user?.volHours}</Info>
            <Info>{user?.location.country}</Info>
            <Info>{user?.location.city}</Info>
            <Info>{user?.affiliation.type}</Info>
            {user?.affiliation.type !== 'Work' &&
              user?.affiliation.type !== 'Unemployed' && (
                <>
                  <Info>{user?.affiliation.name}</Info>
                  <Info>{user?.affiliation.studyYear}</Info>
                </>
              )}
            {user?.affiliation.type === 'University' && (
              <Info>{user?.affiliation.degree}</Info>
            )}
            <Info>{user?.email}</Info>
            <Info>+{user?.phoneNumber}</Info>
            <Info>{user?.instagram}</Info>
          </Data>
        <Actions>
          <ProfileImage>
            <ul className="dots" ref={loadingRef}>
              <li></li>
              <li></li>
              <li></li>
            </ul>

            {photo ? <Image src={photo} /> : <ProfileIcon/>}
            <EditImage>
              <CameraIcon />
              <EditText>Edit</EditText>
            </EditImage>
            <ImageInput
              type="file"
              onChange={(e) => uploadImage(e.target.files)}
            />
          </ProfileImage>
          <Button mode={ButtonMode.PRIMARY} onClick={getCertificatePress}>
            get my certificate
          </Button>
          <Button
            mode={ButtonMode.SECONDARY}
            href="https://t.me/+e_JwRN9vuVs3YWFi"
            target="_blank"
          >
            join the telegram group
          </Button>
          <Button mode={ButtonMode.DEFAULT} onClick={editProfile}>
            edit my profile
          </Button>
          {user?.status === 'v' && ( // TODO: change it to !==
            <>
              <Button mode={ButtonMode.DEFAULT} onClick={createEventPress}>
                create event
              </Button>
              <Button mode={ButtonMode.DEFAULT} onClick={createReportPress}>
                create report
              </Button>
              <Button mode={ButtonMode.DEFAULT} onClick={createInv}>
                create inv. item
              </Button>
            </>
          )}
        </Actions>
      </Content>
    </MainContainer>
  );
}

export default Profile;
