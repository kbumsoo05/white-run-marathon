import styled from 'styled-components';
import Status from '../components/status';
import List from '../components/list';
import { useLocation } from 'react-router-dom';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
`;

export default function AdminPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');

    return (
        <Wrapper>
            {page ? null : <Status />}
            {page === "1" && <List />}
            {page === "5" && <Status />}
        </Wrapper>
    );
}
