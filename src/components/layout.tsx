import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div``;



const Menu = styled.div`
    display: flex;
    width: 100vw;
    height: auto;
    align-items: start;
    gap: 40px;
    justify-content: start;
    position: fixed;
    top: 0px;
    overflow: hidden;
    border-bottom: 1px solid #6e6e6e;
    transition: display 0.4s ease ;
    z-index: 97;
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
    margin-top: 40px;
    padding: 10px 30px ;
    gap: 20px;
    height: 60px;
    transition: height 0.3s ease;

    &:hover {
        height: 200px;
        border-top: 1px solid black;
    }
`;



const HomeLink = styled(Link)`
    display: flex;
    height: 100px;
    margin: 20px 30px;
    margin-left: 100px;
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
    height: 100px;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    background-color: #515b61;
    padding-bottom: 10px;
`;

const Span = styled.span`
    color: white;
    font-size: 10px;
    margin: 5px;

`;

const MobileMenuBtn = styled.div`
    display: flex;
    right: 0px;
    position: fixed;
    color: #ab838a;
    margin-top: 20px;
    margin-right: 20px;
    height: 40px;
    width: 40px;
    transition: transform 0.3s ease;
    z-index: 100;
`;

const MobileMenu = styled.div`
    display: flex;
    position: fixed;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    right: 0px;
    height: 100vh;
    width: 70vw;
    gap: 30px;
    background-color: white;
    opacity: 1;
    padding-top: 80px;
    z-index: 99;
    
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    `;

const MobOpenLink = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 20px;
    transition: height 0.3s ease;
    overflow: hidden;
`;


const MobLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 20px;
    font-weight: 500;
    padding-left: 10vw;
`;

const Open = styled.div`
    display: flex;
    width: 100%;
    font-size: 26px;
    font-weight: 600;
    padding-left: 10vw;
    justify-content: start;
    align-items: center;
`;

export default function Layout() {
    const [opacity, setOpacity] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [MobShowInfo, setMobShowInfo] = useState(false);
    const [MobShowPost, setMobShowPost] = useState(false);

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

    const handleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    }

    const handleMobShowInfo = () => {
        setMobShowInfo(!MobShowInfo);
    }

    const handleMobShowPost = () => {
        setMobShowPost(!MobShowPost);
    }

    return (

        <Wrapper>
            <Menu style={{
                opacity: windowWidth > 1200 ? opacity : 1,
                visibility: opacity ? 'visible' : windowWidth > 1200 ? 'hidden' : 'visible',
                transition: 'opacity 0.2s ease, visibility 0.2s ease',
                justifyContent: windowWidth < 1200 ? 'space-between' : 'start',
            }}>

                <HomeLink to="/" style={{
                    height: windowWidth < 1200 ? '80px' : '100px',
                    margin: windowWidth < 1200 ? '20px 0px' : '20px 7vw',
                    marginLeft: windowWidth < 1200 ? '25px' : '12vw',
                }} ><img src="/logo.jpg" /></HomeLink>
                {windowWidth > 1200 &&
                    <MenuBar>
                        <MenuLine>
                            <StyledLink to="/information">대회안내</StyledLink>
                            <DetailLink to="/information">대회개요</DetailLink>
                            <DetailLink to="/information">참가자 유의사항</DetailLink>
                            <DetailLink to="/information">찾아오시는길</DetailLink>
                            <DetailLink to="/information">시상 및 기념품</DetailLink>
                        </MenuLine>
                        <MenuLine>
                            <StyledLink to="/attend">참가신청</StyledLink>
                            <DetailLink to="/attend">개인/단체 참가신청</DetailLink>
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
                }
                {windowWidth < 1200 ?
                    <>
                        <MobileMenuBtn style={{
                            transform: `${showMobileMenu ? `translateX(-${windowWidth * 7 / 10 - 80}px) rotate(180deg)` : `translateX(0px) rotate(0deg)`}`
                        }} onClick={handleMobileMenu}>
                            <svg data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" />
                            </svg>
                        </MobileMenuBtn>
                        <MobileMenu style={{
                            transform: showMobileMenu ? 'translateX(0px)' : 'translateX(70vw)',
                            boxShadow: showMobileMenu ? '5px 5px 50px #888888' : 'none',
                        }}>
                            <MobOpenLink style={{
                                height: MobShowInfo ? '220px' : '40px',
                            }}>
                                <Open onClick={handleMobShowInfo}>
                                    대회안내
                                    <MobileMenuBtn style={{
                                        position: 'relative',
                                        padding: '0px',
                                        margin: '0px',
                                        transform: MobShowInfo ? 'rotate(0deg)' : 'rotate(-180deg)',
                                    }}>
                                        <svg data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
                                        </svg>
                                    </MobileMenuBtn>
                                </Open>
                                <MobLink
                                    to="/information"
                                    style={{
                                        visibility: MobShowInfo ? 'visible' : 'hidden',
                                    }}>대회개요</MobLink>
                                <MobLink
                                    to="/information"
                                    style={{
                                        visibility: MobShowInfo ? 'visible' : 'hidden',
                                    }}>참가자 유의사항</MobLink>
                                <MobLink
                                    to="/information"
                                    style={{
                                        visibility: MobShowInfo ? 'visible' : 'hidden',
                                    }}>찾아오시는길</MobLink>
                                <MobLink
                                    to="/information"
                                    style={{
                                        visibility: MobShowInfo ? 'visible' : 'hidden',
                                    }}>시상 및 기념품</MobLink>
                            </MobOpenLink>

                            <MobLink to="/attend/attend-form">참가신청</MobLink>
                            <MobLink to="/attend">참가 확인/수정</MobLink>
                            <MobLink to="/course">코스안내</MobLink>
                            <MobLink to="/record">대회기록 조회</MobLink>

                            <MobOpenLink style={{
                                height: MobShowPost ? '220px' : '40px',
                            }}>
                                <Open onClick={handleMobShowPost}>게시판
                                    <MobileMenuBtn style={{
                                        position: 'relative',
                                        padding: '0px',
                                        margin: '0px',
                                        transform: MobShowPost ? 'rotate(0deg)' : 'rotate(-180deg)',
                                    }}>
                                        <svg data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
                                        </svg>
                                    </MobileMenuBtn>
                                </Open>
                                <MobLink to="/noticeboard" style={{
                                    visibility: MobShowPost ? 'visible' : 'hidden',
                                }}>공지사항</MobLink>
                                <MobLink to="/noticeboard" style={{
                                    visibility: MobShowPost ? 'visible' : 'hidden',
                                }}>자유게시판</MobLink>
                                <MobLink to="/noticeboard" style={{
                                    visibility: MobShowPost ? 'visible' : 'hidden',
                                }}>대회 갤러리</MobLink>
                            </MobOpenLink>

                        </MobileMenu>
                    </>
                    :
                    null
                }

            </Menu>
            <GhoastDiv style={{
                height: windowWidth < 1200 ? '120px' : '140px',
            }}></GhoastDiv>
            <Outlet />
            <EndDiv>
                <Span>2024 화이트런 세계한인 마라톤 대회</Span>
                <Span>이용약관</Span>
                <Span>개인정보처리방침</Span>
                <Span>화이트런 주소풍 최종화 이사 010.5685.1802| k-sopung@naver.com</Span>
            </EndDiv>
        </Wrapper>
    );
}