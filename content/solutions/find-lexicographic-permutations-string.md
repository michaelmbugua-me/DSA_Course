# Find all lexicographic permutations of a string

> Source: https://www.techiedelight.com/find-lexicographic-permutations-string/

In this post, we will see how to find all lexicographic permutations of a string where the repetition of characters is allowed.

For example, consider string `ABC`. It has the following lexicographic permutations with repetition of characters:

AAA AAB AAC ABA ABB ABC ACA ACB ACC BAA BAB BAC BBA BBB BBC BCA BCB BCC CAA CAB CAC CBA CBB CBC CCA CCB CCC

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. Start by sorting the string so that the characters are processed in the lexicographical order. Then at any point in the recursion, the current index in the output string is filled with each character of the input string one by one, and recur for the next index.

Following is a TypeScript implementation of the idea:

```ts
// Function to find all lexicographic permutations of a given
// string where the repetition of characters is allowed
function printLexicographicOrder(chars: string[], result: string = ''): void {

    // base condition (permutation found)
    if (result.length === chars.length) {
        // print the permutation and return
        process.stdout.write(result + ' ');
        return;
    }

    // consider all characters of the string one by one
    for (const c of chars) {
        printLexicographicOrder(chars, result + c);
    }
}

// Wrapper over `printLexicographicOrder()` function
function findLexicographic(s: string): void {

    // base case
    if (!s) {
        return;
    }

    // sort the string first to print in lexicographic order
    const chars = [...s].sort();

    printLexicographicOrder(chars);
}

const s = 'ACB';
findLexicographic(s);
```

**Output:** AAA AAB AAC ABA ABB ABC ACA ACB ACC BAA BAB BAC BBA BBB BBC BCA BCB BCC CAA CAB CAC CBA CBB CBC CCA CCB CCC

The above solution doesn’t handle duplicates in the output. For example, for string `AAB`, it prints the following:

AAA AAA AAB AAA AAA AAB ABA ABA ABB AAA AAA AAB AAA AAA AAB ABA ABA ABB BAA BAA BAB BAA BAA BAB BBA BBA BBB

Here, `AAA` is repeated `8` times. `AAB`, `ABA`, and `BAA` are repeated `4` times. Similarly, `ABB`, `BAB`, `BBA` are repeated `2` times. The following code efficiently handles duplicates in the output:

```ts
// Function to find all lexicographic permutations of a given
// string where the repetition of characters is allowed
function printLexicographicOrder(chars: string[], output: string = ''): void {

    // base condition (permutation found)
    if (output.length === chars.length) {

        // print the permutation and return
        process.stdout.write(output + ' ');
        return;
    }

    // consider all characters of the string one by one
    let i = 0;
    while (i < chars.length) {

        // skip adjacent duplicates
        while (i + 1 < chars.length && chars[i] === chars[i + 1]) {
            i = i + 1;
        }

        printLexicographicOrder(chars, output + chars[i]);
        i = i + 1;
    }
}

// Wrapper over `printLexicographicOrder()` function
function findLexicographic(s: string): void {

    // base case
    if (!s) {
        return;
    }

    // sort the string first to print in lexicographical order
    const chars = [...s].sort();
    printLexicographicOrder(chars);
}

const s = 'AAB';
findLexicographic(s);
```

**Output:** AAA AAB ABA ABB BAA BAB BBA BBB

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).
