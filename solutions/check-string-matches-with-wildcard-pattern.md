# Check if a string matches with the given wildcard pattern

> Source: https://www.techiedelight.com/check-string-matches-with-wildcard-pattern/

Given a string and a pattern containing wildcard characters, write an efficient algorithm to check if the string matches with the wildcard pattern or not.

The `?` wildcard character can match any character in the input string, and the `*` wildcard character can match to zero or more characters in the input string.

For example,

**Input:** string = XYXZZXY, pattern = X***Y **Output:** true **Input:** string = XYXZZXY, pattern = X***X **Output:** false **Input:** string = XYXZZXY, pattern = X***X? **Output:** true **Input:** string = XYXZZXY, pattern = * **Output:** true

> 

The idea is to solve this problem by dividing the problem into subproblems recursively. For a given `pattern[0…m]` and `word[0…n]`,

  1. If `pattern[m] == *`, if `*` matches the current character in the input string, move to the next character in the string; otherwise, ignore the `*` character and move to the next character in the pattern.
  2. If `pattern[m] == ?`, ignore the current characters of both string and pattern and check if `pattern[0…m-1]` matches `word[0…n-1]`.
  3. If the current character in the pattern is not a wildcard character, it should match the current character in the input string.

Special care has to be taken to handle base conditions:

  1. If both the input string and pattern reach their end, return true.
  2. If only the pattern reaches its end, return false.
  3. If only the input string reaches its end, return true only when the remaining characters in the pattern consists of all `*`.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Recursive function to check if the input string matches
// with a given wildcard pattern
bool isMatch(string word, int n, string pattern, int m)
{
    // end of the pattern is reached
    if (m == pattern.size())
    {
        // return true only if the end of the input string is also reached
        return n == word.size();
    }

    // if the input string reaches its end, return when the
    // remaining characters in the pattern are all '*'
    if (n == word.size())
    {
        for (int i = m; i < pattern.size(); i++)
        {
            if (pattern[i] != '*') {
                return false;
            }
        }

        return true;
    }

    // if the current wildcard character is '?' or the current character in
    // the pattern is the same as the current character in the input string
    if (pattern[m] == '?' || pattern[m] == word[n])
    {
        // move to the next character in the pattern and the input string
        return isMatch(word, n + 1, pattern, m + 1);
    }

    // if the current wildcard character is '*'
    if (pattern[m] == '*')
    {
        // move to the next character in the input string or
        // ignore '*' and move to the next character in the pattern
        return isMatch(word, n + 1, pattern, m) || isMatch(word, n, pattern, m + 1);
    }

    // we reach here when the current character in the pattern is not a
    // wildcard character, and it doesn't match the current
    // character in the input string
    return false;
}

// Check if a string matches with a given wildcard pattern
bool isMatch(string word, string pattern) {
    return isMatch(word, 0, pattern, 0);
}

int main()
{
    cout << boolalpha;

    cout << isMatch("XYXZZXY", "X***Y") << endl;    // true
    cout << isMatch("XYXZZXY", "X*ZZ??") << endl;   // true
    cout << isMatch("XYXZZXY", "*X*X?") << endl;    // true
    cout << isMatch("XYXZZXY", "X***X") << endl;    // false
    cout << isMatch("XYXZZXY", "*") << endl;        // true

    return 0;
}
```

##

```java
class Main
{
    // Recursive function to check if the input string matches
    // with a given wildcard pattern
    public static boolean isMatch(String word, int n, String pattern, int m)
    {
        // end of the pattern is reached
        if (m == pattern.length())
        {
            // return true only if the end of the input string is also reached
            return n == word.length();
        }

        // if the input string reaches its end, return when the
        // remaining characters in the pattern are all '*'
        if (n == word.length())
        {
            for (int i = m; i < pattern.length(); i++)
            {
                if (pattern.charAt(i) != '*') {
                    return false;
                }
            }

            return true;
        }

        // if the current wildcard character is '?' or the current character in
        // the pattern is the same as the current character in the input string
        if (pattern.charAt(m) == '?' || pattern.charAt(m) == word.charAt(n))
        {
            // move to the next character in the pattern and the input string
            return isMatch(word, n + 1, pattern, m + 1);
        }

        // if the current wildcard character is '*'
        if (pattern.charAt(m) == '*')
        {
            // move to the next character in the input string or
            // ignore '*' and move to the next character in the pattern
            return isMatch(word, n + 1, pattern, m) ||
                            isMatch(word, n, pattern, m + 1);
        }

        // we reach here when the current character in the pattern is not a
        // wildcard character, and it doesn't match the current
        // character in the input string
        return false;
    }

    // Check if a string matches with a given wildcard pattern
    public static boolean isMatch(String word, String pattern) {
        return isMatch(word, 0, pattern, 0);
    }

