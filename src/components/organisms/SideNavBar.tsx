import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: absolute;
  top: 0px;
  left: 0px;;
  width: 255px;
  height: 100vh;
  background-color: black;
`;

const NavItem = styled.li`
  height: 100px;
  text-align: center;
`

export default function SideNavBar(): React.ReactElement {
  return (
    <NavContainer>
      <ul>
        <NavItem>
          <NavLink to="/movie/list">movie 목록 조회</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/search">검색</NavLink>
        </NavItem>
      </ul>
    </NavContainer>
  );
}
