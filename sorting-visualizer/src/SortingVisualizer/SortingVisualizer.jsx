import React from 'react';
import {getMergeSortAnimations,getbubbleSortAnimation,quickSortAnimation} from '../SortingAlgorithms/SortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

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
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      console.log(arrayBars);
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    const animations = quickSortAnimation(this.state.array);
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        // console.log(arrayBars);
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [idx1,newHeight1,idx2, newHeight2] = animations[i];
            const barOneStyle = arrayBars[idx1].style;
            barOneStyle.height = `${newHeight1}px`;
            const barTwoStyle = arrayBars[idx2].style;
            barTwoStyle.height = `${newHeight2}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
    const animations = getbubbleSortAnimation(this.state.array);
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        // console.log(arrayBars);
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [idx1,newHeight1,idx2, newHeight2] = animations[i];
            const barOneStyle = arrayBars[idx1].style;
            barOneStyle.height = `${newHeight1}px`;
            const barTwoStyle = arrayBars[idx2].style;
            barTwoStyle.height = `${newHeight2}px`;
          }, i * ANIMATION_SPEED_MS);
        }
      }
  }

 

  render() {
    const {array} = this.state;

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
      <button onClick={() => this.resetArray()}>Generate New Array</button>
      <button onClick={() => this.mergeSort()}>Merge Sort</button>
      <button onClick={() => this.quickSort()}>Quick Sort</button>
      <button onClick={() => this.heapSort()}>Heap Sort</button>
      <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
