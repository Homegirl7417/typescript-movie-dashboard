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

export default function SideNavBar(): React.ReactElement {
  return (
    <NavContainer>
      <ul>
        <li>
          <NavLink to="/movie/list">movie 목록 조회</NavLink>
        </li>
        <li>
          <NavLink to="/search">검색</NavLink>
        </li>
      </ul>
    </NavContainer>
  );
}
