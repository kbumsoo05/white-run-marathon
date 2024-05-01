import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
    display: flex;
`;

const Block = styled.div`
    display: block;
    width: 200px;
    height: 100vh;
`;

const Sidebar = styled.div`
    width: 200px;
    background-color: #f9f9f9;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    border-right: 1px solid #dedede;
    padding: 20px;
    box-sizing: border-box;
    z-index: 100;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
`;

const SidebarSection = styled.div`
    padding-bottom: 20px;
    border-bottom: 1px solid #b8b8b8;

    &:last-child {
        border-bottom: none;
    }

    &:not(:last-child) {
        margin-bottom: 20px;
    }
`;

const SidebarTitle = styled.h3`
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
`;


const SidebarItem = styled(Link)`
    display: block;
    color: #666;
    padding: 8px 10px;
    margin: 2px 0;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #e0e0e0;
        color: #333;
    }
`;


const LogoutButton = styled.div`
    display: block;
    color: #666;
    padding: 8px 10px;
    margin: 2px 0;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        cursor: pointer;   
        background-color: #e0e0e0;
        color: #333;
    }
    font-size: 18px;
    font-weight: 600;
    color: white;
    background-color: #de9c9c;
`;

export default function AdminLayout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const a = confirm("로그아웃 할꺼냐는 내용");
        if (a) {
            await auth.signOut();
            navigate("/login");
        }
    }


    return (
        <Wrapper>
            <Sidebar>
                <SidebarSection>
                    <SidebarTitle>참가자 관리</SidebarTitle>
                    <SidebarItem to="/admin?page=1">신청리스트</SidebarItem>
                    <SidebarItem to="/admin?page=2">단체리스트</SidebarItem>
                    <SidebarItem to="/admin?page=3">환불요청리스트</SidebarItem>
                    <SidebarItem to="/admin?page=4">삭제리스트</SidebarItem>
                    <SidebarItem to="/admin?page=5">접수현황</SidebarItem>
                    <SidebarItem to="/admin?page=6">입금통계</SidebarItem>
                </SidebarSection>
                <SidebarSection>
                    <SidebarTitle>기록 및 기타 관리</SidebarTitle>
                    <SidebarItem to="/admin">기록관리</SidebarItem>
                </SidebarSection>
                <SidebarSection>
                    <SidebarTitle>게시판 관리</SidebarTitle>
                    <SidebarItem to="/admin">공지사항</SidebarItem>
                    <SidebarItem to="/admin">자유게시판</SidebarItem>
                    <SidebarItem to="/admin">대회갤러리</SidebarItem>
                </SidebarSection>
                <SidebarSection>
                    <SidebarTitle>대회 관리</SidebarTitle>
                    <SidebarItem to="/admin">대회설정</SidebarItem>
                    <SidebarItem to="/admin">팝업</SidebarItem>
                    <SidebarItem to="/admin">관리자설정</SidebarItem>
                    <SidebarItem to="/admin">접속통계</SidebarItem>
                </SidebarSection>
                <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </Sidebar>
            <Block></Block>
            <Outlet />
        </Wrapper>
    )
}
