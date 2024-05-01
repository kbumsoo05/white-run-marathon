// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 150px 0px;
    gap: 150px;
`;

const LinkDiv = styled.div`
    display: flex;
    width: 100%;
    height: 500px;
    background-size: cover;
    background-position: center;
    justify-content: center;
    align-items: center;
    left: -300px;
    transition: opacity 0.4s ease, transform 0.5s ease-out;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 40px;
    color: white;
    font-weight: bold;
`;


export default function Attend() {
    // const [opacity, setOpacity] = useState(0);
    // const [opacity2, setOpacity2] = useState(0);
    // const [show, setShow] = useState(false);
    // const [show2, setShow2] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const currentScroll = window.scrollY;
    //         if (currentScroll >= 100) {
    //             setOpacity(1);
    //             setShow(true);
    //         }

    //         if (currentScroll >= 500) {
    //             setOpacity2(1);
    //             setShow2(true);
    //         }
    //     };
    //     handleScroll();
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    return (
        <Wrapper>
            <LinkDiv style={{
                backgroundImage: "url(https://cdn.imweb.me/thumbnail/20240314/34c488509fffb.jpg)",
                // opacity: opacity,
                // transform: `translateX(${show ? '0px' : '-300px'})`,
            }}>
                <StyledLink to="/attend/attend-form">참가신청</StyledLink>
            </LinkDiv>
            <LinkDiv style={{
                backgroundImage: "url(https://cdn.imweb.me/thumbnail/20240314/dce6b374dd86f.jpg)",
                // opacity: opacity2,
                // transform: `translateX(${show2 ? '0px' : '-300px'})`,
            }}>
                <StyledLink to="/attend/attend-form">참가 확인/수정</StyledLink>
            </LinkDiv>
        </Wrapper>
    )
}