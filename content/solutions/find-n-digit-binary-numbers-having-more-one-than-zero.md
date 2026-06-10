# Find all n-digit binary numbers having more 1’s than 0’s for any prefix

> Source: https://www.techiedelight.com/find-n-digit-binary-numbers-having-more-one-than-zero/

[String](https://www.techiedelight.com/Category/String/)

Given a positive integer `n`, find all `n`–digit binary numbers having more `1's` than `0's` for any prefix of the number.

For example, for `n = 1`, the binary numbers that satisfy the given constraints are `1111`, `1110`, `1101`, `1100`, `1011`, `1010`. Note that `1001` will not form part of the solution as it violates the problem constraints (`1001` has `2` zeros and `1` one at third position). The same applies to all other `4`–digit binary numbers.

> 

A simple solution would be to generate all `n`–digit numbers and print only those numbers that satisfy the given constraints. The time complexity of this solution would be exponential.

A better solution is to [recursively](https://techiedelight.com/recursion-practice-problems-with-solutions/) generate only those `n`–digit numbers that satisfy the given constraints. The idea is to append `0` and `1` to the partially formed number and recur with one less digit at each point in the recursion. We also maintain a count of the total number of zeros and the number of ones in the partially formed number. Here, the optimization is to return if the total number of ones is less than the total number of zeros at any point in the recursion.

Following is the TypeScript implementation of the idea:

```ts
// Function to find all n–digit binary numbers having
// more 1's than 0's at any position
const find = (s: string, n: number, zeros: number, ones: number): void => {

    // continue only if the total number of ones is more than equal
    // to the number of zeros
    if (ones < zeros) {
        return;
    }

    // if the number becomes n–digit, print it
    if (n === 0) {
        console.log(s);
        return;
    }

    // append 1 to the result and recur with one less digit
    find(s + '1', n - 1, zeros, ones + 1);

    // append 0 to the result and recur with one less digit
    find(s + '0', n - 1, zeros + 1, ones);
};

// given the total number of digits
const n = 4;

find('', n, 0, 0);
```

**Output:** 1111 1110 1101 1100 1011 1010

As mentioned by Matt in the comments below, we can improve the above code by excluding the possibility of making an invalid number. Following is the TypeScript implementation of the idea:

```ts
// Function to find all n–digit binary numbers having more 1's than 0's at any position
const findSolution = (remaining: number, current: string = '', extraOnes: number = 0): void => {

    // If the number is completed, print it
    if (remaining === 0) {
        console.log(current);
        return;
    }

    // Append 1 to the current number and reduce the remaining places by one
    findSolution(remaining - 1, current + '1', extraOnes + 1);

    // If there are more ones than zeros, append 0 to the current number
    // and reduce the remaining places by one
    if (0 < extraOnes) {
        findSolution(remaining - 1, current + '0', extraOnes - 1);
    }
};

const numberOfDigits = 4;
findSolution(numberOfDigits);
```

**Output:** 1111 1110 1101 1100 1011 1010
