import React from 'react';
import Boxable from './Boxable';
import Box from './Box';
import './DragThingsToBoxesDemo.css';
import banana from './img/banana.png';
import surprise from './img/surprise.png';
import orange from './img/orange.png';
import pickle from './img/pickle.png';
import gorilla from './img/gorilla.png';
import puppy from './img/puppy.png';




export default class DragThingsToBoxesDemo extends React.Component {
  render() {
    return (
      <div className="drag_things_to_boxes">
            <div className="things_to_drag">
          <Boxable targetKey="box" label="bananas"  image={banana}/>
          <Boxable targetKey="box" label="cheeseburger"  image={surprise}/>
          <Boxable targetKey="box" label="orange" image={orange}/>
          <Boxable targetKey="box" label="pickle" image={pickle}/>
          <Boxable targetKey="box" label="gorilla" image={gorilla}/>
          <Boxable targetKey="box" label="puppy" image={puppy}/>
        </div>
        <div className="boxes">
          <Box title={"Food"}  targetKey="box"/>
          <Box title={"animal"} targetKey="box"/>
        </div>
        <div style={{clear: 'both'}}>&nbsp;</div>

    

      </div>
    )
  }
}