import React from "react";
import styled from "styled-components";
import SideNavBar from '../organisms/SideNavBar';
import Header from "../organisms/Header";

interface MovieTemplateProps {
  title: string,
  children: JSX.Element
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`
const ContentContainer = styled.div`
  width: calc(100vw - 255px);
  margin-left: 255px;
  padding: 30px;
`;

export default function MovieTemplate({ title, children }: MovieTemplateProps): React.ReactElement {
  return (
    <Container>
      <SideNavBar />
      <ContentContainer>
        <Header title={title} userName="아무개씨" />
        <div>{children}</div>
      </ContentContainer>
    </Container>
  );
}