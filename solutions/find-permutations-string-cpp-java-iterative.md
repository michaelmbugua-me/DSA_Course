# Iterative approach to finding permutations of a string

> Source: https://www.techiedelight.com/find-permutations-string-cpp-java-iterative/

This post will discuss how to find permutations of a string using iteration.

In the [previous post](https://techiedelight.com/find-permutations-given-string/), we have seen the recursive implementation to find permutations of a string using [backtracking](https://techiedelight.com/backtracking-interview-questions/). This post will cover iterative implementation for the same.

> 

The recursive implementation doesn’t handle strings containing duplicate characters and prints the duplicate permutations. For example, for the string `ABA`, the permutations `BAA`, `ABA`, and `AAB` gets printed twice. The following iterative implementation using `std::next_permutation` can handle strings with duplicate characters and don’t repeat the permutations.

## 1\. Using `std::next_permutation`

The idea is to [sort the string](https://techiedelight.com/sort-array-ascending-order-cpp/) and repeatedly call [std::next_permutation](https://techiedelight.com/std_next_permutation-overview-implementation/) to generate the [next greater lexicographic permutation](https://techiedelight.com/find-lexicographically-next-permutations-string-sorted-ascending-order/) of a string.

The iterative implementation below avoids using `std::next_permutation` and implements the following [in-place algorithm](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) to generate the next permutation lexicographically:

  1. Find the largest index `i` such that `str[i-1]` is less than `str[i]`.
  2. Terminate the algorithm if `i` happens to be the first index of the string, since we are already at the highest possible permutation.
  3. If `i` is not the first index of the string, then the substring `str[i…n-1]` is sorted in reverse order, i.e., `str[i-1] < str[i] >= str[i+1] >= str[i+2] >= … >= str[n-1]`.
  4. Find the highest index `j` to the right of index `i` such that `str[j]` is greater than `str[i-1]` and swap the character at index `i-1` with index `j`.
  5. Reverse substring `str[i…n-1]` and repeat.

The algorithm can be implemented as follows in TypeScript:

```ts
// Utility function to swap the characters in a character array
function swap(A: string[], i: number, j: number): void {
    const c = A[i];
    A[i] = A[j];
    A[j] = c;
}

// Utility function to reverse an array between specified indexes
function reverse(A: string[], i: number, j: number): void {
    // do till two endpoints intersect
    while (i < j) {
        swap(A, i, j);
        i = i + 1;
        j = j - 1;
    }
}

// Iterative function to find permutations of a string
function permutations(s: string): void {

    // base case
    if (!s) {
        return;
    }

    // base case
    if (s.length === 1) {
        process.stdout.write(s);
        return;
    }

    const n = s.length;

    // sort the string in a natural order
    const chars = s.split('').sort();

    while (true) {

        // print the current permutation
        process.stdout.write(chars.join('') + ' ');

        /* The following code will rearrange the string to the next lexicographically
            ordered permutation (if any) or return if we are already at
            the highest possible permutation */

        // Find the largest index `i` such that `chars[i-1]` is less than `chars[i]`
        let i = n - 1;
        while (chars[i - 1] >= chars[i]) {
            // if `i` is the first index of the string, we are already at the
            // last possible permutation (string is sorted in reverse order)
            i = i - 1;
            if (i === 0) {
                return;
            }
        }

        // find the highest index `j` to the right of index `i` such that
        // `chars[j] > chars[i-1]` (`chars[i…n-1]` is sorted in reverse order)

        let j = n - 1;
        while (j > i && chars[j] <= chars[i - 1]) {
            j = j - 1;
        }

        // swap character at index `i-1` with index `j`
        swap(chars, i - 1, j);

        // reverse substring `chars[i…n-1]`
        reverse(chars, i, n - 1);
    }
}

const s = 'ABC';
permutations(s);
```

**Output:** ABC ACB BAC BCA CAB CBA

We can also sort the string in reverse order and repeatedly calls [std::prev_permutation](https://techiedelight.com/std_prev_permutation-overview-implementation/) to generate the previous lexicographic permutation of a string.

## 2\. Using Controller Array

Please refer to this [link](http://www.quickperm.org/quickperm.html) for details on the below algorithm.

```ts
// Utility function to swap the characters in chars character array
function swap(chars: string[], i: number, j: number): void {
    const ch = chars[i];
    chars[i] = chars[j];
    chars[j] = ch;
}

// Iterative function to find permutations of a string
function permutations(s: string): void {

    // base case
    if (!s) {
        return;
    }

    // convert the string to chars character array (Since the string is immutable)
    const chars = s.split('');

    // Weight index control array
    const p: number[] = new Array(s.length).fill(0);

    // `i` and `j` represent the upper and lower bound index, respectively, for swapping
    let i = 1, j = 0;

    // print the given string, as only its permutations will be printed later
    process.stdout.write(s);

    while (i < s.length) {

        if (p[i] < i) {

            // if `i` is odd then `j = p[i]`; otherwise, `j = 0`
            j = (i % 2) * p[i];

            // swap(chars[j], chars[i])
            swap(chars, i, j);

            // print the current permutation
            process.stdout.write(' ' + chars.join(''));

            p[i] = p[i] + 1;    // increase index 'weight' for `i` by one
            i = 1;              // reset index `i` to 1

        // otherwise, `p[i] == i`
        } else {
            // reset `p[i]` to 0
            p[i] = 0;

            // set new index value for `i` (increase by one)
            i = i + 1;
        }
    }
}

const s = 'ABC';
permutations(s);
```

**Output:** ABC BAC CAB ACB BCA CBA

## 3\. Using List

The following implementation uses the list to store the partially constructed permutations and then use those partial permutations to build the final permutations in later iterations:

```ts
// Iterative function to find permutations of a string using a list
function permutations(s: string): void {

    // base case
    if (!s) {
        return;
    }

    // create an empty list to store (partial) permutations and
    // initialize it with the first character of the string
    const partial: string[] = [];

    partial.push(s[0]);

    // do for every character of the specified string
    for (let i = 1; i < s.length; i++) {
        // consider previously constructed partial permutation one by one
        while (partial.length > 0) {
            // remove current partial permutation from the list
            const str = partial.shift();

            // Insert the next character of the specified string, i.e., s[i],
            // in all possible positions of current partial permutation.
            // Then insert each of these newly constructed strings into the list.

            for (let k = 0; k <= str.length; k++) {
                partial.push(str.slice(0, k) + s[i] + str.slice(k));
            }
        }
    }

    // The list now contains all permutations of the given string
    for (const perm of partial) {
        console.log(perm + ' ');
    }
}

const str = 'ABC';
permutations(str);
```

**Output:** CBA BCA BAC CAB ACB ABC
