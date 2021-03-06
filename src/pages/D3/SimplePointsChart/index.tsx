import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Input } from 'antd'
import D3SimplePointsChart from "../components/charts/D3SimplePointsChart";
import styles from './index.less';



const SimplePointsChart: React.FC<{}> = (props) => {

    const data = [
        [5, 66],
        [7, 55],
        [4, 99],
        [11, 78],
        [28, 65],
        [7, 88],
        [5, 56],
        [2, 60],
        [4, 57],
        [6, 98],
        [27, 33],
        [26, 77],
        [23, 95],
        [34, 87],
        [7, 68],
        [1, 68],
        [2, 60],
        [22, 84],
        [6, 96],
        [13, 87]
      ]

    return (
        <div className={styles.main}>
            <Row gutter={10}>
                <Col className="gutter-row" md={24}>
                    <div className="gutter-box">
                        <Card title="D3 简单散点图" bordered={false}>
                            <D3SimplePointsChart points={data} />
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default SimplePointsChart;
