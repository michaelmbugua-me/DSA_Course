# Word Break Problem – Dynamic Programming

> Source: https://www.techiedelight.com/word-break-problem/

Word Break Problem: Given a string and a dictionary of words, determine if the string can be segmented into a space-separated sequence of one or more dictionary words.

For example,

**Input:** dict[] = { this, th, is, famous, Word, break, b, r, e, a, k, br, bre, brea, ak, problem }; word = Wordbreakproblem **Output:** Word b r e a k problem Word b r e ak problem Word br e a k problem Word br e ak problem Word bre a k problem Word bre ak problem Word brea k problem Word break problem

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. We consider all prefixes of the current string one by one and check if the current prefix is present in the dictionary or not. If the prefix is a valid word, add it to the output string and recur for the remaining string. The recursion’word base case is when the string becomes empty, and we print the output string.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to segment a given string into a space-separated
// sequence of one or more dictionary words
void wordBreak(vector<string> const &dict, string word, string out)
{
    // if the end of the string is reached,
    // print the output string

    if (word.size() == 0)
    {
        cout << out << endl;
        return;
    }

    for (int i = 1; i <= word.size(); i++)
    {
        // consider all prefixes of the current string
        string prefix = word.substr(0, i);

        // if the prefix is present in the dictionary, add it to the
        // output string and recur for the remaining string

        if (find(dict.begin(), dict.end(), prefix) != dict.end()) {
            wordBreak(dict, word.substr(i), out + " " + prefix);
        }
    }
}

// Word Break Problem Implementation in C++
int main()
{
    // vector of strings to represent a dictionary
    // we can also use a Trie or a set to store a dictionary

    vector<string> dict = { "this", "th", "is", "famous", "Word", "break",
            "b", "r", "e", "a", "k", "br", "bre", "brea", "ak", "problem" };

    // input string
    string word = "Wordbreakproblem";

    wordBreak(dict, word, "");

    return 0;
}
```

##

```java
import java.util.Arrays;
import java.util.List;

class Main
{
    // Function to segment given string into a space-separated
    // sequence of one or more dictionary words

    public static void wordBreak(List<String> dict, String word, String out)
    {
        // if the end of the string is reached,
        // print the output string

        if (word.length() == 0)
        {
            System.out.println(out);
            return;
        }

        for (int i = 1; i <= word.length(); i++)
        {
            // consider all prefixes of the current string
            String prefix = word.substring(0, i);

            // if the prefix is present in the dictionary, add it to the
            // output string and recur for the remaining string

            if (dict.contains(prefix)) {
                wordBreak(dict, word.substring(i), out + " " + prefix);
            }
        }
    }

    // Word Break Problem Implementation in Java
    public static void main(String[] args)
    {
        // List of strings to represent a dictionary
        List<String> dict = Arrays.asList("this", "th", "is", "famous", "Word",
            "break", "b", "r", "e", "a", "k", "br", "bre", "brea", "ak", "problem");

        // input string
        String word = "Wordbreakproblem";

        wordBreak(dict, word, "");
    }
}
```

##

```python3
# Function to segment given string into a space-separated
# sequence of one or more dictionary words
def wordBreak(words, word, out=''):

    # if the end of the string is reached,
    # print the output string
    if not word:
        print(out)
        return

    for i in range(1, len(word) + 1):
        # consider all prefixes of the current string
        prefix = word[:i]

        # if the prefix is present in the dictionary, add it to the
        # output string and recur for the remaining string
        if prefix in words:
            wordBreak(words, word[i:], out + ' ' + prefix)

# Word Break Problem Implementation in Python
if __name__ == '__main__':

    # List of strings to represent a dictionary
    words = [
        'self', 'th', 'is', 'famous', 'Word', 'break', 'b', 'r',
        'e', 'a', 'k', 'br', 'bre', 'brea', 'ak', 'problem'
    ]

    # input string
    word = 'Wordbreakproblem'

    wordBreak(words, word)
```

**Output:** Word b r e a k problem Word b r e ak problem Word br e a k problem Word br e ak problem Word bre a k problem Word bre ak problem Word brea k problem Word break problem

There is a very famous alternate version of the above problem in which we only have to determine if a string can be segmented into a space-separated sequence of one or more dictionary words or not, and not actually print all sequences. This version is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Function to determine if a string can be segmented into space-separated
// sequence of one or more dictionary words
bool wordBreak(vector<string> const &dict, string word)
{
    // return true if the end of the string is reached
    if (word.size() == 0) {
        return true;
    }

    for (int i = 1; i <= word.size(); i++)
    {
        // consider all prefixes of the current string
        string prefix = word.substr(0, i);

        // return true if the prefix is present in the dictionary and the remaining
        // string also forms a space-separated sequence of one or more
        // dictionary words

        if (find(dict.begin(), dict.end(), prefix) != dict.end() &&
                wordBreak(dict, word.substr(i))) {
            return true;
        }
    }

    // return false if the string can't be segmented
    return false;
}

// Word Break Problem Implementation in C++
int main()
{
    // vector of strings to represent a dictionary
    // we can also use a Trie or a set to store a dictionary

    vector<string> dict = { "this", "th", "is", "famous", "Word", "break",
            "b", "r", "e", "a", "k", "br", "bre", "brea", "ak", "problem" };

    // input string
    string word = "Wordbreakproblem";

    if (wordBreak(dict, word)) {
        cout << "The string can be segmented";
    }
    else {
        cout << "The string can't be segmented";
    }

    return 0;
}
```

