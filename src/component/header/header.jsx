import React from 'react';
import { Avatar } from 'antd';

const SubHeader = () => {
    return (
        <>
            <div
                style={{
                    backgroundColor: "#2867af",
                    height: "47px"
                }}
            >
                <Avatar
                    style={{
                        backgroundColor: 'skyblue',
                        verticalAlign: 'middle',
                        float: "right",
                        marginRight: "20px",
                        marginTop: "8px"
                    }}
                    size={30}
                    gap={1}
                >
                    U
                </Avatar>
                <p
                    style={{
                        float: "right",
                        color: "white",
                        marginRight: "10px",
                        marginTop: "10px",
                        fontWeight: "bold"
                    }}
                >
                    Hello User
                </p>
            </div>
        </>
    )
}

export default SubHeader;