# Find all palindromic permutations of a string

> Source: https://www.techiedelight.com/find-palindromic-permutations-string/

Given a string, find all palindromic permutations of it.

For example,

**Input:** str = xyxzwxxyz **Output:** [xxyzwzyxx, xxzywyzxx, xyxzwzxyx, xyzxwxzyx, xzxywyxzx, xzyxwxyzx, yxxzwzxxy, yxzxwxzxy, yzxxwxxzy, zxxywyxxz, zxyxwxyxz, zyxxwxxyz]

> 

We know that the left and right-half of a palindrome contains the same set of characters, so any palindromic permutations of a string are only possible if each character’s frequency in the string is even. Also, for the odd-length palindromic permutations, only a single occurrence of the odd occurring character is allowed. The odd character will form the middle character of all such palindromic permutations.

We can use the above observation to solve the given problem. The idea is to find the characters involved in the left-half of any palindromic permutation and construct a string containing all such characters. All characters involved in the left-half have even frequencies. Half of the characters will go in the left-half of the palindrome for any character with even frequency, and the other half will go in its right-half. After constructing the string, sort it to generate permutations in lexicographical order (similar to [std::next_permutation](https://techiedelight.com/std_next_permutation-overview-implementation/) in C++). We can easily construct the right-half by reversing the left-half for each permutation of the string (which will form the left-half of the palindrome). If the string contains one odd occurring element, all palindromic permutations will be of odd length with the middle element as the odd occurring character. As mentioned earlier, no solution is possible if the string contains more than one odd occurring element.

Following is the TypeScript implementation of the above idea:

```ts
// Function to rearrange the string into the next greater lexicographic
// permutation (like `std::next_permutation` in C++). It returns false if
// the string is already the highest permutation
function nextPermutation(curr: string[]): boolean {
    // find the longest non-increasing suffix
    let i = curr.length - 1;
    while (i > 0 && curr[i - 1] >= curr[i]) {
        i--;
    }

    // the string is already the highest permutation
    if (i === 0) {
        return false;
    }

    // find the rightmost successor of the pivot `curr[i - 1]`
    let j = curr.length - 1;
    while (curr[j] <= curr[i - 1]) {
        j--;
    }

    // swap the pivot with the successor
    [curr[i - 1], curr[j]] = [curr[j], curr[i - 1]];

    // reverse the suffix
    for (let l = i, r = curr.length - 1; l < r; l++, r--) {
        [curr[l], curr[r]] = [curr[r], curr[l]];
    }

    return true;
}

// Function to find all palindromic permutations of a given string
function printPalindromicPermutations(str: string): void {
    // base case
    if (str.length === 0) {
        return;
    }

    // store frequency of each character of a string in a map
    const freq = new Map<string, number>();
    for (const ch of str) {
        freq.set(ch, (freq.get(ch) ?? 0) + 1);
    }

    let odd = 0;                    // stores odd character's count
    let mid = '';                   // stores odd character
    let left = '';                  // stores left-half

    // iterate through the map
    for (const [ch, count] of freq)
    {
        let c = count;              // character count

        if (c & 1)                  // if the count of the current character is odd
        {
            // if more than one odd character is present in the string,
            // palindromic permutations are not possible
            if (++odd > 1) {
                return;
            }

            c = c - 1;              // make count even or zero
            mid = ch;               // update mid
        }

        // append `c/2` characters to the left-half
        // (other `c/2` characters will go in the right-half)
        c = Math.floor(c / 2);
        while (c--) {
            left = left + ch;       // update left
        }
    }

    // sort left-half to generate permutations in lexicographical order
    const chars = left.split('').sort();
    left = chars.join('');

    while (true)
    {
        // the right-half will be the reverse of the left-half
        const right = left.split('').reverse().join('');

        // print left-half, middle character (if any), and right-half
        console.log(left + mid + right);

        // find the next lexicographically greater permutation
        if (!nextPermutation(chars)) {
            break;
        }
        left = chars.join('');
    }
}

const str = "xyxzwxxyz";

printPalindromicPermutations(str);
```

**Output:** xxyzwzyxx xxzywyzxx xyxzwzxyx xyzxwxzyx xzxywyxzx xzyxwxyzx yxxzwzxxy yxzxwxzxy yzxxwxxzy zxxywyxxz zxyxwxyxz zyxxwxxyz

The worst-case time complexity of the above solution is O(n.n!), where `n` is the length of the input string and doesn’t require any extra space.

Also See:

> [Construct the longest palindrome by shuffling or deleting characters from a string](https://www.techiedelight.com/construct-longest-palindrome-string/ "Construct the longest palindrome by shuffling or deleting characters from a string")

> [Find length of the longest palindrome possible from a string](https://www.techiedelight.com/find-length-longest-palindrome-possible-from-string/ "Find length of the longest palindrome possible from a string")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 159

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
