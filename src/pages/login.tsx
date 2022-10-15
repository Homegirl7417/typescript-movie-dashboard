import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Login(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const validateEmail = (emailInput: string): boolean => {
    const regExp = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    return regExp.test(emailInput);
  }

  const onClickLogin = (): void => {
    if (!validateEmail(email)) alert('이메일 형식이 올바르지 않습니다.');
    else {
      alert(`이메일: ${email} / 패스워드: ${password}`);
      navigate('/movie/list');
    }
  }
  return (
    <div>
      <h1>로그인</h1>
      <form>
        <input name="email" placeholder="Email address" value={email} onChange={onChangeEmail} />
        <input name="password" placeholder="Password" value={password} onChange={onChangePassword} />
        <button type="button" onClick={onClickLogin}>
          로그인
        </button>
      </form>
    </div>
  );
};