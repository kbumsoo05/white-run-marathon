import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';


// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

const Header = styled.h1`
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    margin: 20px 0px;
  color: #333;
`;

const Section = styled.section`
  margin: 20px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Status() {
    const [datas, setDatas] = React.useState({
        courseDetails: [
            { name: "전체", value: 120 },
            { name: "10km 여자", value: 30 },
            { name: "10km 남자", value: 30 },
            { name: "5km 여자", value: 35 },
            { name: "5km 남자", value: 25 },
        ],
        groupType: [
            { name: "개인", value: 70 },
            { name: "단체", value: 50 },
        ],
        paymentStatus: [
            { name: "입금", value: 90 },
            { name: "미입금", value: 30 },
        ],
    });


    useEffect(() => {
        getDatas();
    }, []);

    const getDatas = async () => {
        const attendsQuery = query(collection(db, "attends"));
        const snapshot = await getDocs(attendsQuery);

        let newDatas = {
            courseDetails: [
                { name: "전체", value: 0 },
                { name: "10km 여자", value: 0 },
                { name: "10km 남자", value: 0 },
                { name: "5km 여자", value: 0 },
                { name: "5km 남자", value: 0 },
            ],
            groupType: [
                { name: "개인", value: 0 },
                { name: "단체", value: 0 },
            ],
            paymentStatus: [
                { name: "입금", value: 0 },
                { name: "미입금", value: 0 },
            ],
        };

        snapshot.forEach((doc) => {
            const data = doc.data();

            if (data.category === "10km") {
                if (data.gender === "여자") {
                    newDatas.courseDetails[1].value += 1;
                } else {
                    newDatas.courseDetails[2].value += 1;
                }
            } else if (data.category === "5km") {
                if (data.gender === "여자") {
                    newDatas.courseDetails[3].value += 1;
                } else {
                    newDatas.courseDetails[4].value += 1;
                }
            }
            // 단체와 개인 수 계산
            if (data.group === "개인") {
                newDatas.groupType[0].value += 1; // 개인
                newDatas.courseDetails[0].value += 1;

                if (data.status === "입금") {
                    newDatas.paymentStatus[0].value += 1;
                } else {
                    newDatas.paymentStatus[1].value += 1;
                }

            } else if (data.group === "단체") {
                newDatas.groupType[1].value += data.groupMembers.length + 1; // 단체
                newDatas.courseDetails[0].value += data.groupMembers.length + 1;

                if (data.status === "입금") {
                    newDatas.paymentStatus[0].value += data.groupMembers.length + 1;
                } else {
                    newDatas.paymentStatus[1].value += data.groupMembers.length + 1;
                }

                data.groupMembers.forEach((member: any) => {
                    if (member.gender === "남자") {
                        if (member.category === "10km") {
                            newDatas.courseDetails[1].value += 1;
                        } else {
                            newDatas.courseDetails[3].value += 1;
                        }
                    } else {
                        if (member.category === "10km") {
                            newDatas.courseDetails[2].value += 1;
                        } else {
                            newDatas.courseDetails[4].value += 1;
                        }
                    }
                });
            }
        });

        setDatas(newDatas);
    }



    return (
        <PageContainer>
            <Header>참가접수 현황</Header>
            <Section>
                <PieChart width={400} height={300}>
                    <Pie dataKey="value" isAnimationActive={true} data={datas.groupType} cx={200} cy={150} outerRadius={80} fill="#8884d8" label>
                        {datas.groupType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
                <PieChart width={400} height={300}>
                    <Pie dataKey="value" isAnimationActive={true} data={datas.paymentStatus} cx={200} cy={150} outerRadius={80} fill="#8884d8" label>
                        {datas.paymentStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </Section>
            <Section>
                <BarChart width={500} height={300} data={datas.courseDetails}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </Section>
        </PageContainer>
    );
}
