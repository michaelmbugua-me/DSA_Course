# Check if a sentence is syntactically correct or not

> Source: https://www.techiedelight.com/check-given-sentence-syntactically-correct-not/

[String](https://www.techiedelight.com/Category/String/)

Given a simple sentence and a set of syntax rules, validate if it is syntactically correct or not.

Assume that a sentence is syntactically correct if it fulfills the following rules:

  * A sentence must start with an uppercase character.
  * There must be spaces between words.
  * Then the sentence must end with a full stop `(.)`.
  * Two continuous spaces are not allowed.
  * Two continuous uppercase characters are not allowed.
  * However, the sentence can end after an uppercase character.

For example,

“This sentence is syntactically correct.” “This sentence is syntactically incorrect as two continuous spaces are not allowed.” “This sentence is syntactically correct Y.” “This sentence is syntactically incorRect as uppercase character is not allowed midway of the string.” “THis sentence is syntactically incorrect as two continuous uppercase characters are not allowed.” “This sentence is syntactically incorrect as it doesn’t end with a full stop”

The idea is to scan the given string and check for the above rules by comparing adjacent characters. Return false if any of the given constraints gets violated. Following is a TypeScript implementation of the idea:

```ts
const validateSentence = (s: string): boolean => {

    let index = 0;

    if (s[index] === s[index].toLowerCase() && s[index] !== s[index].toUpperCase()) {   // 1st condition
        return false;
    }

    while (index < s.length) {
        const ch = s[index];

        if (ch !== ch.toLowerCase() && ch !== ' ') {
            if (s[index + 1] !== s[index + 1].toLowerCase() && s[index + 1] !== ' ') {  // 5th condition
                return false;
            }

            if (index - 1 >= 0 && s[index - 1] !== ' ') {                              // 2nd condition
                return false;
            }
        }

        if (ch === ' ' && s[index + 1] === ' ') {                                      // 4th condition
            return false;
        }

        index = index + 1;
    }

    if (s[index - 2] === ' ' || s[index - 1] !== '.') {                                // 3rd condition
        return false;
    }

    return true;
};

// demo
const sentences = [
    'This sentence is syntactically correct.',

    'This sentence is syntactically  incorrect as two ' +
    'continuous spaces are not allowed.',

    'This sentence is syntactically correct Y.',

    'This sentence is syntactically incorRect as uppercase ' +
    'character is not allowed midway of the string.',

    'THis sentence is syntactically incorrect as two ' +
    'continuous uppercase characters are not allowed.',

    'This sentence is syntactically incorrect as it doesn\'t ' +
    'end with a full stop'
];

console.log('The valid sentences are –');
for (const sentence of sentences) {
    if (validateSentence(sentence)) {
        console.log(sentence);
    }
}
```

**Output:** The valid sentences are: This sentence is syntactically correct. This sentence is syntactically correct Y.

The time complexity of the above solution is O(n), where `n` is the length of the input string and doesn’t require any extra space.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.69/5. Vote count: 149

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
