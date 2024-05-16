import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import styled from 'styled-components';
import Button, { ButtonMode } from '../shared/Button';
import Input from '../shared/Input';

const MainContainer = styled.div`
  gap: 4rem;
  display: flex;
  padding: 5rem 2rem;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 5rem;
  font-weight: 500;
`;

const Content = styled.div`
  gap: 20rem;
  display: flex;
  align-items: center;
`;

const Data = styled(Content)`
  gap: 5rem;
`;

const Form = styled.div`
  gap: 2rem;
  display: flex;
  flex-direction: column;
`;

const Info = styled(Form)``;

const Text = styled.p`
  color: black;
  font-size: 1.8rem;
  font-weight: 500;
`;

const Field = styled(Text)`
  color: #0013bc;
`;

const Label = styled(Text)`
  font-size: 2rem;
  font-weight: 700;
`;

interface DataType {
  type: string;
  year: number;
  country: string;
  name: string;
  volunteeringHours: number;
}

function CodeVerification() {
  const [code, setCode] = useState<string>();
  const [data, setData] = useState<DataType>();

  const onChange = (value: string) => {
    setCode(value);
  };

  const onPress = () => {
    // checkCode({ variables: { input: code } })
    //   .then((res) => setData(res.data.checkCode))
    //   .catch(() => console.log('apollo server errror'));
  };

  return (
    <MainContainer>
      <Title>Verify certificates</Title>
      <Content>
        <Form>
          <Input
            value={code}
            must={false}
            onChange={onChange}
            title="Code on your certificate"
            placeholder="CRTF-2023-KZ-VOL-0001-NEW"
          />
          <Button mode={ButtonMode.PRIMARY} onClick={onPress}>
            check the code
          </Button>
        </Form>
        <Info>
          <Label>Recepient</Label>
          <Data>
            <Info>
              <Field>Name:</Field>
              <Field>Year:</Field>
              <Field>Country:</Field>
              <Field>Volunteering hours:</Field>
              <Field>Type of certification:</Field>
            </Info>
            {data ? (
              <Info>
                <Text>{data.name}</Text>
                <Text>{data.year}</Text>
                <Text>{data.country}</Text>
                <Text>{data.volunteeringHours}</Text>
                <Text>{data.type}</Text>
              </Info>
            ) : (
              <Label>There is no certificate with such code.</Label>
            )}
          </Data>
        </Info>
      </Content>
    </MainContainer>
  );
}

export default CodeVerification;
