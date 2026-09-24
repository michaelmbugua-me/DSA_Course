# Determine whether characters of a string follow a specific order

> Source: https://www.techiedelight.com/determine-string-follows-specified-order/

[String](https://www.techiedelight.com/Category/String/)

Given a string and a pattern (having all distinct characters), determine whether the string characters follow a specific order as defined by the pattern’s characters.

For example,

**Input:** word = Techie Delight pattern = el **Output:** Pattern found The pattern characters follow the order [e, e, e, l] in the input string. Note that all e’s appear before l. **Input:** word = Techie Delight pattern = ei **Output:** Pattern not found The pattern characters follow the order [e, i, e, e, i] in the input string. Note that all e’s doesn’t appear before all i’s.

> 

The idea is to loop through all characters of the pattern. If at any point, the last occurrence of the previous encountered character is after the first occurrence of the current character in the input string, we can say that the string doesn’t follow the order defined by the pattern.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <string>
using namespace std;

// Determine if characters of a given string follow specific order as
// defined by characters of the given pattern
bool checkPattern(string word, string pattern)
{
    // invalid input
    if (word.length() < pattern.length()) {
        return false;
    }

    // stores previous character (initially NULL)
    char prev = '\0';

    // loop through all chars of the pattern
    for (char curr: pattern)
    {
        // return false if the last occurrence of the previous character is after
        // the first occurrence of the current character in the input string
            int last_of = word.find_last_of(prev);
            int first_of = word.find_first_of(curr);
            if (prev != '\0' && (first_of == string::npos || first_of == string::npos
                        || last_of > first_of)) {
                return false;
            }

        // set current char as previous char for the next iteration
        prev = curr;
    }

    // we reach here if the given string matches the pattern
    return true;
}

int main()
{
    string word = "Techie Delight";
    string pattern = "el";

    if (checkPattern(word, pattern)) {
        cout << "Pattern found";
    }
    else {
        cout << "Pattern not found";
    }

    return 0;
}
```

**Output:** Pattern found

##

```java
class Main
{
    // Determine if characters of a given string follow specific order as
    // defined by characters of the given pattern
    public static boolean checkPattern(String word, String pattern)
    {
        // invalid word
        if (word == null || pattern == null || word.length() < pattern.length()) {
            return false;
        }

        // stores previous character (initially null)
        Character prev = null;

        // loop through all chars of the pattern
        for (char curr: pattern.toCharArray())
        {
            // return false if the last occurrence of the previous character is after
            // the first occurrence of the current character in the word string

            int firstIndex = word.indexOf(curr);
            if (firstIndex == -1 || (prev != null && word.lastIndexOf(prev) > firstIndex)) {
                return false;
            }

            // set current char as previous char for the next iteration
            prev = curr;
        }

        // we reach here if the given string matches the pattern
        return true;
    }

    public static void main(String[] args)
    {
        String word = "Techie Delight";
        String pattern = "el";

        if (checkPattern(word, pattern)) {
            System.out.println("Pattern found");
        }
        else {
            System.out.println("Pattern not found");
        }
    }
}
```

##

```python3
# Determine if characters of a given word follow specific order as
# defined by characters of the given pattern
def checkPattern(word, pattern):

    # invalid input
    if not word or not pattern or len(word) < len(pattern):
        return False

    # stores previous character
    prev = None

    # loop through all chars of the pattern
    for curr in pattern:

        # return false if the last occurrence of the previous character is after
        # the first occurrence of the current character in the input word

        firstIndex = word.find(curr)
        if firstIndex == -1 or (prev and word.rfind(prev) > firstIndex):
            return False

        # set current as previous for the next iteration
        prev = curr

    # we reach here if the given word matches the pattern
    return True

if __name__ == '__main__':

    word = 'Techie Delight'
    pattern = 'el'

    if checkPattern(word, pattern):
        print('Pattern found')
    else:
        print('Pattern not found')
```

The time complexity of the above solution is O(m.n), where `m` is the length of the string and `n` is the length of the pattern. The auxiliary space required by the program is O(1).

Here’s another simple approach to solving this problem. The solution can be divided into three steps:

  1. Remove all characters from the given string that are not present in the specified pattern.
  2. Remove the adjacent duplicates from the modified string.
  3. Compare the resultant string with the pattern and return true if both are equal.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Function to remove characters from a string that are not present in
// the specified pattern
void removeChars(string &word, const string &allowed)
{
    word.erase(remove_if (word.begin(), word.end(), [&allowed](const char &c) {
        return allowed.find(c) == string::npos;
    }), word.end());
}

// Function to remove the adjacent duplicates from the given string
void removeDuplicates(string &word)
{
    char prev;
    for (auto it = word.begin(); it != word.end(); it++)
    {
        if (prev == *it)
        {
            word.erase(it);
            it--;
        }
        else {
            prev = *it;
        }
    }
}

// Determine if characters of a given string follow specific order as
// defined by characters of the given pattern
bool checkPattern(string word, string pattern)
{
    removeChars(word, pattern);
    removeDuplicates(word);
    return !word.compare(pattern);
}

int main()
{
    string word = "Techie Delight";
    string pattern = "el";

    if (checkPattern(word, pattern)) {
        cout << "Pattern found";
    }
    else {
        cout << "Pattern not found";
    }

    return 0;
}
```

**Output:** Pattern found

##

```java
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

class Main
{
    // Function to remove characters from a string that are not present in
    // the specified pattern
    public static String removeChars(String word, String allowed)
    {
        Set<String> allow = Arrays.stream(allowed.split(""))
                .collect(Collectors.toSet());

        return Arrays.stream(word.split(""))
                .filter(allow::contains)
                .collect(Collectors.joining(""));
    }

    // Function to remove adjacent duplicates characters from a string
    public static String removeDuplicates(String s)
    {
        char prev = 0;
        int k = 0;

        char[] chars = s.toCharArray();
        for (int i = 0; i < chars.length; i++)
        {
            if (chars[i] != prev)
            {
                chars[k++] = chars[i];
                prev = chars[i];
            }
        }

        return new String(chars).substring(0, k);
    }

    // Determine if characters of a given string follow specific order as
    // defined by characters of the given pattern
    public static boolean checkPattern(String word, String pattern)
    {
        // invalid input
        if (word == null || pattern == null || word.length() < pattern.length()) {
            return false;
        }

        return removeDuplicates(removeChars(word, pattern))
                .compareTo(pattern) == 0;
    }

    public static void main(String[] args)
    {
        String word = "Techie Delight";
        String pattern = "el";

        if (checkPattern(word, pattern)) {
            System.out.println("Pattern found");
        }
        else {
            System.out.println("Pattern not found");
        }
    }
}
```

##

```python3
# Function to remove characters from a word that are not present in
# the specified pattern
def removeChars(word, allowed):
    allow = set(allowed)
    return list(filter(lambda x: x in allow, word))

# Function to remove adjacent duplicates characters from a word
def removeDuplicates(chars):
    prev = None
    k = 0

    for i in range(len(chars)):
        if prev != chars[i]:
            chars[k] = chars[i]
            k = k + 1
            prev = chars[i]

    return ''.join(chars[:k])

# Determine if characters of a given word follow specific order as
# defined by characters of the given pattern
def checkPattern(word, pattern):
    # invalid input
    if not word or not pattern:
        return False

    return removeDuplicates(removeChars(word, pattern)) == pattern

if __name__ == '__main__':

    word = 'Techie Delight'
    pattern = 'el'

    if checkPattern(word, pattern):
        print('Pattern found')
    else:
        print('Pattern not found')
```
