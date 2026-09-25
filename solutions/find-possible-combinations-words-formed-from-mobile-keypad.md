# Find all possible combinations of words formed from the mobile keypad

> Source: https://www.techiedelight.com/find-possible-combinations-words-formed-from-mobile-keypad/

[String](https://www.techiedelight.com/Category/String/)

Given a sequence of numbers between 2 and 9, print all possible combinations of words formed from the mobile keypad which has english alphabets associated with each key.

**Input:** [2, 3, 4] **Output:** ADG BDG CDG AEG BEG CEG AFG BFG CFG ADH BDH CDH AEH BEH CEH AFH BFH CFH ADI BDI CDI AEI BEI CEI AFI BFI CFI

> 

## Recursive Implementation

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to consider every input digit one by one, replace the digit with each character in the mobile keypad, and recur for the next digit. When all the digits are processed, print the result.

Following is the TypeScript implementation of the idea:

```ts
// Top-down recursive function to find all possible combinations of words formed
// from the mobile keypad
function findCombinations(keypad: Record<number, string[]>, keys: number[],
                combinations: Set<string>, index: number, result = ''): void {
    // if we have processed every digit of the key, print the result
    if (index === -1) {
        combinations.add(result);
        return;
    }

    // stores the current digit
    const digit = keys[index];

    // get the size of the list corresponding to the current digit
    const length = keypad[digit].length;

    // one by one, replace the digit with each character in the corresponding
    // list and recur for the next digit
    for (let i = 0; i < length; i++) {
        findCombinations(keypad, keys, combinations, index - 1, keypad[digit][i] + result);
    }
}

function findAllCombinations(keypad: Record<number, string[]>, keys: number[]): Set<string> {

    // invalid input - return empty set
    if (!keypad || !keys) {
        return new Set<string>();
    }

    // set to store all combinations
    const combinations = new Set<string>();

    // find and return all combinations
    findCombinations(keypad, keys, combinations, keys.length - 1);
    return combinations;
}

// mobile keypad
const keypad = {
    // 0 and 1 digit don't have any characters associated
    2: ['A', 'B', 'C'],
    3: ['D', 'E', 'F'],
    4: ['G', 'H', 'I'],
    5: ['J', 'K', 'L'],
    6: ['M', 'N', 'O'],
    7: ['P', 'Q', 'R', 'S'],
    8: ['T', 'U', 'V'],
    9: ['W', 'X', 'Y', 'Z']
};

// input number in the form of an array (number cannot start from 0 or 1)
const keys = [2, 3, 4];

// find all combinations
const combinations = findAllCombinations(keypad, keys);
console.log([...combinations].join(' '));
```

**Output:** ADG BDG CDG AEG BEG CEG AFG BFG CFG ADH BDH CDH AEH BEH CEH AFH BFH CFH ADI BDI CDI AEI BEI CEI AFI BFI CFI

## Iterative Implementation

We can also solve this problem iteratively using a list. The idea remains the same, but instead of recursing, we push the partial-word into a list. For each character associated with a current digit in the keypad, we append each word’s character in the output list and push the result into a list. So at the end of each iteration, the list contains all possible combinations of words until the current digit. We repeat this process until all digits are processed.

Following is the TypeScript implementation of the idea:

```ts
// Iterative function to find all possible combinations of words
// formed from the mobile keypad
function findAllCombinations(keypad: Record<number, string[]>, keys: number[]): Set<string> {

    // invalid input - return empty set
    if (!keypad || !keys) {
        return new Set<string>();
    }

    // maintain a list to store combinations of all possible words
    // push all characters associated with the first digit into the output list
    let combinations = new Set<string>(keypad[keys[0]].map(ch => String(ch)));

    // start from the second digit
    for (let i = 1; i < keys.length; i++) {
        // create a temporary list and clear the contents of the output list
        const prevList = new Set<string>(combinations);
        combinations = new Set<string>();

        // for each character associated with the current digit in the keypad,
        // append each word's current character in the output list
        for (const ch of keypad[keys[i]]) {
            for (const s of prevList) {
                combinations.add(s + ch);
            }
        }

        // list now contains all possible combinations of words
        // until the current digit
    }

    // print output list containing all combinations of words possible
    return combinations;
}

// mobile keypad
const keypad = {
    // 0 and 1 digit don't have any characters associated
    2: ['A', 'B', 'C'],
    3: ['D', 'E', 'F'],
    4: ['G', 'H', 'I'],
    5: ['J', 'K', 'L'],
    6: ['M', 'N', 'O'],
    7: ['P', 'Q', 'R', 'S'],
    8: ['T', 'U', 'V'],
    9: ['W', 'X', 'Y', 'Z']
};

// input number in the form of an array (number cannot start from 0 or 1)
const keys = [2, 3, 4];

// find all combinations
const combinations = findAllCombinations(keypad, keys);
console.log([...combinations].join(' '));
```

**Output:** [ADG, BDG, CDG, AEG, BEG, CEG, AFG, BFG, CFG, ADH, BDH, CDH, AEH, BEH, CEH, AFH, BFH, CFH, ADI, BDI, CDI, AEI, BEI, CEI, AFI, BFI, CFI]

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).
