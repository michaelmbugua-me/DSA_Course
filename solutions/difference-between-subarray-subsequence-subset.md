# Difference between Subarray, Subsequence, and Subset

> Source: https://www.techiedelight.com/difference-between-subarray-subsequence-subset/

This post will discuss the difference between a subarray, a substring, a subsequence, and a subset.

## 1\. Subarray

A subarray is a slice from a contiguous array (i.e., occupy consecutive positions) and inherently maintains the order of elements. For example, the subarrays of array `{1, 2, 3}` are `{1}`, `{1, 2}`, `{1, 2, 3}`, `{2}`, `{2, 3}`, and `{3}`.

Following is a TypeScript program to generate all subarrays of the specified array:

```ts
// Function to print all sublists of the specified array
function printallSublists(nums: number[]): void {
    // consider all sublists starting from i
    for (let i = 0; i < nums.length; i++) {
        // consider all sublists ending at `j`
        for (let j = i; j < nums.length; j++) {
            // Function to print a sublist formed by [i, j]
            console.log(nums.slice(i, j + 1));
        }
    }
}

const nums = [1, 2, 3, 4, 5];
printallSublists(nums);
```

**Output:** [1] [1, 2] [1, 2, 3] [1, 2, 3, 4] [1, 2, 3, 4, 5] [2] [2, 3] [2, 3, 4] [2, 3, 4, 5] [3] [3, 4] [3, 4, 5] [4] [4, 5] [5]

Please note that there are precisely `n×(n+1)/2` subarrays in an array of size `n`. Also, there is no such thing as a contiguous subarray. The prefix contiguous is sometimes applied to make the context more clear. So, a contiguous subarray is just another name for a subarray.

## 2\. Substring

A [substring](https://en.wikipedia.org/wiki/Substring) of a string `s` is a string `s'` that occurs in `s`. A substring is almost similar to a subarray, but it is in the context of strings.

For example, the substrings of string `'apple'` are `'apple', 'appl', 'pple', 'app', 'ppl', 'ple', 'ap', 'pp', 'pl', 'le', 'a', 'p', 'l', 'e', ''`. Following is a TypeScript program that generates all non-empty substrings of the specified string:

```ts
// Function to print all non-empty substrings of the specified string
function printAllSubstrings(s: string): void {
    // consider all substrings starting from i
    for (let i = 0; i < s.length; i++) {
        // consider all substrings ending at j
        for (let j = i; j < s.length; j++) {
            process.stdout.write(`'${s.slice(i, j + 1)}', `);
        }
    }
}

const s = 'techie';
printAllSubstrings(s);
```

**Output:** ` 't', 'te', 'tec', 'tech', 'techi', 'techie', 'e', 'ec', 'ech', 'echi', 'echie', 'c', 'ch', 'chi', 'chie', 'h', 'hi', 'hie', 'i', 'ie', 'e' `

## 3\. Subsequence

A [subsequence](https://en.wikipedia.org/wiki/subsequence) is a sequence that can be derived from another sequence by deleting some elements without changing the order of the remaining elements. For example, `{A, B, D}` is a subsequence of sequence `{A, B, C, D, E}` obtained after removing `{C}` and `{E}`.

People are often confused between a subarray/substring and a subsequence. A subarray or substring will always be contiguous, but a subsequence need not be contiguous. That is, [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) are not required to occupy consecutive positions within the original sequences. But we can say that both contiguous subsequence and subarray are the same.

In other words, the subsequence is a generalization of a substring, or substring is a refinement of the subsequence. For example, `{A, C, E}` is a subsequence of `{A, B, C, D, E}`, but not a substring, and `{A, B, C}` is both a subarray and a subsequence.

Please note that a subsequence can be in the context of both arrays and strings. Generating all subsequences of an array/string is equivalent to [generating a power set](https://techiedelight.com/generate-power-set-given-set/) of an array/string. For a given set, `S`, we can find the power set by generating all binary numbers between `0` and `2n-1`, where `n` is the size of the given set. This approach is demonstrated below in TypeScript:

```ts
// Function to print all subsequences of the specified string
function findPowerSet(str: string): void {
    const n = str.length;

    // N stores the total number of subsets
    const N = 2 ** n;

    // generate each subset one by one
    for (let i = 0; i < N; i++) {
        process.stdout.write(`'`);

        // check every bit of `i`
        for (let j = 0; j < n; j++) {
            // if j'th bit of `i` is set, print S[j]
            if (i & (1 << j)) {
                process.stdout.write(str[j]);
            }
        }
        process.stdout.write(`', `);
    }
}

const str = 'apple';
findPowerSet(str);
```

**Output:** ` '', 'a', 'p', 'ap', 'p', 'ap', 'pp', 'app', 'l', 'al', 'pl', 'apl', 'pl', 'apl', 'ppl', 'appl', 'e', 'ae', 'pe', 'ape', 'pe', 'ape', 'ppe', 'appe', 'le', 'ale', 'ple', 'aple', 'ple', 'aple', 'pple', 'apple' `
