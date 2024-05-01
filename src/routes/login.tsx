import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';
import { MainColor } from '../components/color';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    gap: 20px;
    background-color: #f4f4f4;  // A soft background color
    padding: 20px;
    border-radius: 8px; // Rounded corners
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1); // Subtle shadow
`;

const H1 = styled.h1`
    color: #333; // Dark grey color for text
    font-size: 24px; // Slightly larger font size
`;

const Input = styled.input`
    width: 20%; // Control width
    padding: 10px;
    margin: 5px 0;
    border: none;
    border-radius: 5px; // Rounded corners
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2); // Inset shadow for depth
    font-size: 16px; // Bigger font for readability
`;

const Button = styled.button`
    width: 15%;
    padding: 10px;
    background-color: ${MainColor}; // A pleasant blue
    border: none;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handleLogin = async () => {
        if (loading || email === "" || password === "") {
            setError("빈칸을 채워주세요");
            return;
        }
        try {
            setError("");
            setLoading(true);
            const credentials = await signInWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            navigate("/admin");
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.log(e.message);
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            navigate("/admin");
        }
    }, []);

    return (
        <Wrapper>
            <H1>관리자 로그인</H1>
            <Input
                type="text"
                name='email'
                placeholder="아이디"
                value={email}
                onChange={onChange}
            />
            <Input
                type="password"
                name='password'
                placeholder="비밀번호"
                value={password}
                onChange={onChange}
            />
            {error && <p>{error}</p>}
            <Button onClick={handleLogin} disabled={loading}>
                {loading ? "로딩중..." : "로그인"}
            </Button>
        </Wrapper>
    );
}
