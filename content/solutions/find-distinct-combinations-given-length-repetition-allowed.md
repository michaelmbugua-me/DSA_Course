# Find all distinct combinations of a given length with repetition allowed

> Source: https://www.techiedelight.com/find-distinct-combinations-given-length-repetition-allowed/

Given an integer array, find all distinct combinations of a given length `k`, where the repetition of elements is allowed.

For example,

**Input:** {1, 2, 3}, k = 2 **Output:** {1, 1}, {1, 2}, {1, 3}, {2, 2}, {2, 3}, {3, 3} **Input:** {1, 2, 3, 4}, k = 2 **Output:** {1, 1}, {1, 2}, {1, 3}, {1, 4}, {2, 2}, {2, 3}, {2, 4}, {3, 3}, {3, 4}, {4, 4} **Input:** {1, 2, 1}, k = 2 **Output:** {1, 1}, {1, 2}, {2, 2}

The program should print only distinct combinations. For example, for the last input, either `{1, 2}` or `{2, 1}` should be considered.

> 

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to add each array element to the output starting from the last considered element and recur for the remaining elements. To avoid printing permutations, construct each tuple in the same order as array elements. If the combination of size `k` is found, print it.

Following is a TypeScript implementation based on the above idea:

```ts
// Function to print all distinct combinations of length `k`, where the
// repetition of elements is allowed
function findCombinations(A: number[], out: number[], k: number, i: number, n: number): void {

    // base case: if the combination size is `k`, print it
    if (out.length === k) {
        console.log(out.join(' '));
        return;
    }

    // start from the previous element in the current combination
    // till the last element
    for (let j = i; j < n; j++) {

        // add current element `A[j]` to the solution and recur with the
        // same index `j` (as repeated elements are allowed in combinations)
        out.push(A[j]);
        findCombinations(A, out, k, j, n);

        // backtrack: remove the current element from the solution
        out.pop();
    }
}

const A = [1, 2, 1];
const k = 2;

const out: number[] = [];
findCombinations(A, out, k, 0, A.length);
```

**Output:** 1 1 1 2 1 1 2 2 2 1 1 1

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

In case the array contains repeated elements, the above code will print duplicate combinations. To print only distinct tuples in case input contains repeated elements, [sort the array](https://techiedelight.com/sort-array-ascending-order-cpp/) and recur for only one occurrence of adjacent identical elements. This approach is demonstrated below in TypeScript:

```ts
// Function to print all distinct combinations of length `k`, where the
// repetition of elements is allowed
function findCombinations(A: number[], k: number, out: number[], i = 0): void {

    // base case: if the combination size is `k`, print it
    if (out.length === k) {
        console.log(out.join(' '));
        return;
    }

    // start from the previous element in the current combination
    // till the last element
    let j = i;
    while (j < A.length) {

        // add current element `A[j]` to the solution and recur with the
        // same index `j` (as repeated elements are allowed in combinations)
        out.push(A[j]);
        findCombinations(A, k, out, j);

        // backtrack: remove the current element from the solution
        out.pop();

        // code to handle duplicates – skip adjacent duplicates
        while (j < A.length - 1 && A[j] === A[j + 1]) {
            j = j + 1;
        }

        j = j + 1;
    }
}

const A = [1, 2, 1];
const k = 2;

// if the list contains repeated elements, sort the list to
// handle duplicates combinations
A.sort((a, b) => a - b);

findCombinations(A, k, []);
```

**Output:** 1 1 1 2 2 2

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).
