import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrppper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 60px;

`;

const HeadImg = styled.img`
    width: 60%;
    height: auto;
    display: flex;
    transition: opacity 1s ease;
    position: absolute;

    @media (max-width: 1200px) {
        width: 100%;
        min-width: unset;
    }
`;

const BodyImg = styled.img`
    width: 80%;
    margin: 50px 0px;
    @media (max-width: 1200px) {
        width: 100%;
    }
`;

const HeadImgDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: end;
    width: 100%;
    background-color: #ffc0cb;
    overflow: hidden;
    position: relative; // Parent relative positioning
    height: 600px; // Set a fixed height for the container
`;

const Dots = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    z-index: 96;
`;

const Dot = styled.div`
    padding: 5px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 50%;
    border: 2px solid white;
    width: 7px;
    height: 7px;
    
    &:hover {
        background-color: black;
        
    }
`;

const AttendBtn = styled(Link)`
    display: flex;
    justify-content: center;
    width: 100%;
`;

const AttendImg = styled.img`
    width: 20%;
`;

export default function Home() {
    const [headImg, setHeadImg] = useState(0);
    const [headImgHeight, setHeadImgHeight] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setHeadImg(prevHeadImg => (prevHeadImg + 1) % 3); // Cycles through 0, 1, 2
        }, 5000); // Changes every 5000 ms or 5 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    useEffect(() => {
        const updateHeight = () => {
            const imgElement = document.querySelector('.headImg'); // Change this selector if needed to be more specific
            if (imgElement) {
                setHeadImgHeight(imgElement.clientHeight);
            }
        };

        window.addEventListener('resize', updateHeight);
        updateHeight(); // Set initial height

        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    return (
        <Wrppper>
            <HeadImgDiv style={{
                height: headImgHeight,
            }}>
                <HeadImg
                    className="headImg"
                    style={{
                        opacity: headImg === 0 ? 1 : 0,
                    }}
                    src={"/headImg3.jpeg"} />
                <HeadImg
                    className="headImg"
                    style={{
                        opacity: headImg === 1 ? 1 : 0,
                    }}
                    src={"/headImg1.jpeg"} />
                <HeadImg
                    className="headImg"
                    style={{
                        opacity: headImg === 2 ? 1 : 0,
                    }}
                    src={"/headImg2.jpeg"} />
                <Dots>
                    {[0, 1, 2].map((index) => (
                        <Dot key={index} style={{ backgroundColor: headImg === index ? 'black' : 'gray' }} onClick={() => setHeadImg(index)} />
                    ))}
                </Dots>
            </HeadImgDiv>

            <BodyImg style={{
                width: "60%",
                marginBottom: "0px",
            }}
                src={"/attend.jpg"} />
            <AttendBtn to="/attend/attend-form">
                <AttendImg src={"/attendBtn.jpg"} />
            </AttendBtn>
            <BodyImg src={"/inform.jpg"} />
            <BodyImg src={"/donate.jpg"} />
            <BodyImg src={"/prize.jpg"} />
        </Wrppper>
    )

}