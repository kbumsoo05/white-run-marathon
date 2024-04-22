import styled from "styled-components";




const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 150px 0;
    gap: 20px;
`;

const H1 = styled.h1`
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 20px;
    font-family: "Sunflower", serif;
    font-weight: 400;
    font-style: normal;
    color: #e6a1ad;
`;

const CourseImg = styled.img`
    width: 100%;
    height: auto;
    max-width: 800px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    &:hover {
        transform: scale(1.02);
    }
`;


export default function Course() {



    return (
        <Wrapper>
            <H1>화이트런 마라톤 코스</H1>
            <CourseImg src="course.jpeg" draggable="false" />
        </Wrapper>
    );
}
