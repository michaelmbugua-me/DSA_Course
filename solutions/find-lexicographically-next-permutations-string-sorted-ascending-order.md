# Find all lexicographically next permutations of a string

> Source: https://www.techiedelight.com/find-lexicographically-next-permutations-string-sorted-ascending-order/

Given a string, find all lexicographically next permutations of it.

The words are arranged in the same order in the lexicographic order as they are presumed to appear in a dictionary. For example, the lexicographically next permutation of string `ABCD` is `ABDC`, for string `ABDC` is `ACBD`, and for string `ACBD` is `ACDB`.

> 

A simple solution would be to use a [next permutation generator](https://techiedelight.com/std_next_permutation-overview-implementation/) that generates the next greater lexicographic permutation of a string. If the next higher permutation can be determined, it rearranges the elements and returns true. If that was not possible (because it is already at the largest possible permutation), it rearranges the elements according to the first permutation and returns false.

The implementation can be seen below in TypeScript:

```ts
// Function to rearrange the characters into the next lexicographically
// greater permutation; returns false if no such permutation exists
function nextPermutation(chars: string[]): boolean {
    // find the largest index `i` such that `chars[i-1]` is less than `chars[i]`
    let i = chars.length - 1;
    while (chars[i - 1] >= chars[i]) {
        // if `i` is the first index of the string, that means we are already
        // at the highest possible permutation, i.e., the string is sorted in
        // descending order
        if (--i === 0) {
            return false;
        }
    }

    // find the highest index `j` to the right of index `i` such that
    // chars[j] > chars[i-1]
    let j = chars.length - 1;
    while (j > i && chars[j] <= chars[i - 1]) {
        j--;
    }

    // swap character at index `i-1` with index `j`
    [chars[i - 1], chars[j]] = [chars[j], chars[i - 1]];

    // reverse substring `chars[i…n)` and return true
    const tail = chars.slice(i).reverse();
    chars.length = i;
    chars.push(...tail);

    return true;
}

// Function to find all lexicographically next permutations of a
// string using the `nextPermutation()` helper
function permutations(s: string): void {
    // base case
    if (s.length === 0) {
        return;
    }

    const chars = [...s];
    while (true) {
        // print the current permutation
        process.stdout.write(chars.join('') + ' ');

        // find the next lexicographically ordered permutation
        if (!nextPermutation(chars)) {
            break;
        }
    }
}

const str = 'BADC';

permutations(str);
```

**Output:** BADC BCAD BCDA BDAC BDCA CABD CADB CBAD CBDA CDAB CDBA DABC DACB DBAC DBCA DCAB DCBA

We can also implement our own `next_permutation()` function. The following algorithm generates the next permutation lexicographically after a given permutation. It changes the permutation [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/).

  * Find the largest index `i` such that `str[i-1]` is less than `str[i]`.
  * Return false if `i` is the first index of the string, meaning that we are already at the highest possible permutation, i.e., the string is sorted in descending order. If `i` is not the first index of the string, then substring `str[i…n)` is sorted in descending order, i.e. `str[i-1] < str[i] >= str[i+1] >= str[i+2] >= … >= str[n-1]`.
  * Find the highest index `j` to the right of index `i` such that `str[j]` is greater than `str[i-1]` and swap the character at index `i-1` with index `j`.
  * Reverse substring `str[i…n)` and return true.

The algorithm can be implemented as follows in TypeScript:

```ts
function swap(chars: string[], i: number, j: number): void {

    const ch = chars[i];
    chars[i] = chars[j];
    chars[j] = ch;
}

function reverse(chars: string[], start: number): void {

    let i = start, j = chars.length - 1;
    while (i < j) {
        swap(chars, i, j);
        i = i + 1;
        j = j - 1;
    }
}

// Function to find lexicographically next permutations of a string.
// It returns true if the string could be rearranged as a lexicographically
// greater permutation; otherwise, it returns false.
function next_permutation(chars: string[]): boolean {

    // find the largest index `i` such that `chars[i-1]` is less than `chars[i]`
    let i = chars.length - 1;

    while (chars[i - 1] >= chars[i]) {

        // if `i` is the first index of the string, that means we are already
        // at the highest possible permutation, i.e., the string is sorted in
        // descending order

        i = i - 1;
        if (i === 0) {
            return false;
        }
    }

    /* if we reach here, the substring `chars[i…n)` is sorted in descending order;
        i.e., chars[i-1] < chars[i] >= chars[i+1] >= chars[i+2] >= … >= chars[n-1] */

    // find the highest index `j` to the right of index `i` such that
    // `chars[j] > chars[i-1]`
    let j = chars.length - 1;
    while (j > i && chars[j] <= chars[i - 1]) {
        j = j - 1;
    }

    // swap character at index `i-1` with index `j`
    swap(chars, i - 1, j);

    // reverse substring `chars[i…n)` and return true
    reverse(chars, i);

    return true;
}

// Function to find all lexicographically next permutations of a string
function permutations(s: string): void {

    // base case
    if (!s) {
        return;
    }

    // base case
    if (s.length === 1) {
        console.log(s);
        return;
    }

    // convert the string to a list
    const chars = [...s];

    while (true) {

        // print the current permutation
        process.stdout.write(chars.join('') + ' ');

        // find the next lexicographically ordered permutation
        if (!next_permutation(chars)) {
            break;
        }
    }
}

const s = 'BADC';
permutations(s);
```

**Output:** BADC BCAD BCDA BDAC BDCA CABD CADB CBAD CBDA CDAB CDBA DABC DACB DBAC DBCA DCAB DCBA

The worst-case time complexity of the above solutions is O(n.n!) as there are `n!` permutations for a string of length `n`, and each permutation takes O(n) time. The worst case happens when the string contains all distinct elements.

Note that the above solution can handle strings containing repeated characters and will not print duplicate permutations.

**Also See:**

> [Find all lexicographically previous permutations of a string](https://techiedelight.com/find-all-lexicographically-previous-permutations-string/)
