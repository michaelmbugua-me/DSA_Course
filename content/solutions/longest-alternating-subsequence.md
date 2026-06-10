# Longest Alternating Subsequence Problem

> Source: https://www.techiedelight.com/longest-alternating-subsequence/

The longest alternating subsequence is a problem of finding a subsequence of a given sequence in which the elements are in alternating order and in which the sequence is as long as possible. In order words, we need to find the length of the longest subsequence with alternate low and high elements.

For example, consider array `A[] = [8, 9, 6, 4, 5, 7, 3, 2, 4]`. The longest alternating subsequence length is 6, and the subsequence is `[8, 9, 6, 7, 3, 4]` as `(8 < 9 > 6 < 7 > 3 < 4)`.

Note that the longest alternating subsequence is not unique. Following are a few more subsequences of length 6:

(8, 9, 6, 7, 2, 4) (8, 9, 4, 7, 3, 4) (8, 9, 4, 7, 2, 4) … … And many more…

> 

The problem differs from the problem of finding the [Longest Alternating Subarray](https://techiedelight.com/longest-alternating-subarray-problem/). Unlike subarrays, [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) are not required to occupy consecutive positions within the original array.

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to maintain a flag to indicate if the next element in the sequence should be smaller or greater than the previous element. Then for any element `A[i]` at index `i`, we have two choices:

  1. Include the element in the subsequence.
     * If the flag is true and `A[i-1] < A[i]`, include `A[i]` as next high in the subsequence.
     * If the flag is false and `A[i-1] > A[i]`, include `A[i]` as next low in the subsequence.

Then recur for the next element by flipping the flag. If we get the longest subsequence by including the element in the subsequence, update the result.

  2. Exclude the element from subsequence. Exclude the current element and recur for next element (flag remains same). If we get the longest subsequence by excluding the element from the subsequence, update the result.

Following is a TypeScript implementation of the idea:

```ts
// Function to find the length of the longest subsequence.
// If `flag` is true, the next element should be greater.
// If `flag` is false, the next element should be smaller.
function findLongestSequence(A: number[], start: number, end: number, flag: boolean): number {
  let result = 0;
  for (let i = start; i <= end; i++) {
    // include `A[i]` as next high in subsequence and flip `flag`
    // for next subsequence
    if (flag && A[i - 1] < A[i]) {
      result = Math.max(result, 1 + findLongestSequence(A, i + 1, end, !flag));
    }

    // include `A[i]` as next low in subsequence and flip `flag`
    // for next subsequence
    else if (!flag && A[i - 1] > A[i]) {
      result = Math.max(result, 1 + findLongestSequence(A, i + 1, end, !flag));
    }

    // don't include `A[i]` in subsequence
    else {
      result = Math.max(result, findLongestSequence(A, i + 1, end, flag));
    }
  }

  return result;
}

// Function to find the length of the longest subsequence with alternate
// low and high elements. It calls the `findLongestSequence()` method.
function longestSequence(A: number[]): number {
  // base case
  if (!A || A.length === 0) {
    return 0;
  }

  // Fix the first element and recur for the remaining elements as the first
  // element will always be part of the longest subsequence (why?)

  // There are two possibilities:

  // 1. The next element is greater (pass true)
  // 2. The next element is smaller (pass false)
  return 1 + Math.max(findLongestSequence(A, 1, A.length - 1, true),
    findLongestSequence(A, 1, A.length - 1, false));
}

const A = [8, 9, 6, 4, 5, 7, 3, 2, 4];

console.log('The length of the longest alternating subsequence is', longestSequence(A));
```

**Output:** The length of the longest alternating subsequence is 6

The time complexity of the above solution is exponential and occupies space in the call stack.

The LAS problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) and also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). We know that problems with optimal substructure and overlapping subproblems can be solved by dynamic programming, in which subproblem solutions are saved rather than computed repeatedly. This method is demonstrated below in TypeScript, which follows a top-down approach using _Memo_ ization.

