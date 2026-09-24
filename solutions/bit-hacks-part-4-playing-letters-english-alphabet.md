# Bit Hacks – Part 4 (Playing with letters of the English alphabet)

> Source: https://www.techiedelight.com/bit-hacks-part-4-playing-letters-english-alphabet/

[Binary](https://www.techiedelight.com/Category/Binary/)

This post will discuss some bit hacks/tricks on letters of the English alphabet.

The following tricks are covered in this post:

  * Convert uppercase character to lowercase.
  * Convert lowercase character to uppercase.
  * Invert alphabet’s case.
  * Find a letter’s position in alphabet.

## Trick 1. Convert uppercase character to lowercase

We can easily convert an uppercase character to a corresponding lowercase character by taking its bitwise `OR` with a space.

```
// Convert uppercase character to lowercase
for (char ch = 'A'; ch <= 'Z'; ch++) {
    cout << char(ch | ' '));        // prints abcdefghijklmnopqrstuvwxyz
}
```

## Trick 2. Convert lowercase character to uppercase

Similarly, we can easily convert a lowercase character to a corresponding uppercase character by taking its bitwise `AND` with an underscore character.

```
// Convert lowercase character to uppercase
for (char ch = 'a'; ch <= 'z'; ch++) {
    cout << char(ch & '_'));    // prints ABCDEFGHIJKLMNOPQRSTUVWXYZ
}
```

## Trick 3. Invert alphabet’s case

The above-discussed methods will not work the other way, i.e., `(ch | ' ')` cannot convert lowercase alphabet to uppercase. The result will always be lowercase even if the letter is already lowercase. Similarly, `(ch & '_')` cannot convert the uppercase alphabet to lowercase. The result will always be uppercase even if the letter is already uppercase.

### How can we invert the alphabet’s case?

We can easily convert an alphabet’s case by taking its bitwise `XOR` with a space.

```
// Convert lowercase alphabet to uppercase
for (char ch = 'a'; ch <= 'z'; ch++) {
    cout << char(ch ^ ' '));        // prints ABCDEFGHIJKLMNOPQRSTUVWXYZ
}

// Convert uppercase alphabet to lowercase
for (char ch = 'A'; ch <= 'Z'; ch++) {
    cout << char(ch ^ ' '));        // prints abcdefghijklmnopqrstuvwxyz
}
```

### How does above solutions work?

The trick lies in ASCII codes of `A–Z` and `a–z`:

‘A’ — 01000001 ‘a’ — 01100001 ‘B’ — 01000010 ‘b’ — 01100010 ‘C’ — 01000011 ‘c’ — 01100011 ‘D’ — 01000100 ‘d’ — 01100100 ‘E’ — 01000101 ‘e’ — 01100101 and so on…

If we carefully analyze, we will notice that the ASCII codes of lowercase and uppercase characters differ only in their third significant bit. For uppercase characters, the bit is 0, and for lowercase characters, the bit is 1. If we could find a way to set/unset that particular bit, we can easily invert any character’s case. Now space `' '` has an ASCII code of `00100000` and `'_'` has an ASCII code of `01011111`.

  * If we take bitwise `OR` of an uppercase character with `' '`, the third significant bit will be set, and we will get its lowercase equivalent.
  * If we take bitwise `AND` of a lowercase character with `'_'`, the third significant bit will be unset, and we will get its uppercase equivalent.
  * If we take bitwise `XOR` of an uppercase or lowercase characters with `' '` (ASCII `00100000`), only its third significant bit will be toggled, i.e., lowercase becomes uppercase and vice versa.

## Trick 4. Find a letter’s position in alphabet

We can easily find a letter’s position `[1-26]` in the alphabet by taking its bitwise `AND` with ASCII 31 (`00011111` in binary). The case of the letter is irrelevant here. The explanation is left for the users as an exercise.

For example,

(‘A’ & 31) returns position 1 (‘c’ & 31) returns position 3

**Reference:**

<https://stackoverflow.com/questions/1533131/what-useful-bitwise-operator-code-tricks-should-a-developer-know-about>

**Also See:**

[Bit Hacks – Part 1 (Basic)](https://techiedelight.com/bit-hacks-part-1-basic/) [Bit Hacks – Part 2 (Playing with k’th bit)](https://techiedelight.com/bit-hacks-part-2-playing-kth-bit/) [Bit Hacks – Part 3 (Playing with the rightmost set bit of a number)](https://techiedelight.com/bit-hacks-part-3-playing-rightmost-set-bit-number/) [Bit Hacks – Part 5 (Find the absolute value of an integer without branching)](https://techiedelight.com/bit-hacks-part-5-find-absolute-value-integer-without-branching/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bit Hacks](https://www.techiedelight.com/Tags/Bit-Hacks/), [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
