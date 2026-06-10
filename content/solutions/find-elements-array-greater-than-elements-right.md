# Find all elements in an array that are greater than all elements to their right

> Source: https://www.techiedelight.com/find-elements-array-greater-than-elements-right/

Given an unsorted integer array, print all greater elements than all elements present to their right.

For example, consider the array `[10, 4, 6, 3, 5]`. The elements that are greater than all elements to their right are 10, 6, and 5.

> 

A naive solution would be to use two loops. For each element, check if any greater element exists to their right or not. If all elements to their right are less than it, print the element. The time complexity of this solution is O(n2), where `n` is the size of the input.

A better solution is to use a [stack](https://techiedelight.com/stack-implementation-in-cpp/). For each element, pop all the elements present in the stack that are less than it and then push it into the stack. Finally, the stack is left with the elements which are greater than all elements present to their right. Following is a TypeScript program that demonstrates it:

```ts
// Function to print all elements which are greater than all
// elements present to their right
function find(arr: number[]): void {

    // base case
    if (!arr.length) {
        return;
    }

    // create an empty stack
    const stack: number[] = [];

    // do for each element
    for (const value of arr) {
        // pop all the elements that are less than the current element
        while (stack.length && stack[stack.length - 1] < value) {
            stack.pop();
        }

        // push current element into the stack
        stack.push(value);
    }

    // print all elements in the stack
    while (stack.length) {
        console.log(stack.pop());
    }
}

const arr = [10, 4, 6, 3, 5];
find(arr);
```

**Output:** 5 6 10

The time complexity of the above solution is O(n) and requires O(n) extra space.

We can easily solve this problem in linear time using constant space. The idea is to traverse the array from right to left and maintain a variable that stores the maximum element encountered so far. So if the current element is greater than the maximum so far, print the current element and update the maximum so far. This approach is demonstrated below in TypeScript:

```ts
// Function to print all elements which are greater than all
// elements present to their right
function find(arr: number[]): void {

    // base case
    if (!arr.length) {
        return;
    }

    let maxSoFar = -Infinity;

    // traverse the array from right to left
    for (const i of [...arr].reverse()) {
        // if the current element is greater than the maximum so far,
        // print it and update `max_so_far`
        if (i >= maxSoFar) {
            maxSoFar = i;
            console.log(i);
        }
    }
}

const arr = [10, 4, 6, 3, 5];
find(arr);
```

**Output:** 5 6 10
