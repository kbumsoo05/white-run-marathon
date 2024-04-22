import { useRef, useEffect, useState, FunctionComponent } from 'react';

const TimerComponent: FunctionComponent = () => {
    const intervalRef = useRef<number | null>(null); // interval ID를 저장하기 위한 ref
    const [seconds, setSeconds] = useState<number>(0); // 현재 초를 표시하기 위한 state

    useEffect(() => {
        intervalRef.current = window.setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000); // 매 초마다 seconds 상태를 업데이트

        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current); // 컴포넌트 언마운트 시 타이머 정지
            }
        };
    }, []);

    const stopTimer = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current); // Stop 버튼 클릭 시 타이머 정지
        }
    };

    return (
        <div>
            <h1>Timer: {seconds} seconds</h1>
            <button onClick={stopTimer}>Stop Timer</button>
        </div>
    );
};

export default TimerComponent;
