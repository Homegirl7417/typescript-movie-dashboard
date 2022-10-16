import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { actionCreators } from '../store/modules/user';

const ACCOUNT_ID = process.env.REACT_APP_ACCOUNT_ID as string;
const SESSION_ID = process.env.REACT_APP_SESSION_ID as string;

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #363740;
`;

const LoginWrapper = styled.div`
  width: 500px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  text-align: center;
`;

export default function Login(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const validateEmail = (emailInput: string): boolean => {
    const emailRegExp = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    return emailRegExp.test(emailInput);
  }

  const validatePassword = (passwordInput: string): boolean => {
    // 영문, 숫자, 특수문자 중 3종류 이상을 조합하여 최소 8자리 이상
    const passwordThreeTypeRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/;
    // 영문, 숫자, 특수문자 중 2종류 이상을 조합하여 최소 10자리 이상
    const alphabetAndNumberRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    const numberAndSpecialRegExp = /^(?=.*\d)(?=.*[@$!%*#?&^])[\d@$!%*#?&^]{10,}$/;
    const alphabetAndSpecialRegExp = /^(?=.*[A-Za-z])(?=.*[@$!%*#?&^])[A-Za-z@$!%*#?&^]{10,}$/;
    if (passwordThreeTypeRegExp.test(passwordInput)) return true;
    if (
      alphabetAndNumberRegExp.test(passwordInput) ||
      numberAndSpecialRegExp.test(passwordInput) ||
      alphabetAndSpecialRegExp.test(passwordInput)
    ) return true;
    return false;
  }

  const onClickLogin = (): void => {
    if (!validateEmail(email)) alert('이메일 형식이 올바르지 않습니다.');
    else if (!validatePassword(password)) alert('비밀번호 형식이 올바르지 않습니다.');
    else {
      dispatch(actionCreators.login(email, ACCOUNT_ID, SESSION_ID));
      navigate('/movie/list');

    }
  }
  return (
    <LoginContainer>
      <LoginWrapper>
        <h1>로그인</h1>
        <form>
          <input type="email" name="email" placeholder="Email address" value={email} onChange={onChangeEmail} />
          <input type="password" name="password" placeholder="Password" value={password} onChange={onChangePassword} />
          <button type="button" onClick={onClickLogin}>
            로그인
          </button>
        </form>
        <br />
        <div>비밀번호 규칙</div>
        <ul>
          <li>영문, 숫자, 특수문자 중 3종류 이상 10글자 이상으로 조합해주세요.</li>
          <li>영문, 숫자, 특수문자 중 2종류 이상 8글자 이상으로 조합해주세요.</li>
          <li>
            연속적인 숫자나 생일, 전화번호 등 추측하기 쉬운 개인정보 및 아이디와 비슷한 비밀번호는 사용하지 않는 것을
            권고합니다.
          </li>
        </ul>
      </LoginWrapper>
    </LoginContainer>
  );
};