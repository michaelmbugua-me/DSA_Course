# Find all palindromic permutations of a string

> Source: https://www.techiedelight.com/find-palindromic-permutations-string/

Given a string, find all palindromic permutations of it.

For example,

**Input:** str = xyxzwxxyz **Output:** [xxyzwzyxx, xxzywyzxx, xyxzwzxyx, xyzxwxzyx, xzxywyxzx, xzyxwxyzx, yxxzwzxxy, yxzxwxzxy, yzxxwxxzy, zxxywyxxz, zxyxwxyxz, zyxxwxxyz]

> 

We know that the left and right-half of a palindrome contains the same set of characters, so any palindromic permutations of a string are only possible if each character’s frequency in the string is even. Also, for the odd-length palindromic permutations, only a single occurrence of the odd occurring character is allowed. The odd character will form the middle character of all such palindromic permutations.

We can use the above observation to solve the given problem. The idea is to find the characters involved in the left-half of any palindromic permutation and construct a string containing all such characters. All characters involved in the left-half have even frequencies. Half of the characters will go in the left-half of the palindrome for any character with even frequency, and the other half will go in its right-half. After constructing the string, sort it to generate permutations in lexicographical order using [std::next_permutation](https://techiedelight.com/std_next_permutation-overview-implementation/) or [std::prev_permutation](https://techiedelight.com/std_prev_permutation-overview-implementation/) depending upon the string is sorted in ascending or descending order. We can easily construct the right-half by reversing the left-half for each permutation of the string (which will form the left-half of the palindrome). If the string contains one odd occurring element, all palindromic permutations will be of odd length with the middle element as the odd occurring character. As mentioned earlier, no solution is possible if the string contains more than one odd occurring element.

Following is the C++ implementation of the above idea:

```
#include <iostream>
#include <unordered_map>
#include <algorithm>
using namespace std;

// Function to find all palindromic permutations of a given string
void printPalindromicPermutations(string str)
{
    // base case
    if (str.size() == 0) {
        return;
    }

    // store frequency of each character of a string in a map
    unordered_map<char, int> freq;
    for (char ch: str) {
        freq[ch]++;
    }

    int odd = 0;                // stores odd character's count
    string mid;                 // stores odd character
    string left, right;         // stores left and right-half

    // iterate through the map
    for (auto itr: freq)
    {
        char ch = itr.first;    // current character
        int c = itr.second;     // character count

        if ((c & 1))            // if the count of the current character is odd
        {
            // if more than one odd character is present in the string,
            // palindromic permutations are not possible
            if (++odd > 1) {
                return;
            }

            c = c - 1;          // make count even or zero
            mid = itr.first;    // update mid
        }

        // append `c/2` characters to the left-half
        // (other `c/2` characters will go in the right-half)
        c = c/2;
        while (c--) {
            left = left + ch;   // update left
        }
    }

    // sort left-half to generate permutations in lexicographical order
    // no need to sort if we use `std::map` as keys are already sorted
    sort(left.begin(), left.end());

    while (1)
    {
        // the right-half will be the reverse of the left-half
        right = left;
        reverse(right.begin(), right.end());

        // print left-half, middle character (if any), and right-half
        cout << (left + mid + right) << endl;

        // find the next lexicographically greater permutation
        if (!next_permutation(left.begin(), left.end())) {
            break;
        }
    }

    // Note that we can also sort in reverse order and use `std::prev_permutation`
}

int main()
{
    string str = "xyxzwxxyz";

    printPalindromicPermutations(str);

    return 0;
}
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
