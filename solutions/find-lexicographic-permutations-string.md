# Find all lexicographic permutations of a string

> Source: https://www.techiedelight.com/find-lexicographic-permutations-string/

In this post, we will see how to find all lexicographic permutations of a string where the repetition of characters is allowed.

For example, consider string `ABC`. It has the following lexicographic permutations with repetition of characters:

AAA AAB AAC ABA ABB ABC ACA ACB ACC BAA BAB BAC BBA BBB BBC BCA BCB BCC CAA CAB CAC CBA CBB CBC CCA CCB CCC

> 

The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. Start by sorting the string so that the characters are processed in the lexicographical order. Then at any point in the recursion, the current index in the output string is filled with each character of the input string one by one, and recur for the next index.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Function to find all lexicographic permutations of a given
// string where the repetition of characters is allowed
void findLexicographic(string str, string result)
{
    // base condition (permutation found)
    if (result.length() == str.length())
    {
        // print the permutation and return
        cout << result << " ";
        return;
    }

    // consider all characters of the string one by one
    for (unsigned i = 0; i < str.length(); i++) {
        findLexicographic(str, result + str[i]);
    }
}

// Wrapper over `findLexicographic()` function
void findLexicographic(string str)
{
    // base case
    if (str.length() == 0) {
        return;
    }

    // to keep track of the result string
    string result;

    // sort the string first to print in lexicographical order
    sort(str.begin(), str.end());

    findLexicographic(str, result);
}

int main()
{
    string str = "ACB";

    findLexicographic(str);

    return 0;
}
```

##

```java
import java.util.Arrays;

class Main
{
    // Function to find all lexicographic permutations of a given
    // string where the repetition of characters is allowed
    public static void findLexicographic(char[] chars, String output)
    {
        // base condition (permutation found)
        if (output.length() == chars.length)
        {
            // print the permutation and return
            System.out.print(output + " ");
            return;
        }

        // consider all characters of the string one by one
        for (char c: chars) {
            findLexicographic(chars, output + c);
        }
    }

    // Wrapper over `findLexicographic()` function
    public static void findLexicographic(String str)
    {
        // base case
        if (str == null || str.length() == 0) {
            return;
        }

        // sort the string first to print in lexicographic order
        char[] chars = str.toCharArray();
        Arrays.sort(chars);

        findLexicographic(chars, "");
    }

    public static void main(String[] args)
    {
        String str = "ACB";

        findLexicographic(str);
    }
}
```

##

```python3
# Function to find all lexicographic permutations of a given
# string where the repetition of characters is allowed
def printLexicographicOrder(s, result=''):

    # base condition (permutation found)
    if len(result) == len(s):
        # print the permutation and return
        print(result, end=' ')
        return

    # consider all characters of the string one by one
    for c in s:
        printLexicographicOrder(s, result + c)

# Wrapper over `printLexicographicOrder()` function
def findLexicographic(s):

    # base case
    if not s:
        return

    # sort the string first to print in lexicographic order
    c = sorted(list(s))

    printLexicographicOrder(c)

if __name__ == '__main__':

    s = 'ACB'
    findLexicographic(s)
```

**Output:** AAA AAB AAC ABA ABB ABC ACA ACB ACC BAA BAB BAC BBA BBB BBC BCA BCB BCC CAA CAB CAC CBA CBB CBC CCA CCB CCC

The above solution doesn’t handle duplicates in the output. For example, for string `AAB`, it prints the following:

AAA AAA AAB AAA AAA AAB ABA ABA ABB AAA AAA AAB AAA AAA AAB ABA ABA ABB BAA BAA BAB BAA BAA BAB BBA BBA BBB

Here, `AAA` is repeated `8` times. `AAB`, `ABA`, and `BAA` are repeated `4` times. Similarly, `ABB`, `BAB`, `BBA` are repeated `2` times. The following code efficiently handles duplicates in the output:

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

// Function to find all lexicographic permutations of a given
// string where the repetition of characters is allowed
void findLexicographic(string str, string result)
{
    // base condition (permutation found)
    if (result.length() == str.length())
    {
        // print the permutation and return
        cout << result << " ";
        return;
    }

    // consider all characters of the string one by one
    for (unsigned i = 0; i < str.length(); i++)
    {
        // skip adjacent duplicates
        while (i + 1 < str.length() && str[i] == str[i + 1]) {
            i++;
        }

        findLexicographic(str, result + str[i]);
    }
}

// Wrapper over `findLexicographic()` function
void findLexicographic(string str)
{
    // base case
    if (str.length() == 0) {
        return;
    }

    // to keep track of the result string
    string result;

    // sort the string first to print in lexicographical order
    sort(str.begin(), str.end());

    findLexicographic(str, result);
}

int main()
{
    string str = "AAB";
    findLexicographic(str);

    return 0;
}
```

##

```java
import java.util.Arrays;

class Main
{
    // Function to find all lexicographic permutations of a given
    // string where the repetition of characters is allowed
    public static void lexicographic(char[] chars, String res)
    {
        // base condition (permutation found)
        if (res.length() == chars.length)
        {
            // print the permutation and return
            System.out.print(res + " ");
            return;
        }

        // consider all characters of the string one by one
        for (int i = 0; i < chars.length; i++)
        {
            // skip adjacent duplicates
            while (i + 1 < chars.length && chars[i] == chars[i + 1]) {
                i++;
            }

            lexicographic(chars, res + chars[i]);
        }
    }

    // Wrapper over `lexicographic()` function
    public static void findLexicographic(String str)
    {
        // base case
        if (str == null || str.length() == 0) {
            return;
        }

        // sort the string to print in lexicographical order
        char[] chars = str.toCharArray();
        Arrays.sort(chars);

        lexicographic(chars, "");
    }

    public static void main(String[] args)
    {
        String str = "AAB";

        findLexicographic(str);
    }
}
```

##

```python3
# Function to find all lexicographic permutations of a given
# string where the repetition of characters is allowed
def printLexicographicOrder(chars, output=''):

    # base condition (permutation found)
    if len(output) == len(chars):

        # print the permutation and return
        print(output, end=' ')
        return

    # consider all characters of the string one by one
    i = 0
    while i < len(chars):

        # skip adjacent duplicates
        while i + 1 < len(chars) and chars[i] == chars[i + 1]:
            i = i + 1

        printLexicographicOrder(chars, output + chars[i])
        i = i + 1

# Wrapper over `printLexicographicOrder()` function
def findLexicographic(s):

    # base case
    if not s:
        return

    # sort the string first to print in lexicographical order
    chars = sorted(list(s))
    printLexicographicOrder(chars)

if __name__ == '__main__':

    s = 'AAB'
    findLexicographic(s)
```

**Output:** AAA AAB ABA ABB BAA BAB BBA BBB

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).
