# Find all n-digit binary numbers with k-bits set where `k` ranges from 1 to `n`

> Source: https://www.techiedelight.com/find-n-digit-binary-numbers-k-bits-set-k-ranges-1-n/

[String](https://www.techiedelight.com/Category/String/)

Write a program to print all n–digit binary numbers with k–bits set where `k` ranges from 1 to `n`. The numbers with the same number of bits set should be printed together in ascending order.

For example,

4–digit binary numbers are: (k = 1) 0001 0010 0100 1000 (k = 2) 0011 0101 0110 1001 1010 1100 (k = 3) 0111 1011 1101 1110 (k = 4) 1111 5–digit binary numbers are: (k = 1) 00001 00010 00100 01000 10000 (k = 2) 00011 00101 00110 01001 01010 01100 10001 10010 10100 11000 (k = 3) 00111 01011 01101 01110 10011 10101 10110 11001 11010 11100 (k = 4) 01111 10111 11011 11101 11110 (k = 5) 11111

> 

The idea is to repeatedly generate the next greater lexicographic permutation of a string (similar to [std::next_permutation](https://techiedelight.com/std_next_permutation-overview-implementation/) in C++). To print all numbers with k–bit set in ascending order, set the last `k` bits of an n–digit number to `1` and then generate all permutations of the string in lexicographical order.

This approach is demonstrated below:

```ts
// Function to rearrange the string into the next greater lexicographic
// permutation (like `std::next_permutation` in C++). It returns false if
// the string is already the highest permutation
function nextPermutation(curr: string[]): boolean {
    // find the longest non-increasing suffix
    let i = curr.length - 1;
    while (i > 0 && curr[i - 1] >= curr[i]) {
        i--;
    }

    // the string is already the highest permutation
    if (i === 0) {
        return false;
    }

    // find the rightmost successor of the pivot `curr[i - 1]`
    let j = curr.length - 1;
    while (curr[j] <= curr[i - 1]) {
        j--;
    }

    // swap the pivot with the successor
    [curr[i - 1], curr[j]] = [curr[j], curr[i - 1]];

    // reverse the suffix
    for (let l = i, r = curr.length - 1; l < r; l++, r--) {
        [curr[l], curr[r]] = [curr[r], curr[l]];
    }

    return true;
}

// Function to find all n–digit binary numbers with k–bits set where
// `k` ranges from 1 to `n`
function printAllCombinations(n: number): void {
    // string to store n–digit binary number
    let str: string[] = [];
    let curr: string[] = [];

    // construct n–digit binary number filled with all 0's
    let j = n;
    while (j--) {
        str.push('0');
    }

    // print all numbers with the k–bit set together in ascending order
    for (let k = 1; k <= n; k++)
    {
        // set last `k` bits to 1
        str[n - k] = '1';
        curr = [...str];

        let line = `(k = ${k}) `;

        // print the string lexicographically
        do {
            line += curr.join('') + ' ';
        }
        while (nextPermutation(curr));

        console.log(line);
    }
}

const n = 4;

printAllCombinations(n);
```

**Output:** (k = 1) 0001 0010 0100 1000 (k = 2) 0011 0101 0110 1001 1010 1100 (k = 3) 0111 1011 1101 1110 (k = 4) 1111

The time complexity of the above solution is O(n2.n!) and requires O(n) extra space, where `n` is the total number of digits.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
