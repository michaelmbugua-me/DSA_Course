# Replace all non-overlapping occurrences of a pattern

> Source: https://www.techiedelight.com/replace-non-overlapping-occurrences-pattern/

[String](https://www.techiedelight.com/Category/String/)

Given a string and a pattern, [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) replace all non-overlapping occurrences of the pattern in the string by a specified character.

## 1st Variant: Replace each occurrence of the pattern

**Input:** String = “ABCABCXABC”; Pattern = “ABC”; Character = ‘@’; **Output:** @@X@

The idea is to compare the substring formed by `S[i,i+n]` with the given pattern `P` for each position `i` in string `S`. If `P` matches with the substring S[i,i+n], replace the substring with the specified character; otherwise, copy the current character to the next free position from the beginning of the array.

Following is a TypeScript implementation based on the above idea:

```ts
// Function to compare two strings `S` and `P` and returns true if `P` is a
// prefix of `S`
function compare(S: string[], k: number, P: string[]): boolean {
    let i = 0;
    while (i + k < S.length && i < P.length) {
        if (S[i + k] !== P[i]) {
            break;
        }
        i = i + 1;
    }
    return i === P.length;
}

// In-place replace single or multiple occurrences of a pattern with a
// specified character
function convert(word: string, pattern: string, ch: string): string {
    const S = word.split('');
    const P = pattern.split('');

    let k = 0;

    // do for each character of the string
    let i = 0;
    while (i < S.length) {
        // compare substring S[i,i+n] with pattern `P`
        if (compare(S, i, P)) {
            // move ahead by the length of the pattern
            i = i + P.length - 1;
            // replace the substring with the specified character
            S[k] = ch;
        }
        else {
            // copy the current character to the next available position, `k`
            S[k] = S[i];
        }
        k = k + 1;
        i = i + 1;
    }

    // terminate the resultant string
    return S.slice(0, k).join('');
}

// input string, pattern, and character
const word = 'ABCABCXABC';
const pattern = 'ABC';
const ch = '@';

const s = convert(word, pattern, ch);
console.log(s);
```

**Output:** @@X@



## 2nd Variant: Replace single or multiple occurrences of the pattern

String = “ABCABCXABC”; Pattern = “ABC”; Character = ‘@’; **Output:** @X@

Here, if substring `S[i,i+n]` matches the given pattern `P`, immediately check for the substring formed by the next set of `n` characters. The idea is to replace all such multiple consecutive occurrences of the pattern with the specified character.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to compare two strings `S` and `P` and returns true if `P` is a
// prefix of `S`
function compare(S: string[], k: number, P: string[]): boolean {
    let i = 0;
    while (i + k < S.length && i < P.length) {
        if (S[i + k] !== P[i]) {
            break;
        }
        i = i + 1;
    }
    return i === P.length;
}

// In-place replace single or multiple occurrences of a pattern with a
// specified character
function convert(word: string, pattern: string, ch: string): string {
    const S = word.split('');
    const P = pattern.split('');

    let k = 0;

    // do for each character of the string
    let i = 0;
    while (i < S.length) {
        let found = false;

        // compare substring S[i,i+n] with pattern `P`
        while (compare(S, i, P)) {
            // move ahead by the length of the pattern
            i = i + P.length;
            found = true;
        }

        // if the pattern is found at least once
        if (found) {
            // replace all consecutive occurrences of the pattern
            // with the specified character
            S[k] = ch;
            k = k + 1;
        }

        // copy the current character to the next available position, `k`
        if (i < S.length) {
            S[k] = S[i];
            k = k + 1;
        }
        i = i + 1;
    }

    // Terminate the resultant string
    return S.slice(0, k).join('');
}

// input string, pattern, and character
const word = 'ABCABCXABC';
const pattern = 'ABC';
const ch = '@';

const s = convert(word, pattern, ch);
console.log(s);
```

**Output:** @X@



The best-case time complexity of the above solution is O(n + m), and the worst-case time complexity of the above solution is O(n.m), where `n` is the length of the text and `m` is the length of the pattern. The best case happens when the string is entirely made up of consecutive occurrences of the pattern.