**Output:** The string can be segmented

##

```java
import java.util.Arrays;
import java.util.List;

class Main
{
    // Function to determine if a string can be segmented into a
    // space-separated sequence of one or more dictionary words
    public static boolean wordBreak(List<String> dict, String word)
    {
        // return true if the end of the string is reached,
        if (word.length() == 0) {
            return true;
        }

        for (int i = 1; i <= word.length(); i++)
        {
            // consider all prefixes of the current string
            String prefix = word.substring(0, i);

            // return true if the prefix is present in the dictionary and the
            // remaining string also forms a space-separated sequence of
            // one or more dictionary words

            if (dict.contains(prefix) && wordBreak(dict, word.substring(i))) {
                return true;
            }
        }

        // return false if the string can't be segmented
        return false;
    }

    // Word Break Problem Implementation in Java
    public static void main(String[] args)
    {
        // List of strings to represent a dictionary
        List<String> dict = Arrays.asList("this", "th", "is", "famous", "Word",
            "break", "b", "r", "e", "a", "k", "br", "bre", "brea", "ak", "problem");

        // input string
        String word = "Wordbreakproblem";

        if (wordBreak(dict, word)) {
            System.out.println("The string can be segmented");
        }
        else {
            System.out.println("The string can't be segmented");
        }
    }
}
```

##

```python3
# Function to determine if a string can be segmented into space-separated
# sequence of one or more dictionary words
def wordBreak(words, word):

    # return true if the end of the string is reached,
    if not word:
        return True

    for i in range(1, len(word) + 1):

        # consider all prefixes of the current string
        prefix = word[:i]

        # return true if the prefix is present in the dictionary and the remaining
        # string also forms a space-separated sequence of one or more
        # dictionary words
        if prefix in words and wordBreak(words, word[i:]):
            return True

    # return false if the string can't be segmented
    return False

# Word Break Problem Implementation in Python
if __name__ == '__main__':

    # List of strings to represent a dictionary
    words = [
        'self', 'th', 'is', 'famous', 'Word', 'break', 'b', 'r',
        'e', 'a', 'k', 'br', 'bre', 'brea', 'ak', 'problem'
    ]

    # input string
    word = 'Wordbreakproblem'

    if wordBreak(words, word):
        print('The string can be segmented')
    else:
        print('The string can\'t be segmented')
```

The time complexity of the above solution is exponential and occupies space in the call stack.

The word-break problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). We have seen that the problem can be broken down into smaller subproblem, which can further be broken down into yet smaller subproblem, and so on. The word-break problem also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), so we will end up solving the same subproblem over and over again. If we draw the recursion tree, we can see that the same subproblems are getting computed repeatedly.

The problems having optimal substructure and overlapping subproblem can be solved by dynamic programming, in which subproblem solutions are _memo_ ized rather than computed repeatedly. This method is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
#include <unordered_set>
#include <algorithm>
using namespace std;

// Function to determine if a string can be segmented into space-separated
// sequence of one or more dictionary words
bool wordBreak(unordered_set<string> const &dict, string word, vector<int> &lookup)
{
    // `n` stores length of the current substring
    int n = word.size();

    // return true if the end of the string is reached
    if (n == 0) {
        return true;
    }

    // if the subproblem is seen for the first time
    if (lookup[n] == -1)
    {
        // mark subproblem as seen (0 initially assuming string
        // can't be segmented)
        lookup[n] = 0;

        for (int i = 1; i <= n; i++)
        {
            // consider all prefixes of the current string
            string prefix = word.substr(0, i);

            // if the prefix is found in the dictionary, then recur for the suffix
            if (find(dict.begin(), dict.end(), prefix) != dict.end() &&
                wordBreak(dict, word.substr(i), lookup))
            {
                // return true if the string can be segmented
                return lookup[n] = 1;
            }
        }
    }

    // return solution to the current subproblem
    return lookup[n];
}

// Word Break Problem Implementation in C++
int main()
{
    // set of strings to represent a dictionary
    // we can also use a Trie or a vector to store a dictionary
    unordered_set<string> dict = { "this", "th", "is", "famous", "Word", "break",
            "b", "r", "e", "a", "k", "br", "bre", "brea", "ak", "problem" };

    // input string
    string word = "Wordbreakproblem";

    // lookup array to store solutions to subproblems
    // lookup[i] stores if substring word[n-i…n) can be segmented or not
    vector<int> lookup(word.length() + 1, -1);

    if (wordBreak(dict, word, lookup)) {
        cout << "The string can be segmented";
    }
    else {
        cout << "The string can't be segmented";
    }

    return 0;
}
```

**Output:** The string can be segmented
