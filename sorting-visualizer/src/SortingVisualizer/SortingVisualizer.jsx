import React from 'react';
import { getMergeSortAnimations, getbubbleSortAnimation, quickSortAnimation, heapSortAnimation } from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingVisualizer.css';
import { Input, Label } from 'reactstrap';//  I use reactrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Draggable from 'react-draggable';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS_MIN = 1;
const ANIMATION_SPEED_MS_MAX = 100;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'grey';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      speed: (ANIMATION_SPEED_MS_MIN + ANIMATION_SPEED_MS_MAX) / 2,
      buttonEnable: false,
      operator:0,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

  async mergeSort() {
    this.setState({ buttonDisable: true,operator:0 });
    let copy = this.state.array.map(item => item);
    const animations = getMergeSortAnimations(copy);
    let wait = await delay(this.state.speed);
    for (let i = 0; i < animations.length; i++) {
      this.setState((preState)=>{return {operator:preState.operator+1}});
      wait = await delay(this.state.speed);
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        wait = await delay(this.state.speed);
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      } else {
        wait = await delay(this.state.speed);
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;

      }
      console.log("wait ", wait)
    }
    this.setState({ buttonDisable: false })
  }

  async quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    this.setState({ buttonDisable: true,operator:0 });
    const animations = quickSortAnimation(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      this.setState((preState)=>{return {operator:preState.operator+1}});
      const arrayBars = document.getElementsByClassName('array-bar');
      // console.log(arrayBars);
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        await delay(this.state.speed);
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      } else {

        const [idx1, newHeight1, idx2, newHeight2] = animations[i];
        const barOneStyle = arrayBars[idx1].style;
        barOneStyle.height = `${newHeight1}px`;
        const barTwoStyle = arrayBars[idx2].style;
        barTwoStyle.height = `${newHeight2}px`;
        await delay(this.state.speed);
      }
    }
    this.setState({ buttonDisable: false })
  }

  async heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    this.setState({ buttonDisable: true,operator:0 });
    const animations = heapSortAnimation(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      this.setState((preState)=>{return {operator:preState.operator+1}})
      const arrayBars = document.getElementsByClassName('array-bar');
      // console.log(arrayBars);
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        await delay(this.state.speed);
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;

      } else {
        await delay(this.state.speed);
        const [idx1, newHeight1, idx2, newHeight2] = animations[i];
        const barOneStyle = arrayBars[idx1].style;
        barOneStyle.height = `${newHeight1}px`;
        const barTwoStyle = arrayBars[idx2].style;
        barTwoStyle.height = `${newHeight2}px`;

      }
    }
    this.setState({ buttonDisable: false })
  }

  async bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    this.setState({ buttonDisable: true,operator:0 });
    const animations = getbubbleSortAnimation(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      this.setState((preState)=>{return {operator:preState.operator+1}})
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        await delay(this.state.speed);
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      } else {
        await delay(this.state.speed);
        const [idx1, newHeight1, idx2, newHeight2] = animations[i];
        const barOneStyle = arrayBars[idx1].style;
        barOneStyle.height = `${newHeight1}px`;
        const barTwoStyle = arrayBars[idx2].style;
        barTwoStyle.height = `${newHeight2}px`;

      }
    }
    this.setState({buttonDisable:false});
  }

  eventHandler(e,data){
    console.log('Event Type', e.type);
    console.log({e, data});
  }

  render() {
    const { array } = this.state;

    return (
      <>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}></div>
          ))}
        </div>
        <button onClick={() => this.resetArray()} disabled={this.state.buttonDisable}>Generate new Array</button>
        <button onClick={() => this.mergeSort()} disabled={this.state.buttonDisable}>Merge Sort</button>
        <button onClick={() => this.quickSort()} disabled={this.state.buttonDisable}>Quick Sort</button>
        <button onClick={() => this.heapSort()} disabled={this.state.buttonDisable}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()} disabled={this.state.buttonDisable} >Bubble Sort</button>
        <div
          sm="4"
          xs="6">
          <Label for="exampleRange">Speed&Range</Label>
          <Input
            id="speed"
            name="range"
            type="range"
            min={ANIMATION_SPEED_MS_MIN}
            max={ANIMATION_SPEED_MS_MAX}
            // value = {this.state.speed}
            onChange={(e) => { this.setState({ speed: e.target.value }); }}
          />

        </div>
        <Draggable
        
        scale={1}
        onStart={(e,data)=>this.eventHandler(e,data)}
        onDrag={(e,data)=>this.eventHandler(e,data)}
        onStop={(e,data)=>this.eventHandler(e,data)}>
        <div style={{border: "2px solid red", padding: "1rem", width: "30%"}}>
          <div style={{backgroundColor: "green", width: "30%"}} className="handle">
              Number of operators:
          </div>
          <div>{this.state.operator}</div>
      </div>
      </Draggable>
      </>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function delay(time) {
  return new Promise((resolve, reject) => {
    console.log("deay ", time)
    setTimeout(() => { resolve(`delay ${time}`) }, time);
  });
}