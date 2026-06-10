# Generate all permutations of a string in TypeScript – Recursive and Iterative

> Source: https://www.techiedelight.com/generate-permutations-string-java-recursive-iterative/

Write a TypeScript program to generate all permutations of a string.

For example, the string `ABC` has 6 permutations, i.e., `ABC, ACB, BAC, BCA, CBA, CAB`.

> 

## 1\. Recursive Approach

Since the string is immutable in TypeScript, the idea is to [convert the string into a character array](https://techiedelight.com/convert-string-to-character-array-java/). Then we can [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) generate all permutations of the given string using [backtracking](https://techiedelight.com/backtracking-interview-questions/) by swapping each of the remaining characters in the string with its first character and then generating all the permutations of the remaining characters using a recursive call.

Below is the recursion tree for printing all permutations of the string “ABC”, followed by the TypeScript implementation.

```ts
// Utility function to swap two characters in a character array
function swap(chars: string[], i: number, j: number): void {
    const temp = chars[i];
    chars[i] = chars[j];
    chars[j] = temp;
}

// Recursive function to generate all permutations of a string
function permutations(chars: string[], currentIndex: number): void {
    if (currentIndex === chars.length - 1) {
        console.log(chars.join(''));
    }

    for (let i = currentIndex; i < chars.length; i++)
    {
        swap(chars, currentIndex, i);
        permutations(chars, currentIndex + 1);
        swap(chars, currentIndex, i);
    }
}

function findPermutations(str: string): void {

    // base case
    if (str === null || str.length === 0) {
        return;
    }

    permutations(str.split(''), 0);
}

// generate all permutations of a string in TypeScript
const str = "ABC";
findPermutations(str);
```

**Output:** ABC ACB BAC BCA CBA CAB

Here’s another TypeScript implementation that doesn’t convert the string into a character array.

```ts
// Recursive function to generate all permutations of a string
function permutations(candidate: string, remaining: string | null): void {
    // base case
    if (remaining === null) {
        return;
    }

    if (remaining.length === 0) {
        console.log(candidate);
    }

    for (let i = 0; i < remaining.length; i++)
    {
        const newCandidate = candidate + remaining[i];

        const newRemaining = remaining.slice(0, i) +
                remaining.slice(i + 1);

        permutations(newCandidate, newRemaining);
    }
}

// Find Permutations of a string in TypeScript
const str = "ABC";
permutations("", str);
```

**Output:** ABC ACB BAC BCA CAB CBA

## 2\. Iterative Approach: Using Collection

The following implementation uses an array to store the partially generated permutations and then use it to generate the final permutations in further iterations.

```ts
// Iterative function to generate all permutations of a string in TypeScript
// using an array
function findPermutations(str: string): void
{
    // base case
    if (str === null || str.length === 0) {
        return;
    }

    // create an empty array to store (partial) permutations
    const partial: string[] = [];

    // initialize the list with the first character of the string
    partial.push(str[0]);

    // do for every character of the specified string
    for (let i = 1; i < str.length; i++)
    {
        // consider previously constructed partial permutation one by one

        // (iterate backward to avoid processing newly inserted items)
        for (let j = partial.length - 1; j >= 0; j--)
        {
            // remove current partial permutation from the array
            const s = partial.splice(j, 1)[0];

            // Insert the next character of the specified string at all
            // possible positions of current partial permutation. Then
            // insert each of these newly constructed strings in the list

            for (let k = 0; k <= s.length; k++)
            {
                // Advice: use template literals for concatenation
                partial.push(s.slice(0, k) + str[i] + s.slice(k));
            }
        }
    }

    console.log(partial);
}

// Iterative program to generate all permutations of a string in TypeScript
const str = "ABC";
findPermutations(str);
```

**Output:** [CAB, ACB, ABC, CBA, BCA, BAC]

**Author:** Lucas Daniel

**Also see:**

> [Find all lexicographic permutations of a string](https://techiedelight.com/find-lexicographic-permutations-string/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.48/5. Vote count: 165

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
