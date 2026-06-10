# Shuffle an array using Fisher–Yates shuffle algorithm

> Source: https://www.techiedelight.com/shuffle-given-array-elements-fisher-yates-shuffle/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) shuffle it. The algorithm should produce an unbiased permutation, i.e., every permutation is equally likely.

> 

Fisher–Yates shuffle is an algorithm to generate random permutations. It takes time proportional to the total number of items being shuffled and shuffles them in place. The algorithm swaps the element at each iteration at random among all remaining unvisited indices, including the element itself.

Here’s the complete algorithm:

**— To shuffle an array ‘a’ of ‘n’ elements:** for i from n-1 down to 1 do j = random integer such that 0 <= j <= i exchange a[j] and a[i]

Following is a TypeScript implementation of the above algorithm:

```ts
// Function to shuffle an array `A` in place
function shuffle(A: number[]): void {

    // read array from the highest index to lowest
    for (let i = A.length - 1; i >= 1; i--) {

        // generate a random number `j` such that 0 <= j <= i
        const j = Math.floor(Math.random() * (i + 1));

        // swap the current element with the randomly generated index
        [A[i], A[j]] = [A[j], A[i]];
    }
}

const A = [1, 2, 3, 4, 5, 6];

shuffle(A);

// print the shuffled array
console.log(A);
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input. An equivalent version that shuffles the array in the opposite direction (from the lowest index to the highest) is:

**— To shuffle an array ‘a’ of ‘n’ elements:** for i from 0 to n-2 do j = random integer such that i <= j < n exchange a[i] and a[j]

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to shuffle an array `A` in place
function shuffle(A: number[]): void {

    // read array from the lowest index to highest
    for (let i = 0; i <= A.length - 2; i++) {

        // generate a random number `j` such that `i <= j < n`
        const j = i + Math.floor(Math.random() * (A.length - i));

        // swap the current element with the randomly generated index
        [A[i], A[j]] = [A[j], A[i]];
    }
}

const A = [1, 2, 3, 4, 5, 6];

shuffle(A);

// print the shuffled array
console.log(A);
```

The time complexity of the above solution is O(n) and doesn’t require any extra space.

**Exercise:**

Modify the code to generate random cyclic permutations of length `n` instead of random permutations (Sattolo’s algorithm).

**Reference:** <https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle>
