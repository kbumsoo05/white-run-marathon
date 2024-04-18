import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div``;



const Menu = styled.div`
    width: 100vw;
    padding-top: 40px;
    height: auto;
    display: flex;
    align-items: start;
    gap: 40px;
    justify-content: start;
    position: fixed;
    top: 0px;
    overflow: hidden;
    border-bottom: 1px solid #f1f1f1;
    
    background-color: #DBF0FF;

`;

const GhoastDiv = styled.div`
    height: 120px;
`;

const MenuBar = styled.div`
    display: flex;
    justify-content: space-around;
`;

const MenuLine = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin: 0px;
    padding: 10px 30px ;
    gap: 30px;
    height: 60px;
    transition: height 0.3s ease;

    &:hover {
        height: 200px;
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


export default function Layout() {
    return (

        <Wrapper>
            <Menu>

                <HomeLink to="/">화이트마라톤</HomeLink>
                <MenuBar>
                    <MenuLine>
                        <StyledLink to="/information">대회안내</StyledLink>
                        <DetailLink to="/attend">참가신청</DetailLink>
                        <DetailLink to="/course">코스안내</DetailLink>
                        <DetailLink to="/noticeboard">대회기록</DetailLink>
                    </MenuLine>
                    <MenuLine>
                        <StyledLink to="/attend">참가신청</StyledLink>
                        <DetailLink to="/attend">참가신청</DetailLink>
                        <DetailLink to="/course">코스안내</DetailLink>
                        <DetailLink to="/noticeboard">대회기록</DetailLink>
                    </MenuLine>
                    <MenuLine>
                        <StyledLink to="/course">코스안내</StyledLink>
                    </MenuLine>
                    <MenuLine>
                        <StyledLink to="/record">대회기록</StyledLink>
                    </MenuLine>
                    <MenuLine>
                        <StyledLink to="/noticeboard">게시판</StyledLink>
                    </MenuLine>
                </MenuBar>
            </Menu>
            <GhoastDiv></GhoastDiv>
            <Outlet />
        </Wrapper>
    );
}