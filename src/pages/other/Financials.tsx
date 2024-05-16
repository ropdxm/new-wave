import Link from '../shared/Link';
import styled from 'styled-components';
import data from '../shared/variables';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 5rem 2rem;
  align-items: center;
`;

const Title = styled.p`
  font-size: 5rem;
  font-weight: 500;
`;

const Subtitle = styled.p`
  font-size: 2.2rem;
  width: 50em;
  text-align: center;
`;

const Content = styled.div`
  gap: 2rem;
  display: flex;
  align-items: center;
`;

const Year = styled.p`
  color: #d0d5ff;
  font-size: 15rem;
  font-weight: 700;
  text-transform: uppercase;
`;

const Links = styled.div`
  gap: 2rem;
  display: flex;
  flex-direction: column;
`;

const Document = styled(Link)`
  font-size: 2rem;
  text-transform: none;
  text-decoration: underline;
`;

function Financials() {
  const { years } = data.financials;

  return (
    <MainContainer>
      <Title>Financials</Title>
      <Subtitle>
        We are totally for being rational everywhere and in everything. We know
        how important it's to you that your donation is being used rationally.
        It's nessesary for us, too! That's the reason why we keep our work
        accountable and transparent as much, as it possible!
      </Subtitle>
      {years.map((item, index) => (
        <Content key={index}>
          <Year>{item.year}</Year>
          <Links>
            <Document>{item.year} Annual Report</Document>
            <Document>{item.year} Financial Usage</Document>
          </Links>
        </Content>
      ))}
      <Content>
        <Year>other</Year>
        <Document>Kazakhstan NCO Certificate</Document>
      </Content>
    </MainContainer>
  );
}

export default Financials;
