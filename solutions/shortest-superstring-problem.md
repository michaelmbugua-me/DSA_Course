# Shortest Superstring Problem

> Source: https://www.techiedelight.com/shortest-superstring-problem/

[String](https://www.techiedelight.com/Category/String/)

Given a list of strings where no string is a substring of another, find the shortest string that contains each string in the list as a substring.

For example,

**Input:** [CATGC, CTAAGT, GCTA, TTCA, ATGCATC] **Output:** The shortest superstring is GCTAAGTTCATGCATC GCTAAGTTCATGCATC is the shortest possible string such that it contains every string in the input list as its substring. GCTAAGTT**CATGC** ATC G**CTAAGT** TCATGCATC **GCTA** AGTTCATGCATC GCTAAG**TTCA** TGCATC GCTAAGTTC**ATGCATC**

The shortest superstring problem is [NP-Hard](https://en.wikipedia.org/wiki/NP-hardness). But the following [greedy approach](https://techiedelight.com/greedy-algorithm-problems/) to this problem can result in a **“near-optimal” solution**.

**Input:** A set of strings S T = S while |T| > 1 do Let a and b be the most overlapping strings of T Replace a and b with the string obtained by overlapping and b T contains the shortest superstring of S

For example,

S = T = {**CATGC** , CTAAGT, GCTA, TTCA, **ATGCATC**} T = {CATGCATC, **CTAAGT** , **GCTA** , TTCA} T = {**CATGCATC** , GCTAAGT, **TTCA**} T = {**TTCATGCATC** , **GCTAAGT**} T = {GCTAAGTTCATGCATC}

Now how to find the most overlapping strings of T?

The above greedy algorithm looks simple, but the real difficulty lies in finding the most overlapping strings in a given set of strings. Following is the naive algorithm that does that:

Check maximum overlap for each pair of strings s1 and s2 by:

  1. Checking if the suffix of s1 matches with a prefix of s2 by comparing the last i character in s1 with the first i character in s2.
  2. Checking if the prefix of s1 matches with a suffix of s2 by comparing the first i character in s1 with the last i character in s2.

Return s1 and s2 involved in the maximum overlap.

Following is a TypeScript program that demonstrates it:

```ts
// Function to calculate the maximum overlap in two given strings
function findOverlappingPair(s1: string, s2: string): [number, string] {
    // `max` will store the maximum overlap, i.e., the maximum length
    // of the matching prefix and suffix
    let max = Number.MIN_SAFE_INTEGER;

    // consider minimum length
    const n = Math.min(s1.length, s2.length);

    // to keep track of the resultant string after maximum overlap
    let str = '';

    // check if the suffix of `s1` matches with the prefix of `s2`
    for (let i = 1; i <= n; i++) {
        // compare the last `i` characters in `s1` with the first `i`
        // characters in `s2`
        if (s1.slice(s1.length - i) === s2.slice(0, i)) {
            if (max < i) {
                // update `max` and `str`
                max = i;
                str = s1 + s2.slice(i);
            }
        }
    }

    // check if the prefix of `s1` matches with the suffix of `s2`
    for (let i = 1; i <= n; i++) {
        // compare the first `i` characters in `s1` with the last `i`
        // characters in `s2`
        if (s1.slice(0, i) === s2.slice(s2.length - i)) {
            if (max < i) {
                // update `max` and `str`
                max = i;
                str = s2 + s1.slice(i);
            }
        }
    }

    return [max, str];
}

// Function to calculate the smallest string that contains
// each string in a given set as a substring
function findShortestSuperstring(words: string[]): string {
    let n = words.length;

    // run `n-1` times to consider every pair
    while (n !== 1) {
        // to keep track of the maximum overlap
        let max = Number.MIN_SAFE_INTEGER;

        // stores index of strings involved in the maximum overlap
        let p = -1, q = -1;

        // keep track of the resultant string after maximum overlap
        let res_str = '';

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                // `r` will store the maximum length of the matching prefix,
                // and suffix `str` will store the resultant string after
                // maximum overlap of words[i] and words[j] if any
                const [r, str] = findOverlappingPair(words[i], words[j]);

                // check for the maximum overlap
                if (max < r) {
                    max = r;
                    res_str = str;
                    p = i;
                    q = j;
                }
            }
        }

        // ignore the last element in the next cycle
        n--;

        // if there is no overlap, append the value of words[n] to words[0]
        if (max === Number.MIN_SAFE_INTEGER) {
            words[0] = words[0] + words[n];
        } else {
            // copy the resultant string to index `p`
            words[p] = res_str;

            // copy the string at last index to index `q`
            words[q] = words[n];
        }
    }

    return words[0];
}

// demo
const words = ['CATGC', 'CTAAGT', 'GCTA', 'TTCA', 'ATGCATC'];

console.log('The shortest superstring is', findShortestSuperstring(words));
```

**Author:** Aditya Goel

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.64/5. Vote count: 85

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Greedy](https://www.techiedelight.com/Tags/Greedy/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
