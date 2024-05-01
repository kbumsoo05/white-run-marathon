import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import DaumPost from '../components/daum-post';
import { Link, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { MainColor, MainHoverColor } from '../components/color';

export interface FormData {
    agree: boolean;
    name: string;
    dob: string;
    gender: string;
    phone: number | string;
    email: string;
    category: string;
    address: string;
    zonecode: number | string;
    adressDetail: string;
    createdAt: number;
    price: number;
    totalPrice: number;
    productName: string;
    customerKey: string;
    orderId: string;
    group: string;
    groupName?: string;
    groupMembers: GroupMember[];
}

interface GroupMember {
    name: string;
    phone: string;
    gender: string;
}

const H1 = styled.div`
    display: flex;
    gap: 10px;
    background-color: ${MainColor};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    font-size: 50px;
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
  margin-top: 100px;
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
    gap: 15px;
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
  margin-bottom: 0px;
`;

const Button = styled.button`
  border-radius: 5px;
  padding: 10px 20px;
  background-color: ${MainColor};
  border: none;

    &:hover {
        background-color: ${MainHoverColor};
    }
`;

const Select = styled.select`
    border: 2px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    outline: none;
    &:hover {
        border-color: #ccc;
    }

    &:focus {
        border-color: #0056b3;
        box-shadow: 0 0 5px rgba(0, 86, 179, 0.25);
    }

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
    width: 55%;
`;

const SubmitButton = styled(Button)`
    margin-top: 40px;
    border: none;
    height: 55px;
    font-size: 20px;
    font-weight: 500;
    border-radius: 10px;
    color: white;
    background-color: gray;
    &:hover {
        background-color: #95b3d1;
    }
`;

const Icon = styled.div`
    height: 24px;
    width: 24px;
    cursor: pointer;
    &:hover {
        color: red;
    }
`;

export default function AttendForm() {
    const [popup, setPopup] = useState(false);
    const navigate = useNavigate();
    const [MemberName, setMemberName] = useState<string>('');
    const [MemberPhone, setMemberPhone] = useState<string>('');
    const [MemberSex, setMemberSex] = useState("성별");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
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
        createdAt: Date.now(),
        price: 30000,
        totalPrice: 0,
        productName: '마라톤',
        customerKey: nanoid(),
        orderId: nanoid(),
        group: '개인',
        groupMembers: [],
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        console.log(windowWidth);


        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // 코스 선택에 따른 가격 변경
    useEffect(() => {
        if (formData.category === '10km') {
            setFormData(prev => ({ ...prev, price: 35000 }));
        } else if (formData.category === '5km') {
            setFormData(prev => ({ ...prev, price: 30000 }));
        }
        setFormData(prev => ({
            ...prev,
            totalPrice: prev.price * (prev.groupMembers.length + 1),
        }));
    }, [formData.category, formData.groupMembers.length]);

    // 팝업 열고 닫기
    const handleComplete = () => {
        setPopup(!popup);
        console.log(popup);
    }

    // input 값 변경
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // 단체 인원 정보 변경
    const handleGroupMemberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setMemberName(value);
        } else if (name === 'phone') {
            setMemberPhone(value);
        }
    }
    // 단체 인원 정보 변경 성별
    const handleGroupMemberSex = (e: ChangeEvent<HTMLSelectElement>) => {
        setMemberSex(e.target.value);
    }

    // 단체 인원 추가
    const addGroupMember = () => {
        if (MemberName && MemberPhone) {
            setFormData(prev => ({
                ...prev,
                groupMembers: [...prev.groupMembers, { name: MemberName, phone: MemberPhone, gender: MemberSex }],
            }));
            setMemberName('');
            setMemberPhone('');
            setMemberName('성별');
        } else {
            alert('이름과 전화번호를 입력해주세요.');
        }
    }



    // 단체 인원 삭제
    const deleteMember = (index: number) => {
        setFormData(prev => ({
            ...prev,
            groupMembers: prev.groupMembers.filter((_, i) => i !== index)
        }));
    }

    // formData 로그 
    const logFormData = () => {
        console.log(formData);
    }

    // 신청서 제출
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.group === "단체" && formData.groupMembers.length === 0) {
            alert('단체 인원을 추가해주세요.');
            return;
        }

        const docRef = doc(collection(db, "attends"), formData.orderId);
        await setDoc(docRef, formData);
        alert('신청이 완료되었습니다. 결제 페이지로 이동합니다.');

        navigate('/checkout', { state: formData });
    };

    return (
        <Container>


            <Form onSubmit={handleSubmit}>
                <H1>{formData.group === "개인" ? "개인" : "단체"} 참가 신청
                    {["개인", "단체"].map((group, index) => (
                        <Label key={index} style={{ fontSize: "20px" }}>
                            <Checkbox
                                type="radio"
                                name="group"
                                value={group}
                                checked={formData.group === group}
                                onChange={handleChange}
                                required
                            />
                            {group}
                        </Label>
                    ))}
                </H1>

                {popup && <DaumPost address={formData} setAddress={setFormData} handleComplete={handleComplete} />}
                {formData.group === "단체" &&
                    <>
                        <Span>단체 이름</Span>
                        <Input
                            type="text"
                            name='groupName'
                            value={formData.groupName}
                            onChange={handleChange}
                            placeholder="이름"
                            required
                        />
                    </>
                }
                <Span>{formData.group === "단체" && "대표자"} 이름</Span>
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
                        name='adressDetail'
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
                {formData.group === "단체" &&
                    <>
                        <Span>단체 인원</Span>
                        <LineDiv style={{
                            flexDirection: windowWidth > 1200 ? 'row' : 'column',
                        }}>
                            <Input
                                type="text"
                                name='name'
                                value={MemberName}
                                onChange={handleGroupMemberChange}
                                placeholder="이름"
                            />
                            <Input
                                type="text"
                                name='phone'
                                value={MemberPhone}
                                onChange={handleGroupMemberChange}
                                placeholder="전화번호"
                            />
                            <Select value={MemberSex} onChange={handleGroupMemberSex}>
                                <option value="성별">성별</option>
                                <option value="여자">여자</option>
                                <option value="남자">남자</option>
                            </Select>
                            <Button type='button' onClick={addGroupMember}>추가</Button>
                        </LineDiv>
                        {formData.groupMembers.map((member, index) => (
                            <LineDiv key={index}>
                                <Span
                                    style={{
                                        margin: '0px',
                                        padding: '0px',
                                    }}
                                >{index + 1}.</Span>
                                <Span
                                    style={{
                                        margin: '0px',
                                        padding: '0px',
                                    }}
                                >{member.name}</Span>
                                <Span
                                    style={{
                                        margin: '0px',
                                        padding: '0px',
                                    }}
                                >{member.phone}</Span>
                                <Span
                                    style={{
                                        margin: '0px',
                                        padding: '0px',
                                    }}
                                >{member.gender}</Span>
                                <Icon onClick={() => deleteMember(index)}>
                                    <svg data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                                    </svg>
                                </Icon>
                            </LineDiv>
                        ))}
                    </>
                }
                <Span>코스 선택</Span>
                {["10km", "5km"].map((category, index) => (
                    <LineDiv>
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
                        <Span style={{
                            margin: '0px',
                        }}>{index === 0 ? "35000원" : "30000원"}</Span>
                    </LineDiv>
                ))}
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
                <SubmitButton type='submit'>다음으로</SubmitButton>
                <Link to="/checkout">다음으로 dev.ver</Link>
                <span onClick={logFormData}>formData log</span>
            </Form>
        </Container>
    );
};


