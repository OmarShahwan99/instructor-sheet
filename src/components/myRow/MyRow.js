import React from 'react';
import { Row } from 'antd';


const MyRow = (props) => {
  return (

      <Row
        style={props.style}
        wrap={props.wrap}
        justify={props.justify}
        align={props.align}
        gutter={props.gutter}
        className={props.className + ' MyRow'}
        onClick={props.onClick}
      // key={props.key}
      >
        {props.children}

      </Row>
  )
};
MyRow.defaultProps = {
  justify: "center",
}

export default MyRow;
