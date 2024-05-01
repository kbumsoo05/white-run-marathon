import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { db } from "../firebase";

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

export function SuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [responseData, setResponseData] = useState(null);
    const orderId = searchParams.get("orderId");
    const docRef = orderId ? doc(db, "attends", orderId) : null;

    const confirmPayment = async () => {
        const requestData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
        };

        const secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6"; // TODO: Change to your real secret key
        const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

        const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
            method: "POST",
            headers: {
                Authorization: encryptedSecretKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        const json = await response.json();

        if (!response.ok) {
            console.log(json);
            navigate(`/fail?code=${json.code}&message=${json.message}`);
            return;
        }

        setResponseData(json);

        if (docRef) {
            await updateDoc(docRef, {
                status: "paid",
                paymentKey: searchParams.get("paymentKey"),
            });
        }
    };

    return (
        <Wrapper>
            <div className="box_section" style={{ width: "600px" }}>
                <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" alt="결제 성공 이미지" />
                <h2>결제를 완료했어요</h2>
                <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
                    <div className="p-grid-col text--left">
                        <b>결제금액</b>
                    </div>
                    <div className="p-grid-col text--right" id="amount">
                        {`${Number(searchParams.get("amount")).toLocaleString()}원`}
                    </div>
                </div>
                <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
                    <div className="p-grid-col text--left">
                        <b>주문번호</b>
                    </div>
                    <div className="p-grid-col text--right" id="orderId">
                        {searchParams.get("orderId")}
                    </div>
                </div>
                <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
                    <div className="p-grid-col text--left">
                        <b>paymentKey</b>
                    </div>
                    <div className="p-grid-col text--right" id="paymentKey" style={{ whiteSpace: "initial", width: "250px" }}>
                        {searchParams.get("paymentKey")}
                    </div>
                </div>
                <button onClick={confirmPayment} style={{ marginTop: "20px", fontSize: "16px", padding: "10px 20px" }}>
                    결제 완료 처리
                </button>
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
            </div>
            <div className="box_section" style={{ width: "600px", textAlign: "left" }}>
                <b>Response Data :</b>
                <div id="response" style={{ whiteSpace: "initial" }}>
                    {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
                </div>
            </div>
        </Wrapper>
    );
}
