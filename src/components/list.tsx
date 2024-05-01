import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase';

interface Attend {
    name: string;
    createdAt: string;
    totalPrice: number;
    status: string;
    group: string;
    category: string;
    phone: string;
    id: string;
}

// Styled Components 정의
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 90%;
    height: 100%;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  margin: 20px 0px;
  font-weight: 600;
  color: #333;
`;

const Table = styled.table`
  margin-top: 20px;
    width: 100%;
  border-collapse: collapse;
  text-align: center;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    display: table-cell;
    text-align: left;
    vertical-align: middle;
  }

  th {
    background-color: #f4f4f4;
  }
`;

const Filters = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const Filter = styled.select`
  margin-right: 10px;
  padding: 5px 10px;
`;

const SearchInput = styled.input`
  padding: 5px 10px;
  margin-right: 10px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
  margin-top: 20px;
  text-align: center;
`;

const PageButton = styled.button`
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const ITEMS_PER_PAGE = 10;

export default function List() {
    const [currentPage, setCurrentPage] = useState(1);
    const [courseFilter, setCourseFilter] = useState('');
    const [paidFilter, setPaidFilter] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [attends, setAttends] = useState<Attend[]>([]);

    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        const attendsQuery = query(collection(db, "attends"));
        const snapshot = await getDocs(attendsQuery);
        console.log("snaps", snapshot.docs);

        const attends = snapshot.docs.map((doc) => {
            const { name, createdAt, totalPrice, status, group, category, phone } = doc.data();
            return {
                name,
                createdAt: new Date(createdAt).toLocaleDateString(),
                totalPrice,
                status,
                group,
                phone,
                category,
                id: doc.id
            };
        });
        setAttends(attends);
    };

    const filteredData = attends
        .filter(applicant => (courseFilter ? applicant.category === courseFilter : true))
        .filter(applicant => (paidFilter ? applicant.status === paidFilter : true))
        .filter(applicant => applicant.name.toLowerCase().includes(nameSearch.toLowerCase()));

    const totalPageCount = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const currentPageData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <Container>
            <Title>신청 리스트</Title>
            <Filters>
                <SearchInput
                    type="text"
                    placeholder="이름 검색"
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                />
                <Filter value={courseFilter} onChange={e => setCourseFilter(e.target.value)}>
                    <option value="">전체 부분</option>
                    <option value="10km">10Km</option>
                    <option value="5km">5Km</option>
                </Filter>
                <Filter value={paidFilter} onChange={e => setPaidFilter(e.target.value)}>
                    <option value="">전체 입금</option>
                    <option value="paid">입금됨</option>
                    <option value="notPaid">입금되지 않음</option>
                </Filter>
            </Filters>
            <Table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>신청일자</th>
                        <th>단체명</th>
                        <th>이름</th>
                        <th>입금자명</th>
                        <th>부분</th>
                        <th>전화번호</th>
                        <th>금액</th>
                        <th>입금</th>
                        <th>입금날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((applicant, index) => (
                        <tr key={index + 1} style={{ height: "50px" }}>
                            <td>{index + 1}</td>
                            <td>{applicant.createdAt}</td>
                            <td>{applicant.group}</td>
                            <td>{applicant.name}</td>
                            <td>{applicant.name}</td>
                            <td>{applicant.category}</td>
                            <td>{applicant.phone}</td>
                            <td>{applicant.totalPrice}원</td>
                            <td>{applicant.status}</td>
                            <td>입금날짜</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ButtonContainer>
                {Array.from({ length: totalPageCount }).map((_, index) => (
                    <PageButton
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        style={{
                            backgroundColor: currentPage === index + 1 ? '#4CAF50' : 'white',
                            color: currentPage === index + 1 ? 'white' : '#333',
                            border: currentPage === index + 1 ? 'none' : '1px solid #ddd'

                        }}
                    >
                        {index + 1}
                    </PageButton>
                ))}
            </ButtonContainer>
        </Container>
    );
}