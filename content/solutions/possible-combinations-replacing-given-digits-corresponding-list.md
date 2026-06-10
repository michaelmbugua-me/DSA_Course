# Find all possible combinations by replacing given digits with characters of the corresponding list

> Source: https://www.techiedelight.com/possible-combinations-replacing-given-digits-corresponding-list/

Given `n` lists of characters and a number whose digits lie between 1 and `n`, print all possible combinations by replacing its digits with the characters of the corresponding list. If any digit of the number gets repeated, it should be replaced by the same character considered in its previous occurrence.

For example,

**Input:** list[1] —> { ‘A’, ‘B’, ‘C’, ‘D’ } list[2] —> { ‘E’, ‘F’, ‘G’, ‘H’, ‘I’, ‘J’, ‘K’ } list[3] —> { ‘L’, ‘M’, ‘N’, ‘O’, ‘P’, ‘Q’ } list[4] —> { ‘R’, ‘S’, ‘T’ } list[5] —> { ‘U’, ‘V’, ‘W’, ‘X’, ‘Y’, ‘Z’ } key = 131 **Output:** ALA AMA ANA AOA APA AQA BLB BMB BNB BOB BPB BQB CLC CMC CNC COC CPC CQC DLD DMD DND DOD DPD DQD

> 

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to consider every digit of the given key one by one, and for every digit, there are two possibilities:

  * If the digit is seen for the first time, replace it with each character in the corresponding list and recur for the next digit.
  * If the digit is seen before, replace it with the same character used in the previous occurrence.

To store the mapping of digits to characters of the list, use a map. If every digit of the key is processed, print the modified key. Following is a TypeScript implementation of the idea:

```ts
// Top-down recursive function to find all possible combinations by
// replacing the key's digits with the corresponding characters in a list
function findCombinations(lists: string[][], keys: number[],
                      combinations: Set<string>, index: number,
                      d: Map<number, string>, result = ''): void {
    // print the result if every digit of the key is processed
    if (index === -1) {
        combinations.add(result);
        return;
    }

    // `d` stores the mapping of digits

    // stores the current digit
    const digit = keys[index];

    // if the digit is seen for the first time
    if (!d.has(digit)) {

        // get the size of the list corresponding to the current digit
        const n = lists[digit].length;

        // one by one, replace it with each character in the corresponding
        // list and recur for the next digit
        for (let i = 0; i < n; i++) {
            // store character that maps to the current digit in a map
            d.set(digit, lists[digit][i]);

            // recur for the next digit
            findCombinations(lists, keys, combinations, index - 1,
                        d, `${lists[digit][i]}${result}`);

            // backtrack
            d.delete(digit);
        }

        return;
    }

    // if the digit is seen before, replace it with the same character
    // used in the previous occurrence.
    findCombinations(lists, keys, combinations, index - 1, d, `${d.get(digit)}${result}`);
}

function findAllCombinations(lists: string[][], keys: number[]): Set<string> {

    // invalid input
    if (!lists.length || !keys.length) {
        return new Set();
    }

    // set to store all combinations
    const combinations = new Set<string>();

    // find and return all combinations
    const d = new Map<number, string>();
    findCombinations(lists, keys, combinations, keys.length - 1, d);
    return combinations;
}

// `N` lists of characters
const lists = [
    ['A', 'B', 'C', 'D'],
    ['E', 'F', 'G', 'H', 'I', 'J', 'K'],
    ['L', 'M', 'N', 'O', 'P', 'Q'],
    ['R', 'S', 'T'],
    ['U', 'V', 'W', 'X', 'Y', 'Z']
];

// input number in the form of a list
const keys = [0, 2, 0];

// find and print all combinations
console.log(findAllCombinations(lists, keys));
```

**Output:** BOB DMD BNB AMA BPB BLB DND AOA DPD CQC BMB ANA ALA DOD DQD AQA BQB CLC CMC CNC COC DLD APA CPC

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [Find all possible combinations of words formed from the mobile keypad](https://www.techiedelight.com/find-possible-combinations-words-formed-from-mobile-keypad/ "Find all possible combinations of words formed from the mobile keypad")

> [Combinations of words formed by replacing given numbers with corresponding alphabets](https://www.techiedelight.com/combinations-of-words-formed-replacing-given-numbers-corresponding-english-alphabet/ "Combinations of words formed by replacing given numbers with corresponding alphabets")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.94/5. Vote count: 168

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
