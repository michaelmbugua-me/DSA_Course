# Efficiently sort an array with many duplicated values

> Source: https://www.techiedelight.com/efficiently-sort-array-duplicated-values/

Given an integer array with many duplicated elements, write an algorithm to efficiently sort it in linear time, where the order of equal elements doesn’t matter.

For example,

**Input:** { 4, 2, 40, 10, 10, 1, 4, 2, 1, 10, 40 } **Output:** { 1, 1, 2, 2, 4, 4, 10, 10, 10, 40, 40 }

> 

A simple solution would be to use efficient sorting algorithms like [Merge Sort](https://techiedelight.com/merge-sort/), [Quicksort](https://techiedelight.com/quicksort/), [Heapsort](https://techiedelight.com/heap-sort-place-place-implementation-c-c/), etc., that can solve this problem in O(n.log(n)) time, but those will not take advantage of the fact that there are many duplicated values in the array.

A better approach is to use a [counting sort](https://techiedelight.com/counting-sort-algorithm-implementation/). This will bring down the time complexity to O(n + k), where `n` is the size of the input and `k` is the input range. Following is the TypeScript program that demonstrates it:

```ts
const RANGE = 100;

// Function to efficiently sort an array with many duplicated values
// using the counting sort algorithm
function customSort(A: number[]): void {

    // create a new list to store counts of elements in the input list
    const freq = new Array(RANGE).fill(0);

    // using the value of elements in the input list as an index,
    // update their frequencies in the new list
    for (const i of A) {
        freq[i] = freq[i] + 1;
    }

    // overwrite the input list with sorted order
    let k = 0;
    for (let i = 0; i < RANGE; i++) {
        while (freq[i] > 0) {
            A[k] = i;
            freq[i] = freq[i] - 1;
            k = k + 1;
        }
    }
}

const A = [4, 2, 40, 10, 10, 1, 4, 2, 1, 10, 40];
customSort(A);
console.log(A);
```

**Output:** 1 1 2 2 4 4 10 10 10 40 40

The problem with the counting sort is its high space complexity O(k) when `k >> n`, i.e., variation in keys is significantly greater than the total number of items. Also, the program will only work for **positive integers**. [Here](https://techiedelight.com/compiler/?run=sWen5P) is another implementation that calculates the exact range of array elements instead of making any assumption by calculating the difference between the maximum and minimum key values.

We can also use a [hash table](https://techiedelight.com/hashing-in-data-structure/) to solve this problem effectively. The idea is to:

  1. Iterate through the array once and store the number of occurrences of individual elements in a hash table.
  2. [Sort the unique elements](https://techiedelight.com/sort-array-ascending-order-cpp/) present in the hash table according to the natural ordering.
  3. Overwrite the input array with sorted elements depending on frequencies stored in the hash table.

The time complexity of this solution would be O(n.log(k)), where `k` is the total number of unique elements present in the input of size `n`, which can be much less than O(n.log(n)) if the range of input elements is small. The additional space used by the program is O(k). Following is the TypeScript program that demonstrates it:

```ts
// Function to efficiently sort an array with many duplicated values
function customSort(A: number[]): void {

    // create an empty dictionary to store the frequency of list elements
    const freq = new Map<number, number>();

    // store distinct values in the input list as keys and
    // their respective counts as values
    for (const i of A) {
        freq.set(i, (freq.get(i) ?? 0) + 1);
    }

    // sort the dictionary according to its keys' natural ordering and
    // traverse the sorted dictionary and overwrite the input list with
    // sorted elements
    let i = 0;
    for (const key of [...freq.keys()].sort((a, b) => a - b)) {
        let val = freq.get(key) as number;
        while (val > 0) {
            A[i] = key;
            i = i + 1;
            val = val - 1;
        }
    }
}

const A = [4, 2, 40, 10, 10, 1, 4, 2, 1, 10, 40];

customSort(A);
console.log(A);
```
