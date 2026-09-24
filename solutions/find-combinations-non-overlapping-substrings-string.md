# Find all combinations of non-overlapping substrings of a string

> Source: https://www.techiedelight.com/find-combinations-non-overlapping-substrings-string/

Given a string, find all combinations of non-overlapping substrings of it.

Please note that the problem specifically targets [substrings](https://techiedelight.com/difference-between-subarray-subsequence-subset/#substring) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements.

For example,

**Input:** ABC **Output:** [A, B, C], [A, BC], [AB, C], [ABC]

**Input:** ABCD **Output:** [A, B, C, D], [A, B, CD], [A, BC, D], [A, BCD], [AB, C, D], [AB, CD], [ABC, D], [ABCD]

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. For a given string `str` of length `n`, consider every prefix `str[0, i]` of it one by one. We append the prefix to the output string by enclosing it within the parenthesis and recur for the remaining substring `str[i+1, n-1]`. If every substring of the original string is processed, add the output string to result.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <set>
using namespace std;

// Find all combinations of non-overlapping substrings of a given string
void findCombinations(string str, vector<string> &substring,
        set<vector<string>> &combinations)
{
    // if all characters of the input string are processed,
    // add the output string to result
    if (str.length() == 0)
    {
        vector<string> output(substring);
        combinations.insert(output);
        return;
    }

    // append each prefix `str[0, i]` to the output string and recur for
    // remaining substring `str[i+1, n-1]`
    for (int i = 0; i < str.length(); i++)
    {
        // push prefix `str[0, i]` into the output vector
        substring.push_back(str.substr(0, i + 1));

        // recur for the remaining string `str[i+1, n-1]`
        findCombinations(str.substr(i + 1), substring, combinations);

        // backtrack: remove current substring from the output vector
        substring.pop_back();
    }
}

set<vector<string>> findCombinations(string s)
{
    set<vector<string>> combinations;

    // base case
    if (s.length() == 0) {
        return combinations;
    }

    // vector to store non-overlapping substrings
    vector<string> substring;

    // find all non-overlapping substrings
    findCombinations(s, substring, combinations);

    return combinations;
}

// Utility function to print contents of the vector
void printVector(vector<string> const &out)
{
    for (auto str: out) {
        cout << str << " ";
    }
    cout << endl;
}

int main()
{
    // input string
    string str = "ABCD";

    // find all non-overlapping substrings
    set<vector<string>> combinations = findCombinations(str);

    for (vector<string> combination: combinations) {
        printVector(combination);
    }

    return 0;
}
```

**Output:** A B C D A B CD A BC D A BCD AB C D AB CD ABC D ABCD

##

```java
import java.util.*;

public class Main
{
    // Find all combinations of non-overlapping substrings of a given string
    public static void findCombinations(String str, Deque<String> substring,
                                        Set<List<String>> combinations)
    {
        // if all characters of the input string are processed,
        // add the output string to result
        if (str.length() == 0) {
            combinations.add(new ArrayList<>(substring));
            return;
        }

        // add each substring `str[0, i]` to the output string and recur for
        // remaining substring `str[i+1, n-1]`
        for (int i = 0; i < str.length(); i++)
        {
            // push substring `str[0, i]` into the output string
            substring.addLast(str.substring(0, i + 1));

            // recur for the remaining string `str[i+1, n-1]`
            findCombinations(str.substring(i + 1), substring, combinations);

            // backtrack: remove current substring from the output
            substring.pollLast();
        }
    }

    public static Set<List<String>> findCombinations(String s)
    {
        Set<List<String>> combinations = new HashSet<>();

        // base case
        if (s == null || s.length() == 0) {
            return combinations;
        }

        // string to store non-overlapping substrings
        Deque<String> substring = new ArrayDeque<>();

        // find all non-overlapping substrings
        findCombinations(s, substring, combinations);

        return combinations;
    }

    public static void main(String[] args)
    {
        // input string
        String str = "ABCD";

        // find all non-overlapping substrings
        Set<List<String>> combinations = findCombinations(str);
        System.out.println(combinations);
    }
}
```

##

```python3
# Find all combinations of non-overlapping substrings of a given string
def findCombinations(s, combinations, substring=[]):

    # if all characters of the input are processed,
    # add the output string to result
    if not s:
        # output string to store non-overlapping substrings
        combinations.add(tuple(substring))
        return

    # add each substring `s[0, i]` to the output string and recur for
    # remaining substring `s[i+1, n-1]`
    for i in range(len(s)):
        # push substring `s[0, i]` into the output string
        substring.append(s[:i + 1])

        # recur for the remaining string `s[i+1, n-1]`
        findCombinations(s[i + 1:], combinations, substring)

        # backtrack: remove current substring from the output
        substring.pop()

def findAllCombinations(s):
    # base case
    if not s:
        return set()

    # find all non-overlapping substrings
    combinations = set()
    findCombinations(s, combinations)
    return combinations

if __name__ == '__main__':

    # input string
    s = 'ABCD'

    # find all non-overlapping substrings
    combinations = findAllCombinations(s)
    print(combinations)
```

The time complexity of the above solution is exponential as there are exactly `2n-1` combinations, where `n` is the length of the input string.

Also See:

> [Break a string into all possible combinations of non-overlapping substrings](https://www.techiedelight.com/break-string-non-overlapping-substrings/ "Break a string into all possible combinations of non-overlapping substrings")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.74/5. Vote count: 157

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
