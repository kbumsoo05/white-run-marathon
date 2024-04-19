import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 80px;
`;

const HeadImage = styled.img`

    width: 100%;
    height: auto;
    margin: 60px 0px;
    box-shadow: 5px 5px 5px #888888;
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
    const [opacity, setOpacity] = useState(0);
    const [opacity2, setOpacity2] = useState(0);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll >= 100) {
                setOpacity(1);
                setShow(true);
            }

            if (currentScroll >= 500) {
                setOpacity2(1);
                setShow2(true);
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Wrapper>
            <HeadImage src="https://cdn.imweb.me/thumbnail/20240327/fd5c198ef1500.jpg" alt="참가신청 이미지" />
            <LinkDiv style={{
                backgroundImage: "url(https://cdn.imweb.me/thumbnail/20240314/34c488509fffb.jpg)",
                opacity: opacity,
                transform: `translateX(${show ? '0px' : '-300px'})`,
            }}>
                <StyledLink to="/attend/attend-form">개인 참가신청</StyledLink>
            </LinkDiv>
            <LinkDiv style={{
                backgroundImage: "url(https://cdn.imweb.me/thumbnail/20240314/dce6b374dd86f.jpg)",
                opacity: opacity2,
                transform: `translateX(${show2 ? '0px' : '-300px'})`,
            }}>
                <StyledLink to="/attend/attend-form">단체 참가신청</StyledLink>
            </LinkDiv>
        </Wrapper>
    )
}