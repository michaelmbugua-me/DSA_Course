# Reverse text without reversing individual words

> Source: https://www.techiedelight.com/reverse-text-without-reversing-individual-words/

Given a line of text, reverse the text without reversing the individual words.

For example,

**Input:** Technical Interview Preparation **Output:** Preparation Interview Technical

> 

A simple solution is to push the individual words from the beginning of the text into a [stack](https://techiedelight.com/stack-implementation/). Then, pop all the words from the stack and store them back into the text in LIFO order. The time complexity of the above solution is O(n) and requires O(n) extra space for the stack, where `n` is the length of the given text.

Following is the TypeScript program that demonstrates it:

```ts
// Function to reverse a text without reversing the individual words
function reverseText(s: string): string {
    // base case
    if (s === null || s.length === 0) {
        return s;
    }

    // `s[low…high]` forms a word
    let low = 0, high = 0;

    // create an empty stack
    const stack: string[] = [];

    // scan the text
    for (let i = 0; i < s.length; i++) {
        // if space is found, we found a word
        if (s[i] === ' ') {
            // push each word into the stack
            stack.push(s.slice(low, high + 1));

            // reset `low` and `high` for the next word
            low = high = i + 1;
        } else {
            high = i;
        }
    }

    // push the last word into the stack
    stack.push(s.slice(low));

    // construct the string by following the LIFO order
    let sb = '';
    while (stack.length) {
        sb += stack.pop() + ' ';
    }

    return sb.slice(0, sb.length - 1);  // remove last space
}

// demo
const s = 'Preparation Interview Technical';
console.log(reverseText(s));
```

## How can we improve space complexity?

The idea is to [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) reverse each word present in the input text and finally reverse the whole text to get the desired output. For instance,

**Input text:** Preparation Interview Technical **1\. Reverse each word:** noitaraperp weivretnI lacinhceT TI rof lairetam doog edivorp eW **2\. Reverse the whole text:** Technical Interview Preparation

The time complexity of this solution would be O(n) and doesn’t require any extra space. The problem with this approach is that it violates the problem constraints and does three traversals of the input text instead of just one.

```ts
// Utility function to swap the elements at positions `i` and `j` in the array
function swap(chars: string[], i: number, j: number): void {
    const temp = chars[i];
    chars[i] = chars[j];
    chars[j] = temp;
}

// Utility function to reverse sublist `chars[begin…end]`
function reverseSublist(chars: string[], begin: number, end: number): void {
    while (begin < end) {
        swap(chars, begin, end);
        begin = begin + 1;
        end = end - 1;
    }
}

// Function to reverse a text without reversing the individual words.
function reverseText(s: string): string {
    // base case
    if (s === null || s.length === 0) {
        return s;
    }

    // since a string is immutable, convert it to a character array
    const chars = s.split('');

    // `chars[low…high]` forms a word
    let low = 0, high = 0;

    // scan the text
    for (let i = 0; i < chars.length; i++) {
        // if space is found, we found a word
        if (chars[i] === ' ') {
            // reverse the found word
            reverseSublist(chars, low, high);

            // reset `low` and `high` for the next word
            low = high = i + 1;
        } else {
            high = i;
        }
    }

    // reverse the last word
    reverseSublist(chars, low, high);

    // reverse the whole text
    reverseSublist(chars, 0, chars.length - 1);

    return chars.join('');
}

// demo
const s = 'Preparation Interview Technical';
console.log(reverseText(s));
```

**Exercise:** Modify the first approach to divide string into tokens by using the string `split()` method.
