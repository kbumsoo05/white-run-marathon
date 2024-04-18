import styled from "styled-components";

const Wrppper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150vh;
    font-size: 20px;
`;

export default function Home() {
    return (
        <Wrppper>
            <h1>Home!</h1>
        </Wrppper>
    )

}