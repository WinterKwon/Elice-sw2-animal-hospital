import React, {useState, useEffect} from "react";
import styled from "styled-components";
import 'antd/dist/antd.css';
import { Input, Button } from 'antd';

const AddressContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 4px;
`;

const SearchAddr = styled(Button)`
  width: 100px;
  text-align: center;
  margin-top: 1rem;
`;

const RegisterBtn = styled.button`
  width: 120px;
  height: 40px;
  margin: 20px 0;
  text-align: center;
  background-color: ${props => props.theme.palette.blue};
  border: none;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.1s ease-in;
  border-radius: 4px;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
  }
`;

const RegisterBtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.palette.peach};
  font-size: 12px;
  margin-top: 4px;
`;


interface Props {
  isHospital: boolean,
};



const RegisterForm: React.FC<Props> = ({isHospital}) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPwd, setCheckPwd] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [postal, setPostal] = useState<string>('');
  const [address1, setAddress1] = useState<string>('');
  const [address2, setAddress2] = useState<string>('');

  const [hospitalname, setHospitalname] = useState<string>('');
  const [CRN, setCRN] = useState<string>('');
  const [license, setLicense] = useState<string>('');

  const [isSamePwd, setIsSamePwd] = useState<boolean>(true);
  const [isEmail, setIsEmail] = useState<boolean>(true);
  const [isPwd, setIsPwd] = useState<boolean>(true);

  function handleSubmit(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    const emailRegex:RegExp =  /^(([^<>()[].,;:\s@"]+(.[^<>()[].,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    setIsEmail(emailRegex.test(email) ? true : false);
  }

  function handleChangePwd(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    const passwordRegex:RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    setIsPwd(passwordRegex.test(password) ? true : false);
    checkPwd.length && setIsSamePwd(password === checkPwd ? true : false);
  }

  function handleChangeCheckPwd(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckPwd(e.target.value);
    console.log(password, checkPwd);
    setIsSamePwd(password === checkPwd ? true : false);
  }

  return (
    <>
      <form>
        {isHospital && 
          <Input
          placeholder="병원 이름을 입력해주세요"
          value = {hospitalname}
          onChange = {(e) => setHospitalname(e.target.value)}
          style={{ marginTop: "1rem" }}
          required
        />
        }
        <Input
          placeholder="이름을 입력해주세요"
          value = {username}
          onChange = {(e) => setUsername(e.target.value)}
          style={{ marginTop: "1rem" }}
          required
        />
        <Input
          placeholder="이메일을 입력해주세요"
          value = {email}
          onChange = {handleChangeEmail}
          style={{ marginTop: "1rem" }}
          required
        />
        {!isEmail && <ErrorMessage>이메일 형식이 올바르지 않습니다.</ErrorMessage>}
        <Input
          placeholder="비밀번호를 입력해주세요"
          type='password'
          value = {password}
          onChange = {handleChangePwd}
          style={{ marginTop: "1rem" }}
          required
        />
        {!isPwd && <ErrorMessage>비밀번호는 영문, 숫자, 특수문자 조합으로 8자 이상 입력해주세요.</ErrorMessage>}
        <Input
          placeholder="비밀번호를 다시 입력해주세요"
          type= 'password'
          value = {checkPwd}
          onChange = {handleChangeCheckPwd}
          style={{ marginTop: "1rem" }}
          required
        />
        {!isSamePwd && <ErrorMessage>비밀번호와 일치하지 않습니다.</ErrorMessage>}
        <Input
          placeholder="전화번호를 입력해주세요 (- 제외)" 
          value = {phone}
          onChange = {(e) => setPhone(e.target.value)}
          style={{ marginTop: "1rem" }}
          required
        />
        <AddressContainer>
          <Input
            placeholder="우편번호"
            style={{ marginTop: "1rem" }}
            required
          />
          <SearchAddr>주소 찾기</SearchAddr>
          <Input
            placeholder="주소"
            style={{ marginTop: "0.5rem" }}
            required
          />
          <Input
            placeholder="상세주소"
            style={{ marginTop: "0.5rem" }}
            required
          />
        </AddressContainer>
        {isHospital &&
          <div>
            <Input
            placeholder="사업자 등록번호를 입력해주세요"
            value = {CRN}
            onChange = {(e) => setCRN(e.target.value)}
            style={{ marginTop: "1rem" }}
            required
            />
            <Input
            placeholder="면허 번호를 입력해주세요"
            value = {license}
            onChange = {(e) => setLicense(e.target.value)}
            style={{ marginTop: "1rem" }}
            required
            />
          </div>
        }
        <RegisterBtnContainer>
          <RegisterBtn type="submit" onClick={handleSubmit}>회원가입</RegisterBtn>
        </RegisterBtnContainer>
      </form>
    </>
  )
}

export default RegisterForm;