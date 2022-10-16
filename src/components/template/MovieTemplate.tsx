import React from "react";
import styled from "styled-components";
import SideNavBar from '../organisms/SideNavBar';
import Header from "../organisms/Header";
import { MovieTemplateProps } from '../../interfaces';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`
const ContentContainer = styled.div`
  margin-left: 255px;
  padding: 30px;
`;

const ChildrenContainer = styled.div`
  padding: 30px 0px;
`

export default function MovieTemplate({ title, userEmail, children }: MovieTemplateProps): React.ReactElement {
  return (
    <Container>
      <SideNavBar />
      <ContentContainer>
        <Header title={title} userName="아무개씨" userEmail={userEmail} />
        <ChildrenContainer>{children}</ChildrenContainer>
      </ContentContainer>
    </Container>
  );
}