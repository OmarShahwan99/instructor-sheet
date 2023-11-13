import { Button } from 'antd';
import React from 'react';
import MyCol from '../myCol/MyCol';

const MyButtonFreeClass = (props) => {
    return (
        <MyCol
            order={props.order}
            span={props.span}
            xs={props.xs}
            sm={props.sm}
            md={props.md}
            lg={props.lg}
            xl={props.xl}
            flex={props.flex}
            offset={props.offset}
            pull={props.pull}
            push={props.push}
            RoleName={props.RoleName}
        >
            <Button
                {...props}
                block
                success
                className={` w-100  ${props.className ? props.className : ''}`}
                type={props.type}
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                onClick={props.onClick}
            >
                {props.children}
            </Button>
        </MyCol>
    );
};


export default MyButtonFreeClass;