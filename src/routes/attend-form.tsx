import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import DaumPost from '../components/daum-post';
import { Link } from 'react-router-dom';

interface FormData {
    agree: boolean;
    name: string;
    dob: string;
    gender: string;
    phone: string;
    email: string;
    category: string;
    address: string;
    zonecode: number | string;
    adressDetail: string;
    createdAt?: number;
}


const H1 = styled.h1`
    font-size: 50px;
    margin-top: 200px;
    margin-bottom: 50px;
    font-weight: bold;
    color: #333;
    text-align: center;

`;

const Span = styled.span`
    font-size: 20px;
    margin-top: 50px;

`;

const Container = styled.div`
  padding: 20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ScrollBox = styled.div`
  height: 200px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 10px;
`;

const Input = styled.input`
    border : 2px solid white;
    border-bottom: 2px solid #ccc;
    margin-right: 20px;
    height: 44px;
    transition : border 0.3s ease-out;
    transition: border-color 0.3s;
    font-size: 17px;
    margin: 5px;
  &:focus {
    outline: none;
    background-color: #fafafa;
    border-color: #0056b3;
    border-radius: 5px;
    border: 2px solid #0056b3;
  }

    &::placeholder {
    text-align: left; 
    padding-left: 5px;
    color: #888; 
  }
`;

const LineDiv = styled.div`
    display: flex;  
    align-items: center;
`;

const DateInput = styled.input.attrs({ type: 'date' })`
    background-color: #fafafa;
    border: 2px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    outline: none;
    margin-bottom: 40px;
    &:hover {
        border-color: #ccc;
    }

    &:focus {
        border-color: #0056b3;
        box-shadow: 0 0 5px rgba(0, 86, 179, 0.25);
    }
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Button = styled.button`
  margin-top: 20px;
  border-radius: 5px;
  padding: 10px 20px;
    border: 2px solid #b1b2b3;
  &:hover {
    cursor: pointer;
    background-color: #c3d2e2;
  } 
  &:focus {
    outline: none;
    background-color: #7a8fa4;
  };
`;

const AddressWrapper = styled.div``;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 50%;
    min-width: 300px;
`;

const Checkbox = styled.input`
    margin-right: 10px;
`;

const AddressInput = styled(Input)`
    width: 50%;
`;

const SubmitButton = styled(Button)`
    margin-top: 40px;
    border: none;
    height: 55px;
    font-size: 20px;
    font-weight: 500;
    border-radius: 10px;
    &:hover {
        background-color: #95b3d1;
    }

`;

export default function AttendForm() {
    const [formData, setFormData] = useState<FormData>({
        agree: false,
        name: '',
        dob: '',
        gender: '',
        phone: '',
        email: '',
        category: '',
        address: '',
        zonecode: '',
        adressDetail: '',
        createdAt: Date.now()
    });
    const [popup, setPopup] = useState(false);

    // 팝업 열고 닫기

    const handleComplete = () => {
        setPopup(!popup);
        console.log(popup);

    }


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        alert('Form submitted, check console for data.');
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // 컴포넌트 마운트 시 실행

    return (
        <Container>

            <H1>참가신청</H1>
            <Form onSubmit={handleSubmit}>
                <ScrollBox>
                    <p>이글은 예시 약관입니다</p>
                    <p>이글은 예시 약관입니다</p>
                    <p>이글은 예시 약관입니다</p>
                    <p>이글은 예시 약관입니다</p>
                    회사명(이하 ‘회사’라 한다)는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.
                    <strong>제1조 (개인정보의 처리목적)</strong>
                    회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    1. 홈페이지 회원 가입 및 관리회사명(이하 ‘회사’라 한다)는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.
                    <strong>제1조 (개인정보의 처리목적)</strong>
                    회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    1. 홈페이지 회원 가입 및 관리회사명(이하 ‘회사’라 한다)는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.
                    <strong>제1조 (개인정보의 처리목적)</strong>
                    회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    1. 홈페이지 회원 가입 및 관리회사명(이하 ‘회사’라 한다)는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.
                    <strong>제1조 (개인정보의 처리목적)</strong>
                    회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    1. 홈페이지 회원 가입 및 관리회사명(이하 ‘회사’라 한다)는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.
                    <strong>제1조 (개인정보의 처리목적)</strong>
                    회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    1. 홈페이지 회원 가입 및 관리회사명(이하 ‘회사’라 한다)는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.
                    <strong>제1조 (개인정보의 처리목적)</strong>
                    회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    1. 홈페이지 회원 가입 및 관리회사명(이하 ‘회사’라 한다)는 개인정보 보호법 제30조에 따라 정보 주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리지침을 수립, 공개합니다.
                    <strong>제1조 (개인정보의 처리목적)</strong>
                    회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    1. 홈페이지 회원 가입 및 관리
                </ScrollBox>
                <Label>
                    <LineDiv style={{ justifyContent: 'center' }}>
                        <Input
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                            required
                        />
                        <span>
                            이용 약관에 동의합니다.
                        </span>
                    </LineDiv>
                </Label>
                {popup && <DaumPost address={formData} setAddress={setFormData} handleComplete={handleComplete} />}
                <Span>이름</Span>
                <LineDiv>
                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="이름"
                        required
                    />
                    {["남자", "여자"].map((gender, index) => (
                        <Label key={index}>
                            <Checkbox
                                type="radio"
                                name="gender"
                                value={gender}
                                checked={formData.gender === gender}
                                onChange={handleChange}
                                required
                            />
                            {gender}
                        </Label>
                    ))}
                </LineDiv>
                <Span>생년월일</Span>
                <DateInput
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />

                <AddressWrapper>
                    <Span>주소</Span>
                    <div>
                        <Input
                            name='zonecode'
                            value={formData.zonecode} //선택한 우편번호 input 태그에 바인딩
                            type="text"
                            placeholder="우편번호"
                            onChange={handleChange}
                            required
                        />
                        <Button type={"button"} onClick={handleComplete}>주소 검색</Button>
                    </div>
                    <AddressInput
                        name='address'
                        value={formData.address} //선택한 주소값 input 태그에 바인딩 
                        type="text"
                        placeholder="기본주소"
                        onChange={handleChange}
                        required
                    />
                    <AddressInput
                        name='addressDetail'
                        type="text"
                        placeholder="상세주소"
                        minLength={2}
                        maxLength={36}
                        onChange={handleChange}
                        required
                    />
                </AddressWrapper>
                <Span>연락처</Span>
                <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="ex) 01012345678"
                    required
                />
                <Span>이메일</Span>
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="이메일"
                />
                <Span>코스 선택</Span>
                {["10km", "5km"].map((category, index) => (
                    <Label key={index}>
                        <Checkbox
                            type="radio"
                            name="category"
                            value={category}
                            checked={formData.category === category}
                            onChange={handleChange}
                            required
                        />
                        {category}
                    </Label>
                ))}
                <SubmitButton type='submit'>다음으로</SubmitButton>
                <Link to="/checkout">결제하기 dev.ver</Link>
            </Form>
        </Container>
    );
}