    public static void main(String[] args)
    {
        System.out.println(isMatch("XYXZZXY", "X***Y"));    // true
        System.out.println(isMatch("XYXZZXY", "X*ZZ??"));   // true
        System.out.println(isMatch("XYXZZXY", "*X*X?"));    // true
        System.out.println(isMatch("XYXZZXY", "X***X"));    // false
        System.out.println(isMatch("XYXZZXY", "*"));        // true
    }
}
```

##

```python3
# Recursive function to check if the input matches
# with a given wildcard pattern
def isMatch(word, n, pattern, m):

    # end of the pattern is reached
    if m == len(pattern):
        # return true only if the end of input is also reached
        return n == len(word)

    # if the input reaches its end, return when the
    # remaining characters in the pattern are all '*'
    if n == len(word):
        for i in range(m, len(pattern)):
            if pattern[i] != '*':
                return False

        return True

    # if the current wildcard character is '?' or the current character in
    # the pattern is the same as the current character in the input string
    if pattern[m] == '?' or pattern[m] == word[n]:
        # move to the next character in the pattern and the input string
        return isMatch(word, n + 1, pattern, m + 1)

    # if the current wildcard character is '*'
    if pattern[m] == '*':
        # move to the next character in the input or
        # ignore '*' and move to the next character in the pattern
        return isMatch(word, n + 1, pattern, m) or isMatch(word, n, pattern, m + 1)

    # we reach here when the current character in the pattern is not a
    # wildcard character, and it doesn't match the current
    # character in the input string
    return False

# Check if a string matches with a given wildcard pattern
def isMatching(word, pattern):
    return isMatch(word, 0, pattern, 0)

if __name__ == '__main__':

    print(isMatching('XYXZZXY', 'X***Y'))   # True
    print(isMatching('XYXZZXY', 'X*ZZ??'))  # True
    print(isMatching('XYXZZXY', '*X*X?'))   # True
    print(isMatching('XYXZZXY', 'X***X'))   # False
    print(isMatching('XYXZZXY', '*'))       # True
```

The time complexity of the above solution is exponential and occupies space in the call stack. [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) can bring down the time complexity to O(m.n) using O(m.n) extra space, where `m` is the length of the string and `n` is the length of the pattern. The dynamic programming solution is demonstrated below in C++, Java, and Python using memoization:

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

// Recursive function to check if the input string matches
// with a given wildcard pattern
bool isMatch(string word, int n,
            string pattern, int m,
            unordered_map<string, bool> &lookup)
{
    // construct a unique map key from dynamic elements of the input
    string key = to_string(n) + "|" + to_string(m);

    // if the subproblem is seen before
    if (lookup.find(key) != lookup.end()) {
        return lookup[key];
    }

    // since the subproblem is seen for the first time, solve it and
    // store its result in a map

    // end of the pattern is reached
    if (m == pattern.size())
    {
        // return true only if the end of the input string is also reached
        return (lookup[key] = (n == word.size()));
    }

    // if the input string reaches its end, return when the
    // remaining characters in the pattern are all '*'

    if (n == word.size())
    {
        for (int i = m; i < pattern.size(); i++)
        {
            if (pattern[i] != '*') {
                return (lookup[key] = false);
            }
        }

        return (lookup[key] = true);
    }

    // if the current wildcard character is '?' or the current character in
    // the pattern is the same as the current character in the input string

    if (pattern[m] == '?' || pattern[m] == word[n])
    {
        // move to the next character in the pattern and the input string
        lookup[key] = isMatch(word, n + 1, pattern, m + 1, lookup);
    }

    // if the current wildcard character is '*'
    else if (pattern[m] == '*')
    {
        // move to the next character in the input string or
        // ignore '*' and move to the next character in the pattern

        lookup[key] = isMatch(word, n + 1, pattern, m, lookup) ||
                    isMatch(word, n, pattern, m + 1, lookup);
    }
    else {
        // we reach here when the current character in the pattern is not a
        // wildcard character, and it doesn't match the current
        // character in the input string

        lookup[key] = false;
    }

    return lookup[key];
}

// Check if a string matches with a given wildcard pattern
bool isMatch(string word, string pattern)
{
    unordered_map<string, bool> lookup;
    return isMatch(word, 0, pattern, 0, lookup);
}

int main()
{
    cout << boolalpha;

    cout << isMatch("XYXZZXY", "X***Y") << endl;    // true
    cout << isMatch("XYXZZXY", "X*ZZ??") << endl;   // true
    cout << isMatch("XYXZZXY", "*X*X?") << endl;    // true
    cout << isMatch("XYXZZXY", "X***X") << endl;    // false
    cout << isMatch("XYXZZXY", "*") << endl;        // true

    return 0;
}
```

##

