# Word Break Problem – Dynamic Programming

> Source: https://www.techiedelight.com/word-break-problem/

Word Break Problem: Given a string and a dictionary of words, determine if the string can be segmented into a space-separated sequence of one or more dictionary words.

For example,

**Input:** dict[] = { this, th, is, famous, Word, break, b, r, e, a, k, br, bre, brea, ak, problem }; word = Wordbreakproblem **Output:** Word b r e a k problem Word b r e ak problem Word br e a k problem Word br e ak problem Word bre a k problem Word bre ak problem Word brea k problem Word break problem

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. We consider all prefixes of the current string one by one and check if the current prefix is present in the dictionary or not. If the prefix is a valid word, add it to the output string and recur for the remaining string. The recursion’word base case is when the string becomes empty, and we print the output string.

Following is a TypeScript implementation of the idea:

```ts
// Function to segment given string into a space-separated
// sequence of one or more dictionary words
function wordBreak(words: string[], word: string, out = ''): void {
    // if the end of the string is reached,
    // print the output string
    if (word.length === 0) {
        console.log(out);
        return;
    }

    for (let i = 1; i <= word.length; i++) {
        // consider all prefixes of the current string
        const prefix = word.slice(0, i);

        // if the prefix is present in the dictionary, add it to the
        // output string and recur for the remaining string
        if (words.includes(prefix)) {
            wordBreak(words, word.slice(i), out + ' ' + prefix);
        }
    }
}

// List of strings to represent a dictionary
const words = [
    'self', 'th', 'is', 'famous', 'Word', 'break', 'b', 'r',
    'e', 'a', 'k', 'br', 'bre', 'brea', 'ak', 'problem'
];

// input string
const word = 'Wordbreakproblem';

wordBreak(words, word);
```

**Output:** Word b r e a k problem Word b r e ak problem Word br e a k problem Word br e ak problem Word bre a k problem Word bre ak problem Word brea k problem Word break problem

There is a very famous alternate version of the above problem in which we only have to determine if a string can be segmented into a space-separated sequence of one or more dictionary words or not, and not actually print all sequences. This version is demonstrated below in TypeScript:

```ts
// Function to determine if a string can be segmented into space-separated
// sequence of one or more dictionary words
function wordBreak(words: string[], word: string): boolean {
    // return true if the end of the string is reached,
    if (word.length === 0) {
        return true;
    }

    for (let i = 1; i <= word.length; i++) {
        // consider all prefixes of the current string
        const prefix = word.slice(0, i);

        // return true if the prefix is present in the dictionary and the remaining
        // string also forms a space-separated sequence of one or more
        // dictionary words
        if (words.includes(prefix) && wordBreak(words, word.slice(i))) {
            return true;
        }
    }

    // return false if the string can't be segmented
    return false;
}

// List of strings to represent a dictionary
const words = [
    'self', 'th', 'is', 'famous', 'Word', 'break', 'b', 'r',
    'e', 'a', 'k', 'br', 'bre', 'brea', 'ak', 'problem'
];

// input string
const word = 'Wordbreakproblem';

if (wordBreak(words, word)) {
    console.log('The string can be segmented');
} else {
    console.log("The string can't be segmented");
}
```

The time complexity of the above solution is exponential and occupies space in the call stack.

The word-break problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). We have seen that the problem can be broken down into smaller subproblem, which can further be broken down into yet smaller subproblem, and so on. The word-break problem also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), so we will end up solving the same subproblem over and over again. If we draw the recursion tree, we can see that the same subproblems are getting computed repeatedly.

The problems having optimal substructure and overlapping subproblem can be solved by dynamic programming, in which subproblem solutions are _memo_ ized rather than computed repeatedly. This method is demonstrated below in TypeScript:

```ts
// Function to determine if a string can be segmented into space-separated
// sequence of one or more dictionary words
function wordBreak(dict: Set<string>, word: string, lookup: number[]): boolean {
    // `n` stores length of the current substring
    const n = word.length;

    // return true if the end of the string is reached
    if (n === 0) {
        return true;
    }

    // if the subproblem is seen for the first time
    if (lookup[n] === -1) {
        // mark subproblem as seen (0 initially assuming string
        // can't be segmented)
        lookup[n] = 0;

        for (let i = 1; i <= n; i++) {
            // consider all prefixes of the current string
            const prefix = word.slice(0, i);

            // if the prefix is found in the dictionary, then recur for the suffix
            if (dict.has(prefix) && wordBreak(dict, word.slice(i), lookup)) {
                // return true if the string can be segmented
                lookup[n] = 1;
                return true;
            }
        }
    }

    // return solution to the current subproblem
    return lookup[n] === 1;
}

// set of strings to represent a dictionary
// we can also use a Trie or an array to store a dictionary
const dict = new Set([
    'this', 'th', 'is', 'famous', 'Word', 'break', 'b', 'r',
    'e', 'a', 'k', 'br', 'bre', 'brea', 'ak', 'problem'
]);

// input string
const word = 'Wordbreakproblem';

// lookup array to store solutions to subproblems
// lookup[i] stores if substring word[n-i…n) can be segmented or not
const lookup: number[] = new Array(word.length + 1).fill(-1);

if (wordBreak(dict, word, lookup)) {
    console.log('The string can be segmented');
} else {
    console.log("The string can't be segmented");
}
```

**Output:** The string can be segmented
