# Find a minimum range with at least one element from each of the given arrays

> Source: https://www.techiedelight.com/find-minimum-range-given-arrays/

[Array](https://www.techiedelight.com/Category/Array/)

Given three sorted arrays of variable length, efficiently compute the minimum range with at least one element from each array.

For example,

**Input:** 3 sorted arrays of variable length [ **3** , 6, 8, 10, 15 ] [ 1, **5** , 12 ] [ **4** , 8, 15, 16 ] **Output:** Minimum range is 3–5 **Input:** 3 sorted arrays of variable length [ 2, 3, **4** , 8, 10, 15 ] [ 1, **5** , 12 ] [ **7** , 8, 15, 16 ] **Output:** Minimum range is 4–7

> 

A naive solution is to compute the range of every possible triplet and return the minimum of all values. The time complexity of this solution is O(n3) for an input containing `n` elements, as we need three nested loops to consider every triplet. This approach is demonstrated below in TypeScript:

```ts
// Function to find the minimum range with at least one element from
// each of the given arrays
const findMinRange = (a: number[], b: number[], c: number[]): [number, number] => {

    // create a pair to store the result
    let pair: [number, number] = [0, 0];

    // stores the minimum difference
    let diff = Number.MAX_SAFE_INTEGER;

    // consider all triplets formed by `(a[i], b[j], c[k])`
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            for (let k = 0; k < c.length; k++) {
                // find the minimum and maximum value in the current triplet
                const low = Math.min(Math.min(a[i], b[j]), c[k]);
                const high = Math.max(Math.max(a[i], b[j]), c[k]);

                // update the minimum difference if the current difference is more
                // and store the range in a pair
                if (diff > high - low) {
                    pair = [low, high];
                    diff = high - low;
                }
            }
        }
    }

    return pair;
};

const a = [3, 6, 8, 10, 15];
const b = [1, 5, 12];
const c = [4, 8, 15, 16];

const pair = findMinRange(a, b, c);
console.log(`The minimum range is [${pair[0]}, ${pair[1]}]`);
```

**Output:** The minimum range is [3, 5]

We can quickly reduce the time complexity to linear as we don’t need to consider every triplet. The idea is to take advantage of the fact that the arrays are already sorted. In the following solution in TypeScript, we compute the range for some selected triplets and return the minimum.

```ts
// Function to find the minimum range with at least one element from
// each of the given arrays
const findMinRange = (a: number[], b: number[], c: number[]): [number, number] => {

    // create a pair to store the result
    let pair: [number, number] = [0, 0];

    // stores the minimum difference
    let diff = Number.MAX_SAFE_INTEGER;

    // a triplet is formed by `(a[i], b[j], c[k])`
    let i = 0, j = 0, k = 0;

    // loop till the end of any array is reached
    while (i < a.length && j < b.length && k < c.length) {

        // find the minimum and maximum value in the current triplet
        const low = Math.min(a[i], b[j], c[k]);
        const high = Math.max(a[i], b[j], c[k]);

        // update the minimum difference if the current difference is more
        // and store the elements in a pair
        if (diff > high - low) {
            pair = [low, high];
            diff = high - low;
        }

        // advance index of the array with a minimum value
        if (a[i] === low) {
            i = i + 1;
        }
        else if (b[j] === low) {
            j = j + 1;
        }
        else {
            k = k + 1;
        }
    }

    return pair;
};

const a = [2, 3, 4, 8, 10, 15];
const b = [1, 5, 12];
const c = [7, 8, 15, 16];

console.log(`The minimum range is ${findMinRange(a, b, c)}`);
```

**Output:** The minimum range is [4, 7]

The time complexity of the above solution is O(n), where `n` is the total number of elements in all three arrays.