```ts
// Function to find the length of the longest subsequence.
// If `flag` is 1, the next element should be greater.
// If `flag` is 0, the next element should be smaller.
function findLongestSequence(
  A: number[],
  start: number,
  end: number,
  flag: number,
  lookup: number[][]
): number {
  if (start >= A.length) {
    return 0;
  }

  // if the subproblem is seen for the first time, solve it and
  // store its result in the lookup table
  if (lookup[start][flag] === 0) {
    let result = 0;
    for (let i = start; i <= end; i++) {
      // include `A[i]` as next high in subsequence and flip `flag`
      // for next subsequence
      if (flag === 1 && A[i - 1] < A[i]) {
        result = Math.max(result, 1 + findLongestSequence(A, i + 1, end, 0, lookup));
      }

      // include `A[i]` as next low in subsequence and flip `flag`
      // for next subsequence
      else if (flag === 0 && A[i - 1] > A[i]) {
        result = Math.max(result, 1 + findLongestSequence(A, i + 1, end, 1, lookup));
      }

      // don't include `A[i]` in subsequence
      else {
        result = Math.max(result, findLongestSequence(A, i + 1, end, flag, lookup));
      }
    }

    lookup[start][flag] = result;
  }

  // return solution to the current subproblem
  return lookup[start][flag];
}

// Function to find the length of the longest subsequence with alternate
// low and high elements. It calls the `findLongestSequence()` method.
function longestSequence(A: number[]): number {
  // base case
  if (!A || A.length === 0) {
    return 0;
  }

  // lookup table to store solutions to a subproblem
  // `max(lookup[i][0], lookup[i][1])` stores the longest sequence till `A[0…i]`
  const lookup: number[][] = Array.from({ length: A.length }, () => Array(2).fill(0));

  // Fix the first element and recur for the remaining elements as the first
  // element will always be part of the longest subsequence (why?)

  // There are two possibilities:

  // 1. The next element is greater (pass true)
  // 2. The next element is smaller (pass false)
  return 1 + Math.max(findLongestSequence(A, 1, A.length - 1, 1, lookup),
    findLongestSequence(A, 1, A.length - 1, 0, lookup));
}

const A = [8, 9, 6, 4, 5, 7, 3, 2, 4];
console.log('The length of the longest alternating subsequence is', longestSequence(A));
```

**Output:** The length of the longest alternating subsequence is 6

The time complexity of the above top-down solution is O(n2) and requires O(n) extra space, where `n` is the size of the given sequence. We can even write a bottom-up version of the above memoized solution. The following code shows how to implement it in TypeScript:

```ts
// Function to find the length of the longest subsequence with alternate
// low and high elements.
function findLongestSequence(A: number[], n: number): number {
  // base case
  if (n <= 1) {
    return n;
  }

  // lookup table to store solutions to subproblems
  const T: number[][] = Array.from({ length: n }, () => Array(2).fill(0));

  /*
      `T[i][0]` stores the longest alternating subsequence till `A[0…i]`
      where `A[i]` is greater than `A[i-1]`

      `T[i][1]` stores the longest alternating subsequence till `A[0…i]`
      where `A[i]` is smaller than `A[i-1]`
  */

  // base case: the first element will always be part of LAS
  T[0][0] = T[0][1] = 1;

  // stores result
  let result = 1;

  // fill the lookup table in a bottom-up manner
  for (let i = 1; i < n; i++) {
    // do for each element `A[j]` before `A[i]`
    for (let j = 0; j < i; j++) {
      // If `A[i]` is greater than `A[j]`, update `T[i][0]`
      if (A[i] > A[j]) {
        T[i][0] = Math.max(T[i][0], T[j][1] + 1);
      }

      // If `A[i]` is smaller than `A[j]`, update `T[i][1]`
      if (A[i] < A[j]) {
        T[i][1] = Math.max(T[i][1], T[j][0] + 1);
      }
    }

    // update result by taking a maximum of both values
    if (result < Math.max(T[i][0], T[i][1])) {
      result = Math.max(T[i][0], T[i][1]);
    }
  }

  // return result
  return result;
}

const A = [8, 9, 6, 4, 5, 7, 3, 2, 4];
const n = A.length;

console.log(`The length of the longest alternating subsequence is ${findLongestSequence(A, n)}`);
```

**Output:** The length of the longest alternating subsequence is 6
