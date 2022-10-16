import React from "react";
import styled from "styled-components";
import profile from '../../assets/profile.png';
import { HeaderProps } from '../../interfaces';

const HeaderContainer = styled.div`
  width: 1122px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.div`
  width: 771px;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0.3px;
  color: #252733;
  float: left;
`;

const UserProfile = styled.div`
    width: 150px;
    display: flex;
    flex-direction: row;
`

const UserName = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  letter-spacing: 0.2px;
  color: #252733;
`;

const ProfileImage = styled.img`
  width: 45.53px;
  height: 45.53px;
  object-fit: contain;
`;

export default function Header({ title, userName, userEmail }: HeaderProps): React.ReactElement {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <UserProfile>
        <UserName>
          {userName}
          {userEmail}
        </UserName>
        <ProfileImage src={profile} />
      </UserProfile>
    </HeaderContainer>
  );
}