# Determine whether a string matches with a given pattern

> Source: https://www.techiedelight.com/determine-pattern-matches-string-not/

Given a string and a pattern, determine whether a string matches with a given pattern. The solution should not use any regex.

For example,

**Input:** string: codesleepcode pattern: XYX **Output:** X: code Y: sleep **Input:** string: codecodecode pattern: XXX **Output:** X: code

> 

We can use [backtracking](https://techiedelight.com/backtracking-interview-questions/) to solve this problem. The idea is to maintain a map that stores a substring mapped to each character in the pattern. Now, if any character is not seen before, consider all possible substrings and recur to see if it leads to the solution or not. If a solution is found, print the string mapped to each distinct character in the pattern using the map.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// Function to determine whether a string matches with a given pattern
bool isMatch(string word, int i, string pattern, int j, auto &map)
{
    int n = word.size(), m = pattern.size();

    // base condition
    if (n < m) {
        return false;
    }

    // if both pattern and the string reaches the end
    if (i == n && j == m) {
        return true;
    }

    // if either string or pattern reaches the end
    if (i == n || j == m) {
        return false;
    }

    // consider the next character from the pattern
    char curr = pattern[j];

    // if the character is seen before
    if (map.find(curr) != map.end())
    {
        string s = map[curr];
        int k = s.size();

        // return false if the next `k` characters of the given string
        // don't match with `s`
        if (word.substr(i, k).compare(s)) {
            return false;
        }

        // recur for remaining characters if the next `k` characters match
        return isMatch(word, i + k, pattern, j + 1, map);
    }

    // process all remaining characters in the string if the current character is
    // never seen before
    for (int k = 1; k <= n - i; k++)
    {
        // insert substring formed by next `k` characters of the string
        // into the map
        map[curr] = word.substr(i, k);

        // check if it leads to the solution
        if (isMatch(word, i + k, pattern, j + 1, map)) {
            return true;
        }

        // otherwise, backtrack – remove the current character from the map
        map.erase(curr);
    }

    return false;
}

int main()
{
    // input string and pattern
    string word = "codesleepcode";
    string pattern = "XYX";

    // create a map to store mappings between the pattern and string
    unordered_map<char, string> mapping;

    // check for solution
    if (isMatch(word, 0, pattern, 0, mapping))
    {
        for (auto entry: mapping) {
            cout << entry.first << ": " << entry.second << endl;
        }
    }
    else {
        cout << "Solution doesn't exist";
    }

    return 0;
}
```

**Output:** Y: sleep X: code

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Function to determine whether a string matches with a given pattern
    public static boolean isMatch(String word, int i, String pattern, int j,
                                  Map<Character, String> map)
    {
        // invalid word
        if (word == null || pattern == null || word.length() < pattern.length()) {
            return false;
        }

        int n = word.length(), m = pattern.length();

        // base condition
        if (n < m) {
            return false;
        }

        // if both pattern and the string reaches the end
        if (i == n && j == m) {
            return true;
        }

        // if either string or pattern reaches the end
        if (i == n || j == m) {
            return false;
        }

        // consider the next character from the pattern
        char curr = pattern.charAt(j);

        // if the character is seen before
        if (map.containsKey(curr))
        {
            String s = map.get(curr);
            int k = s.length();

            // `ss` stores next `k` characters of the given string
            String ss;
            if (i + k < word.length()) {
                ss = word.substring(i, i + k);
            }
            else {
                ss = word.substring(i);
            }

            // return false if the next `k` characters don't match with `s`
            if (ss.compareTo(s) != 0) {
                return false;
            }

            // recur for remaining characters if the next `k` characters match
            return isMatch(word, i + k, pattern, j + 1, map);
        }

        // process all remaining characters in the string if the current
        // character is never seen before
        for (int k = 1; k <= n - i; k++)
        {
            // insert substring formed by next `k` characters of the string
            // into the map
            map.put(curr, word.substring(i, i + k));

            // check if it leads to the solution
            if (isMatch(word, i + k, pattern, j + 1, map)) {
                return true;
            }

            // otherwise, backtrack – remove the current character from the map
            map.remove(curr);
        }

        return false;
    }

    public static void main(String[] args)
    {
        // input string and pattern
        String word = "codesleepcode";
        String pattern = "XYX";

        // create a map to store mappings between the pattern and string
        Map<Character, String> mapping = new HashMap<>();

        // check for solution
        if (isMatch(word, 0, pattern, 0, mapping)) {
            System.out.println(mapping);
        } else {
            System.out.println("Solution doesn't exist");
        }
    }
}
```

##

```python3
# Function to determine whether a string matches with a given pattern
def isMatch(word, pattern, d, i=0, j=0):

    # invalid input
    if not word or not pattern:
        return False

    n = len(word)
    m = len(pattern)

    # base condition
    if n < m:
        return False

    # if both pattern and the string reaches the end
    if i == n and j == m:
        return True

    # if either string or pattern reaches the end
    if i == n or j == m:
        return False

    # consider the next character from the pattern
    curr = pattern[j]

    # if the character is seen before
    if curr in d:

        s = d[curr]
        k = len(s)

        # `ss` stores next `k` characters of the given string
        if i + k < len(word):
            ss = word[i:i + k]
        else:
            ss = word[i:]

        # return false if the next `k` characters don't match with `s`
        if ss != s:
            return False

        # recur for remaining characters if the next `k` characters match
        return isMatch(word, pattern, d, i + k, j + 1)

    # process all remaining characters in the string if the current
    # character is never seen before
    for k in range(1, n - i + 1):

        # insert substring formed by next `k` characters of the string
        # into the dictionary
        d[curr] = word[i:i + k]

        # check if it leads to the solution
        if isMatch(word, pattern, d, i + k, j + 1):
            return True

        # otherwise, backtrack – remove the current character from the dictionary
        d.pop(curr)

    return False

if __name__ == '__main__':

    # input string and pattern
    word = 'codesleepcode'
    pattern = 'XYX'

    # create a dictionary to store mappings between the pattern and string
    d = {}

    # check for solution
    if isMatch(word, pattern, d):
        print(d)
    else:
        print('Solution doesn\'t exist')
```

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

**Author:** Aditya Goel

Also See:

> [Check if a string matches with the given wildcard pattern](https://www.techiedelight.com/check-string-matches-with-wildcard-pattern/ "Check if a string matches with the given wildcard pattern")

> [Determine whether characters of a string follow a specific order](https://www.techiedelight.com/determine-string-follows-specified-order/ "Determine whether characters of a string follow a specific order")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
