import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default function Information() {
    return (
        <Wrapper>
            <h1>Information!</h1>
            <h1>Information!</h1>
            <h1>Information!</h1>
            <Outlet />
        </Wrapper>
    );
};