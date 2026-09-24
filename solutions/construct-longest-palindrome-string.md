# Construct the longest palindrome by shuffling or deleting characters from a string

> Source: https://www.techiedelight.com/construct-longest-palindrome-string/

[String](https://www.techiedelight.com/Category/String/)

Write an efficient algorithm to construct the longest palindrome by shuffling or deleting characters from a given string.

For example,

**Input:** ABBDAB **Output:** The longest palindrome is BABAB (or BADAB or ABBBA or ABDBA) **Input:** ABCDD **Output:** The longest palindrome is DAD (or DBD or DCD)

> 

We know that the left and right half of a palindrome contains the same set of characters in reverse order, and optionally a middle character, which can be anything. The idea is to find all even occurring characters and construct the left half of the palindrome using half their count. Their ordering doesn’t matter as shuffling is permitted. Then we can easily build the right half from the left half by reversing it. All odd occurring characters are ignored except the one, which forms the resultant palindromic string’s middle character.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Construct the longest palindrome by shuffling or deleting
// characters from a given string
string longestPalindrome(string str)
{
    // create a frequency map for characters of a given string
    unordered_map<char, int> freq;
    for (char ch: str) {
        freq[ch]++;
    }

    string mid_char;              // stores odd character
    string left;                // stores left substring

    // iterate through the frequency map
    for (auto &p: freq)
    {
        char ch = p.first;      // get current character
        int count = p.second;   // get character frequency

        // if the current character's frequency is odd,
        // update mid to current char (and discard the old one)
        if (count & 1) {
            mid_char = ch;
        }

        // append half of the characters to the left substring
        // (the other half goes to the right substring in reverse order)
        left.append(count/2, ch);
    }

    // the right substring will be the reverse of the left substring
    string right(left.rbegin(), left.rend());

    // return string formed by the left substring, mid-character (if any),
    // and the right substring
    return (left + mid_char + right);
}

int main()
{
    string str = "ABBDAB";

    cout << "The longest palindrome is " << longestPalindrome(str);

    return 0;
}
```

**Output:** The longest palindrome is BABAB

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Construct the longest palindrome by shuffling or deleting
    // characters from a given string
    public static String longestPalindrome(String str)
    {
        // base case
        if (str == null || str.length() == 0) {
            return str;
        }

        // create a frequency map for characters of a given string
        Map<Character, Integer> freq = new HashMap<>();
        for (char ch: str.toCharArray()) {
            freq.put(ch, freq.getOrDefault(ch, 0) + 1);
        }

        String mid_char = "";                  // stores odd character
        StringBuilder left = new StringBuilder();   // stores left substring

        // iterate through the frequency map
        for (var entry: freq.entrySet())
        {
            char ch = entry.getKey();               // get current character
            int count = entry.getValue();           // get character frequency

            // if the current character's frequency is odd,
            // update mid to current char (and discard the old one)
            if (count % 2 == 1) {
                mid_char = String.valueOf(ch);
            }

            // append half of the characters to the left substring
            // (the other half goes to the right substring in reverse order)
            left.append(String.valueOf(ch).repeat(count / 2));
        }

        // the right substring will be the reverse of the left substring
        StringBuilder right = new StringBuilder(left).reverse();

        // return string formed by the left substring, mid-character (if any),
        // and the right substring
        return ("" + left + mid_char + right);
    }

    public static void main(String[] args)
    {
        String str = "ABBDAB";
        System.out.print("The longest palindrome is " + longestPalindrome(str));
    }
}
```

##

```python3
# Construct the longest palindrome by shuffling or deleting
# characters from a given string
def longestPalindrome(s):

    # base case
    if not s:
        return ''

    # create a dictionary for characters of a given string
    freq = {}

    for ch in s:
        freq[ch] = freq.get(ch, 0) + 1

    left = ''                   # stores left substring
    mid = ''

    # iterate through the frequency dictionary
    for ch, count in freq.items():

        # if the current character's frequency is odd,
        # update mid to current (and discard the old one)
        if count % 2 == 1:
            mid = ch            # stores odd character

        # append half of the characters to the left substring
        # (the other half goes to the right substring in reverse order)
        for i in range(count // 2):
            left += ch

    # the right substring will be the reverse of the left substring
    right = left[::-1]

    # return formed by the left substring, mid-character (if any),
    # and the right substring
    return left + mid + right

if __name__ == '__main__':

    s = 'ABBDAB'
    print('The longest palindrome is', longestPalindrome(s))
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the length of the input string.

Also See:

> [Find length of the longest palindrome possible from a string](https://www.techiedelight.com/find-length-longest-palindrome-possible-from-string/ "Find length of the longest palindrome possible from a string")

> [Find all palindromic permutations of a string](https://www.techiedelight.com/find-palindromic-permutations-string/ "Find all palindromic permutations of a string")

> [Find the longest substring of a string containing `k` distinct characters](https://www.techiedelight.com/find-longest-substring-containing-k-distinct-characters/ "Find the longest substring of a string containing `k` distinct characters")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.76/5. Vote count: 270

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
