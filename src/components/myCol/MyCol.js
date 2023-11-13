import React from 'react';
import { Col } from 'antd';

const MyCol = (props) => {
    return (

        <Col
            order={props.order}
            span={props.span}
            xs={props.xs}
            sm={props.sm}
            md={props.md}
            lg={props.lg}
            xl={props.xl}
            xxl={props.xxl}
            flex={props.flex}
            offset={props.offset}
            pull={props.pull}
            push={props.push}
            className={props.className}
            onClick={props.onClick}
            hidden={props.hidden}
            onKeyPress={props.onKeyPress}
            style={props.style}
            id={props.id}
        >
            {props.children}
        </Col>
    )
};

export default MyCol;
