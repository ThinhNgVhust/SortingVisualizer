

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

export function getbubbleSortAnimation(array) {
    const animations = []
    if (array.length <= 1) return;
    const auxiliaryArray = array.slice();
    bubbleSortHelper(auxiliaryArray, animations);
    console.log("Sorted: ", auxiliaryArray);
    return animations;
}

function bubbleSortHelper(mainArray, animations) {
    for (let i = 0; i < mainArray.length - 1; i++) {
        for (let j = 0; j < mainArray.length - i - 1; j++) {

            if (mainArray[j] > mainArray[j + 1]) {
                animations.push([j, j + 1]);
                animations.push([j, j + 1]);
                animations.push([j, mainArray[j + 1], j + 1, mainArray[j]]);

                let temp = mainArray[j];
                mainArray[j] = mainArray[j + 1];
                mainArray[j + 1] = temp;
            }
        }

    }
}

export function quickSortAnimation(array) {
    const animations = [];
    if (array.length === 1) return;
    const auxiliaryArray = array.slice();
    quickSortHelper(auxiliaryArray, animations, 0, auxiliaryArray.length - 1);
   return animations;
}

function quickSortHelper(mainArray, animations, start, end) {
    if (start >= end) return;
    var pivotIndex = partition(mainArray, animations, start, end);

    quickSortHelper(mainArray, animations, start, pivotIndex - 1);
    quickSortHelper(mainArray, animations, pivotIndex + 1, end);
    
}

function partition(mainArray, animations, start, end) {

    let ele = mainArray[end];
    let pivotIndex = start;
    for (let i = start; i <= end; i++) {
        if (mainArray[i] < ele) {
            animations.push([i,pivotIndex]);
            animations.push([i,pivotIndex]);
            swap(mainArray,i,pivotIndex);
            animations.push([i,mainArray[i],pivotIndex,mainArray[pivotIndex]]);
            pivotIndex++;
        }
    }

    animations.push([end,pivotIndex]);
    animations.push([end,pivotIndex]);
    swap(mainArray,end,pivotIndex);
    animations.push([end,mainArray[end],pivotIndex,mainArray[pivotIndex]]);

    return pivotIndex;
}

function swap(arr, i, pivot) {
    let temp = arr[i];
    arr[i] = arr[pivot];
    arr[pivot] = temp;
}



export function heapSortAnimation(array){
    let animations = []
    let auxiliaryArray = array.slice();
    heapsortHelper(auxiliaryArray,animations); 

    return animations;
}


function heapsortHelper(mainArray,animations){
    build_max_heap(mainArray,animations);
    let length = mainArray.length;
    while(length > 0){
        animations.push([0,length-1]);
        animations.push([0,length-1]);
        animations.push([0,mainArray[length-1],length-1,mainArray[0]]);
        swap(mainArray,0,length-1);
        length--;
        max_heapify(mainArray,animations,0,length);
    }
    

}


function max_heapify(mainArray,animations,index,length)
{
    // O(logn)
    let ele = mainArray[index];
    let left = 2*index+1;
    let right = 2*index+2;
    let largest = index;
    if (left < length && mainArray[left]>ele)
    {
        largest = left;
    }
    if(right < length && mainArray[right]>mainArray[largest])
    {
        largest = right;
    }
    if (largest !== index){
        //
        animations.push([index,largest]);
        animations.push([index,largest]);
        animations.push([index,mainArray[largest],largest,mainArray[index]]);
        swap(mainArray,index,largest);
        max_heapify(mainArray,animations,largest,length);

    }
}

function build_max_heap(mainArray,animations){
    let length = mainArray.length;
    for (let index = length/2; index >= 0; index--) {
        max_heapify(mainArray,animations,index,length);    
    }
    
}

