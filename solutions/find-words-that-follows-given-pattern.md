# Find all words that follow the same order of characters as given pattern

> Source: https://www.techiedelight.com/find-words-that-follows-given-pattern/

[String](https://www.techiedelight.com/Category/String/)

Given a list of words and a pattern, find all words in the list that follows the same order of characters as that of the pattern.

For example,

**Input:** list = [leet, abcd, loot, geek, cool, for, peer, dear, seed, meet, noon, otto, mess, loss] pattern = moon _(pattern is 4 digits with distinct character at first and last index, and same character at 1st and 2nd index)_ **Output:** [leet, loot, geek, cool, peer, seed, meet] **Input:** list = [leet, abcd, loot, geek, cool, for, peer, dear, seed, meet, noon, otto, mess, loss] pattern = pqrs _(pattern is 4 digits and has all distinct characters)_ **Output:** [abcd, dear]

> 

We can use [hashing](https://techiedelight.com/hashing-in-data-structure/) to solve this problem. The idea is to use a map and associate each distinct character of the given word with the corresponding character in the pattern and store it. For each character in both word and the pattern, if the character is seen before, it should only be mapped to the corresponding character in the pattern. Note that we also have to associate each character in the given pattern with the corresponding character in the given word and follow the same process.

Let’s understand this by taking an example. Consider the word `'moon'` and the pattern `'noon'`. We will process each character in both word and pattern. Let’s check for mapping from the given word to the given pattern.

(m, n) —> As m is seen for the first time, map m to n. (o, o) —> As o is seen for the first time, map o to o. (o, o) —> As o is seen before, and it is already mapped to o, which is the same as current character in pattern o. (n, n) —> As n is seen for the first time, map n to n.

So, mapping from the given word to the given pattern is good. Now let’s check mapping from the pattern to the word.

(n, m) —> As n is seen for the first time, map n to m. (o, o) —> As o is seen for the first time, map o to o. (o, o) —> As o is seen before, and it is already mapped to o, which is the same as current character in pattern o. (n, n) —> As n is seen before, and it is already mapped to m, which is different from the current character in pattern n.

So, mapping from the given pattern to the given word fails, and we can say that the pattern doesn’t match the word. The algorithm can be implemented as follows in TypeScript:

```ts
// Function to print all words that follows the same order of
// characters as the given pattern
const patternMatch = (words: string[], pattern: string): void => {
    // invalid input
    if (!words || !pattern) {
        return;
    }

    // check each word in the input list
    for (const word of words) {
        // dict1 the stores mapping from word to pattern
        const dict1 = new Map<string, string>();

        // dict2 the stores mapping from pattern to word
        const dict2 = new Map<string, string>();

        // proceed only when the length of the pattern and word is the same
        if (word.length === pattern.length) {
            // process each character in both word and pattern
            let i = 0;
            while (i < pattern.length) {
                // `w` stores the current character of the current word
                const w = word[i];

                // `p` stores the current character of the pattern
                const p = pattern[i];

                /* check mapping from the current word to the given pattern */

                // if `w` is seen for the first time, store its mapping to `p`
                // in `dict1`
                if (!dict1.has(w)) {
                    dict1.set(w, p);
                }

                // if `w` is seen before, its mapped character should be `p`
                else if (dict1.get(w) !== p) {
                    break;
                }

                /* check mapping from the given pattern to the current word */

                // if `p` is seen for the first time, store its mapping to `w`
                // in `dict2`
                if (!dict2.has(p)) {
                    dict2.set(p, w);
                }

                // if `p` is seen before, its mapped character should be `w`
                else if (dict2.get(p) !== w) {
                    break;
                }

                i = i + 1;
            }

            // if the current word matches the pattern, print it
            if (i === pattern.length) {
                console.log(word);
            }
        }
    }
};

// a list of words
const words = ['leet', 'abcd', 'loot', 'geek', 'cool', 'for', 'peer', 'dear', 'seed',
    'meet', 'noon', 'otto', 'mess', 'loss'];

// given pattern
const pattern = 'moon';

patternMatch(words, pattern);
```

**Output:** leet loot geek cool peer seed meet

The time complexity of the above solution is O(n.m), where `n` is the total number of words and `m` is the pattern’s length.

Also See:

> [Determine whether a string matches with a given pattern](https://www.techiedelight.com/determine-pattern-matches-string-not/ "Determine whether a string matches with a given pattern")

> [Determine whether characters of a string follow a specific order](https://www.techiedelight.com/determine-string-follows-specified-order/ "Determine whether characters of a string follow a specific order")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 157

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
