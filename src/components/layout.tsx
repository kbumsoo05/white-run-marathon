import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div``;



const Menu = styled.div`
    width: 100vw;
    padding-top: 30px;
    height: auto;
    display: flex;
    align-items: start;
    gap: 40px;
    justify-content: start;
    position: fixed;
    top: 0px;
    overflow: hidden;
    border-bottom: 1px solid #6e6e6e;
    transition: display 0.4s ease ;
    
    background-color: white;

`;

const GhoastDiv = styled.div`
    height: 110px;
`;

const MenuBar = styled.div`
    display: flex;
    justify-content: space-around;
`;

const MenuLine = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin: 0px;
    padding: 10px 30px ;
    gap: 20px;
    height: 60px;
    transition: height 0.3s ease;

    &:hover {
        height: 240px;
        border-top: 1px solid black;
    }
`;



const HomeLink = styled(Link)`
    display: flex;
    font-size: 40px;
    padding: 0px 7vw;
    font-weight: bold;
    text-decoration: none;
    color: black;
`;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: black;
  font-weight: 500;
  font-size: 22px;
  margin-bottom: 20px;
`;

const DetailLink = styled(Link)`
    text-decoration: none;
    opacity: 0;
    color: black;
    transition: opacity 0.4s ease ;

    ${MenuBar}:hover & {
        opacity: 1;
    }
`;

const EndDiv = styled.div`
    display: flex;
    width: 100vw;
    height: 160px;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    background-color: #515b61;
    margin-top: 50px;
    padding-bottom: 10px;
`;

const Span = styled.span`
    color: white;
    font-size: 10px;
    margin: 5px;

`;


export default function Layout() {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const threshold = 100; // 표시/숨김을 토글할 스크롤 위치
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            // 스크롤 위치에 따라 투명도 조절
            if (currentScroll > threshold) {
                setOpacity(0);
            } else {
                setOpacity(1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (

        <Wrapper>
            <Menu style={{
                opacity: opacity,
                visibility: opacity ? 'visible' : 'hidden',
                transition: 'opacity 0.2s ease, visibility 0.2s ease'
            }}>

                <HomeLink to="/">화이트마라톤</HomeLink>
                <MenuBar>
                    <MenuLine>
                        <StyledLink to="/information">대회안내</StyledLink>
                        <DetailLink to="/information">대회개요</DetailLink>
                        <DetailLink to="/information">회장인사말</DetailLink>
                        <DetailLink to="/information">참가자 유의사항</DetailLink>
                        <DetailLink to="/information">찾아오시는길</DetailLink>
                        <DetailLink to="/information">시상 및 기념품</DetailLink>
                    </MenuLine>
                    <MenuLine>
                        <StyledLink to="/attend">참가신청</StyledLink>
                        <DetailLink to="/attend">개인 참가신청</DetailLink>
                        <DetailLink to="/attend">단체 참가신청</DetailLink>
                        <DetailLink to="/attend">참가 확인/수정</DetailLink>
                    </MenuLine>
                    <MenuLine>
                        <StyledLink to="/course">코스안내</StyledLink>
                        <DetailLink to="/course">코스도</DetailLink>
                    </MenuLine>
                    <MenuLine>
                        <StyledLink to="/record">대회기록</StyledLink>
                        <DetailLink to="/record">기록조회</DetailLink>
                    </MenuLine>
                    <MenuLine>
                        <StyledLink to="/noticeboard">게시판</StyledLink>
                        <DetailLink to="/noticeboard">공지사항</DetailLink>
                        <DetailLink to="/noticeboard">자유게시판</DetailLink>
                        <DetailLink to="/noticeboard">대회 갤러리</DetailLink>
                    </MenuLine>
                </MenuBar>
            </Menu>
            <GhoastDiv></GhoastDiv>
            <Outlet />
            <EndDiv>
                <Span>2024 경인아라뱃길 세계한인 마라톤 대회</Span>
                <Span>이용약관</Span>
                <Span>개인정보처리방침</Span>
                <Span>Copyright C 2024 세계 한인 아라뱃길 마라톤대회 All right reserved</Span>
            </EndDiv>
        </Wrapper>
    );
}