import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode"
import { styled } from "styled-components"

const DaumPostBackground = styled.div`
    position :fixed;
    top : 0;
    left : 0;
    bottom : 0;
    right : 0;
    background : rgba(0, 0, 0, 0.8);
`

const DaumPostContainer = styled.div`

    width : 500px;
    position : absolute;
    left : 50%;
    top: 50%;
    transform : translate(-50%, -50%);


`
const PostHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Close = styled.div`
    width: 45px;
    height: 45px;
    cursor: pointer;
    color: #fff;
`;

const H1 = styled.h1`
    margin-left: 10px;
    font-size: 20px;
    color: #fff;
`;
/* 다음 주소 검색 API에서 주소를 검색 후 주소를 클릭 시 창이 닫힙니다.

이때, complete 함수로 클릭한 주소 정보(주소(fullAddress), 

우편번호(zonecode))를 변수에 저장후 이 값을 상태값(form 값)으로 설정합니다. */


export default function DaumPost(props: any) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

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


    /* 아래 함수로 들어오는 파라미터 (data)의 정체가 무엇일까를
    생각해 보았는데 DaumPostcode props중에 onComplete가 있는데,
    주소를 클릭하고 창이 닫힐때
    선택한 주소에 대한 파라미터 정보가 이곳으로 전달되는 것 같습니당..... */

    const complete = (data: any) => {
        let fullAddress = data.address;
        let zonecode = data.zonecode
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        console.log(data)
        console.log(fullAddress)
        console.log(data.zonecode)

        // 선택한 주소값을 상태값으로 설정
        props.setAddress((prev: FormData) => ({
            ...prev,
            address: fullAddress,
            zonecode: zonecode,
        }))

        // 팝업창 닫기(팝업창 'X' 표시)
        props.handleComplete();

    }
    return (
        <DaumPostBackground>
            <DaumPostContainer style={{
                width: windowWidth > 500 ? "500px" : "100%"

            }}>
                <PostHeader>
                    <H1>주소 검색</H1>
                    <Close onClick={() => { props.handleComplete() }}>
                        <svg data-slot="icon" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                        </svg>
                    </Close>
                </PostHeader>
                <DaumPostcode
                    autoClose
                    style={{
                        height: "500px", width: "500px"
                    }}
                    onComplete={complete} />
            </DaumPostContainer>
        </DaumPostBackground>
    )
}