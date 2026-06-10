# Longest Common Substring Problem

> Source: https://www.techiedelight.com/longest-common-substring-problem/

The longest common substring problem is the problem of finding the longest string (or strings) that is a substring (or are substrings) of two strings.

The problem differs from the problem of finding the [Longest Common Subsequence (LCS)](https://techiedelight.com/longest-common-subsequence/). Unlike subsequences, [substrings](https://techiedelight.com/difference-between-subarray-subsequence-subset/#substring) are required to occupy consecutive positions within the original string.

For example, the longest common substring of strings `ABABC`, `BABCA` is the string `BABC` having length 4. Other common substrings are `ABC`, `A`, `AB`, `B`, `BA`, `BC`, and `C`.

> 

A naive solution would be to consider all substrings of the second string and find the longest substring that is also a substring of the first string. The time complexity of this solution would be O((m + n) × m2), where `m` and `n` are the length of the strings `X` and `Y`, as it takes (m+n) time for substring search, and there are m2 substrings of the second string. We can optimize this method by considering substrings in order of their decreasing lengths and return as soon as any substring matches the first string. But the worst-case time complexity remains the same when no common characters are present.

Can we do better?

The idea is to find the longest common suffix for all pairs of prefixes of the strings using dynamic programming using the relation:

LCSuffix[i][j] = | LCSuffix[i-1][j-1] + 1 (if X[i-1] = Y[j-1]) | 0 (otherwise) where, 0 <= i – 1 < m, where `m` is the length of string `X` 0 <= j – 1 < n, where `n` is the length of string `Y`

For example, consider strings `ABAB` and `BABA`.

Finally, the longest common substring length would be the maximal of these longest common suffixes of all possible prefixes.

The following solution in TypeScript finds the length of the longest repeated subsequence of sequences `X` and `Y` iteratively using the [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) property of the [LCS problem](https://techiedelight.com/longest-common-subsequence/).

```ts
// Function to find the longest common substring of sequences `X[0…m-1]` and `Y[0…n-1]`
function LCS(X: string, Y: string, m: number, n: number): string {
  let maxLength = 0;        // stores the max length of LCS
  let endingIndex = m;      // stores the ending index of LCS in `X`

  // `lookup[i][j]` stores the length of LCS of substring `X[0…i-1]` and `Y[0…j-1]`
  const lookup: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  // fill the lookup table in a bottom-up manner
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // if the current character of `X` and `Y` matches
      if (X[i - 1] === Y[j - 1]) {
        lookup[i][j] = lookup[i - 1][j - 1] + 1;

        // update the maximum length and ending index
        if (lookup[i][j] > maxLength) {
          maxLength = lookup[i][j];
          endingIndex = i;
        }
      }
    }
  }

  // return longest common substring having length `maxLength`
  return X.slice(endingIndex - maxLength, endingIndex);
}

const X = 'ABC';
const Y = 'BABA';

const m = X.length, n = Y.length;

// Find longest common substring
console.log('The longest common substring is', LCS(X, Y, m, n));
```

**Output:** The longest common substring is AB

The time complexity of the above solution is O(m.n) and requires O(m.n) extra space, where `m` and `n` are the length of the strings `X` and `Y`, respectively. The space complexity of the above solution can be improved to O(n) as calculating LCS of a row of the LCS table requires only the solutions to the current row and the previous row. We can also store only non-zero values in the rows. We can do this using hash tables instead of arrays.

We can also solve this problem in O(m + n) time by using a generalized [suffix tree](https://en.wikipedia.org/wiki/Suffix_tree). We will be soon discussing the suffix tree approach in a separate post.

**Exercise:** Write space optimized code for iterative version.

**References:** <https://en.wikipedia.org/wiki/Longest_common_substring_problem>

Also See:

> [Longest Common Subsequence | Finding all LCS](https://www.techiedelight.com/longest-common-subsequence-finding-lcs/ "Longest Common Subsequence | Finding all LCS")

> [Longest Common Subsequence Problem](https://www.techiedelight.com/longest-common-subsequence/ "Longest Common Subsequence Problem")

> [Longest Common Subsequence of k–sequences](https://www.techiedelight.com/longest-common-subsequence-of-k-sequences/ "Longest Common Subsequence of k–sequences")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 207

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
