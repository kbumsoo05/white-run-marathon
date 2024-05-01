import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

`;

export function FailPage() {
    const [searchParams] = useSearchParams();

    return (
        <Wrapper id="info" className="box_section" style={{ width: "600px" }}>
            <img width="100px" src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png" alt="에러 이미지" />
            <h2>결제를 실패했어요</h2>

            <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
                <div className="p-grid-col text--left">
                    <b>에러메시지</b>
                </div>
                <div className="p-grid-col text--right" id="message">{`${searchParams.get("message")}`}</div>
            </div>
            <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
                <div className="p-grid-col text--left">
                    <b>에러코드</b>
                </div>
                <div className="p-grid-col text--right" id="code">{`${searchParams.get("code")}`}</div>
            </div>

            <div className="p-grid-col">
                <Link to="https://docs.tosspayments.com/guides/payment-widget/integration">
                    <button className="button p-grid-col5">연동 문서</button>
                </Link>
                <Link to="https://discord.gg/A4fRFXQhRu">
                    <button className="button p-grid-col5" style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}>
                        실시간 문의
                    </button>
                </Link>
            </div>
        </Wrapper>
    );
}