```java
import java.util.HashMap;
import java.util.Map;

class Main
{
    // Recursive function to check if the input string matches
    // with a given wildcard pattern
    public static boolean isMatch(String word, int n, String pattern, int m,
                                Map<String, Boolean> lookup)
    {
        // construct a unique map key from dynamic elements of the input
        String key = n + "|" + m;

        // if the subproblem is seen before
        if (lookup.containsKey(key)) {
            return lookup.get(key);
        }

        // since the subproblem is seen for the first time, solve it and
        // store its result in a map

        // end of the pattern is reached
        if (m == pattern.length())
        {
            // return true only if the end of the input string is also reached
            lookup.put(key, (n == word.length()));
            return n == word.length();
        }

        // if the input string reaches its end, return when the
        // remaining characters in the pattern are all '*'

        if (n == word.length())
        {
            for (int i = m; i < pattern.length(); i++)
            {
                if (pattern.charAt(i) != '*')
                {
                    lookup.put(key, false);
                    return false;
                }
            }

            lookup.put(key, true);
            return true;
        }

        // if the current wildcard character is '?' or the current character in
        // the pattern is the same as the current character in the input string

        if (pattern.charAt(m) == '?' || pattern.charAt(m) == word.charAt(n))
        {
            // move to the next character in the pattern and the input string
            lookup.put(key, isMatch(word, n + 1, pattern, m + 1, lookup));
        }

        // if the current wildcard character is '*'
        else if (pattern.charAt(m) == '*')
        {
            // move to the next character in the input string or
            // ignore '*' and move to the next character in the pattern

            lookup.put(key, isMatch(word, n + 1, pattern, m, lookup) ||
                                    isMatch(word, n, pattern, m + 1, lookup));
        }
        else {
            // we reach here when the current character in the pattern is not a
            // wildcard character, and it doesn't match the current
            // character in the input string

            lookup.put(key, false);
        }

        return lookup.get(key);
    }

    // Check if a string matches with a given wildcard pattern
    public static boolean isMatch(String word, String pattern)
    {
        Map<String, Boolean> lookup = new HashMap<>();
        return isMatch(word, 0, pattern, 0, lookup);
    }

    public static void main(String[] args)
    {
        System.out.println(isMatch("XYXZZXY", "X***Y"));    // true
        System.out.println(isMatch("XYXZZXY", "X*ZZ??"));   // true
        System.out.println(isMatch("XYXZZXY", "*X*X?"));    // true
        System.out.println(isMatch("XYXZZXY", "X***X"));    // false
        System.out.println(isMatch("XYXZZXY", "*"));        // true
    }
}
```

##

```python3
# Recursive function to check if the input string matches
# with a given wildcard pattern
def isMatch(word, pattern, n, m, lookup):

    # construct a unique key from dynamic elements of the input
    key = (n, m)

    # if the subproblem is seen before
    if key in lookup:
        return lookup.get(key)

    # since the subproblem is seen for the first time, solve it and
    # store its result in a dictionary

    # end of the pattern is reached
    if m == len(pattern):
        # return true only if the end of the input string is also reached
        lookup[key] = (n == len(word))
        return n == len(word)

    # if the input string reaches its end, return when the
    # remaining characters in the pattern are all '*'

    if n == len(word):
        for i in range(m, len(pattern)):
            if pattern[i] != '*':
                lookup[key] = False
                return False

        lookup[key] = True
        return True

    # if the current wildcard character is '?' or the current character in
    # the pattern is the same as the current character in the input string

    if pattern[m] == '?' or pattern[m] == word[n]:

        # move to the next character in the pattern and the input string
        lookup[key] = isMatch(word, pattern, n + 1, m + 1, lookup)

    # if the current wildcard character is '*'
    elif pattern[m] == '*':

        # move to the next character in the input string or
        # ignore '*' and move to the next character in the pattern

        lookup[key] = isMatch(word, pattern, n + 1, m, lookup) or \
                    isMatch(word, pattern, n, m + 1, lookup)

    else:

        # we reach here when the current character in the pattern is not a
        # wildcard character, and it doesn't match the current
        # character in the input string

        lookup[key] = False

    return lookup.get(key)

# Check if a string matches with a given wildcard pattern
def isMatching(word, pattern):
    lookup = {}
    return isMatch(word, pattern, 0, 0, lookup)

if __name__ == '__main__':

    print(isMatching('XYXZZXY', 'X***Y'))   # True
    print(isMatching('XYXZZXY', 'X*ZZ??'))  # True
    print(isMatching('XYXZZXY', '*X*X?'))   # True
    print(isMatching('XYXZZXY', 'X***X'))   # False
    print(isMatching('XYXZZXY', '*'))       # True
```

**Exercise:** Implement dynamic programming solution using tabulation.
