# Lexicographic rank of a string

> Source: https://www.techiedelight.com/calculate-rank-lexicographically-sorted-permutations/

[String](https://www.techiedelight.com/Category/String/)

Given a string containing all distinct characters, calculate its rank among all its lexicographically sorted permutations.

For example, consider the following lexicographically sorted permutations:

Input : CBA Output: 6 Explanation: The rank of string DCBA in the lexicographically sorted permutations [ABC, ACB, BAC, BCA, CAB, CBA] is 6.

> 

A simple solution is to use [std::next_permutation](https://techiedelight.com/std_next_permutation-overview-implementation/) that generates the next greater lexicographic permutation of a string. The idea is to [sort the string](https://techiedelight.com/sort-array-ascending-order-cpp/) in ascending order and repeatedly calculate the lexicographic next permutation until the current permutation becomes equal to the given string.

```ts
// Helper to find the next lexicographically ordered permutation of a string,
// returns false if no next permutation exists
const nextPermutation = (chars: string[]): boolean => {
    const n = chars.length;
    let i = n - 2;
    while (i >= 0 && chars[i] >= chars[i + 1]) {
        i--;
    }
    if (i < 0) {
        return false;
    }
    let j = n - 1;
    while (chars[j] <= chars[i]) {
        j--;
    }
    [chars[i], chars[j]] = [chars[j], chars[i]];
    let left = i + 1;
    let right = n - 1;
    while (left < right) {
        [chars[left], chars[right]] = [chars[right], chars[left]];
        left++;
        right--;
    }
    return true;
};

// Function to find the lexicographic rank of a string using
// `nextPermutation`
const findLexicographicRank = (key: string): number => {
    // start from the sorted permutation
    const chars = key.split('').sort();
    let rank = 1;        // rank starts from 1

    while (1) {
        // if the current permutation is equal to the key, return its rank
        if (key === chars.join('')) {
            return rank;
        }

        // find next lexicographically ordered permutation
        if (!nextPermutation(chars)) {
            break;
        }
        rank++;
    }
    return -1;
};

const key = "DCBA";

console.log(`The lexicographic rank of ${key} is ${findLexicographicRank(key)}`);
```

**Output:** The lexicographic rank of DCBA is 24

The time complexity of the above solution is O(n.n!), where `n` is the length of the input string and doesn’t require any extra space.

Note that we can also use [std::prev_permutation](https://techiedelight.com/std_prev_permutation-overview-implementation/) replacing `std::next_permutation` that generates the next smaller lexicographic permutation of a string. The implementation can be seen [here](https://techiedelight.com/compiler/?run=hLfraB).

We can improve worst-case time complexity to O(n2) by finding the total number of characters ranked before the current character in the string. Let `c[i]` denotes count of smaller characters than `str[i]` to the right of index `i`. Then for the string of length `n`, there will be

  * `c[0]×(n-1)!` permutations ranked above the string’s first character.
  * `c[1]×(n-2)!` permutations ranked above the second character in the string.
  * `c[2]×(n-3)!` permutations ranked above the third character in the string, and so on…

Following is a TypeScript implementation based on the above idea:

```ts
// Iterative function to calculate factorial of a number
const factorial = (n: number): number => {
    let fact = 1;
    for (let i = 1; i <= n; i++) {
        fact = fact * i;
    }
    return fact;
};

// Function to find the lexicographic rank of a string
const findLexicographicRank = (s: string): number => {
    // rank starts from 1
    let rank = 1;

    for (let i = 0; i < s.length - 1; i++) {
        // count all smaller characters than `s[i]` to the right of `i`
        let count = 0;
        for (let j = i + 1; j < s.length; j++) {
            if (s[i] > s[j]) {
                count += 1;
            }
        }

        // add the current count to the rank
        rank += count * factorial(s.length - 1 - i);
    }

    return rank;
};

const s = 'DCBA';
console.log(`The lexicographic rank of ${s} is ${findLexicographicRank(s)}`);
```

**Output:** The lexicographic rank of DCBA is 24

The time complexity of the above solution is O(n2), where `n` is the length of the input string and doesn’t require any extra space.
