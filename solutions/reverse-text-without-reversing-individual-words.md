# Reverse text without reversing individual words

> Source: https://www.techiedelight.com/reverse-text-without-reversing-individual-words/

Given a line of text, reverse the text without reversing the individual words.

For example,

**Input:** Technical Interview Preparation **Output:** Preparation Interview Technical

> 

A simple solution is to push the individual words from the beginning of the text into a [stack](https://techiedelight.com/stack-implementation/). Then, pop all the words from the stack and store them back into the text in LIFO order. The time complexity of the above solution is O(n) and requires O(n) extra space for the stack, where `n` is the length of the given text.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <algorithm>
#include <stack>
#include <string>
using namespace std;

// Function to reverse a text without reversing the individual words
// Notice that string is passed by reference
void reverseText(string &str)
{
    // `str[low…high]` forms a word
    int low = 0, high = 0;

    // create an empty stack
    stack<string> s;

    // scan the text
    for (int i = 0; i < str.length(); i++)
    {
        // if space is found, we found a word
        if (str[i] == ' ')
        {
            // push each word into the stack
            s.push(str.substr(low, high - low + 1));

            // reset `low` and `high` for the next word
            low = high = i + 1;
        }
        else {
            high = i;
        }
    }

    // push the last word into the stack
    s.push(str.substr(low));

    // clear the string
    str.clear();

    // construct the string by following the LIFO order
    while (!s.empty())
    {
        str.append(s.top()).append(" ");
        s.pop();
    }

    // remove last space
    str.erase(prev(str.end()));
}

int main()
{
    string str = "Preparation Interview Technical";

    reverseText(str);
    cout << str;

    return 0;
}
```

**Output:** Technical Interview Preparation

##

```java
import java.util.Stack;

class Main
{
    // Function to reverse a text without reversing the individual words
    public static String reverseText(String s)
    {
        // base case
        if (s == null || s.length() == 0) {
            return s;
        }

        // `s[low…high]` forms a word
        int low = 0, high = 0;

        // create an empty stack
        Stack<String> stack = new Stack<>();

        // scan the text
        for (int i = 0; i < s.length(); i++)
        {
            // if space is found, we found a word
            if (s.charAt(i) == ' ')
            {
                // push each word into the stack
                stack.push(s.substring(low, high + 1));

                // reset `low` and `high` for the next word
                low = high = i + 1;
            }
            else {
                high = i;
            }
        }

        // push the last word into the stack
        stack.push(s.substring(low));

        // construct the string by following the LIFO order
        StringBuilder sb = new StringBuilder();
        while (!stack.empty()) {
            sb.append(stack.pop()).append(' ');
        }

        return sb.substring(0, sb.length() - 1);    // remove last space
    }

    public static void main(String[] args)
    {
        String s = "Preparation Interview Technical";

        System.out.println(reverseText(s));
    }
}
```

##

```python3
from collections import deque

# Function to reverse a text without reversing the individual words
def reverseText(s):

    # base case
    if not s:
        return s

    # `s[low…high]` forms a word
    low = high = 0

    # create an empty stack
    stack = deque()

    # scan the text
    for i, c in enumerate(s):
        # if space is found, we found a word
        if c == ' ':
            # push each word into the stack
            stack.append(s[low:high + 1])

            # reset `low` and `high` for the next word
            low = high = i + 1
        else:
            high = i

    # push the last word into the stack
    stack.append(s[low:])

    # construct the string by following the LIFO order
    sb = ""
    while stack:
        sb += stack.pop() + ' '

    return sb[:-1]      # remove last space

if __name__ == '__main__':

    s = 'Preparation Interview Technical'
    print(reverseText(s))
```

## How can we improve space complexity?

The idea is to [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) reverse each word present in the input text and finally reverse the whole text to get the desired output. For instance,

**Input text:** Preparation Interview Technical **1\. Reverse each word:** noitaraperp weivretnI lacinhceT TI rof lairetam doog edivorp eW **2\. Reverse the whole text:** Technical Interview Preparation

The time complexity of this solution would be O(n) and doesn’t require any extra space. The problem with this approach is that it violates the problem constraints and does three traversals of the input text instead of just one.

```c
#include <stdio.h>
#include <string.h>

// Utility function to swap the characters at position `i` and `j`
void swap(char *arr, int i, int j)
{
    char ch = arr[i];
    arr[i] = arr[j];
    arr[j] = ch;
}

// Utility function to reverse subarray `text[begin…end]`
void reverseText(char *text, int begin, int end)
{
    while (begin < end) {
        swap(text, begin++, end--);
    }
}

// Function to reverse a text without reversing the individual words.
void reverse_text(char *text)
{
    // `text[low…high]` forms a word
    int low = 0, high = 0;

    // scan the text
    int n = strlen(text);
    for (int i = 0; i < n; i++)
    {
        // if space is found, we found a word
        if (text[i] == ' ')
        {
            // reverse the found word
            reverseText(text, low, high);

            // reset `low` and `high` for the next word
            low = high = i + 1;
        }
        else {
            high = i;
        }
    }

    // reverse the last word
    reverseText(text, low, high);

    // reverse the whole text
    reverseText(text, 0, n - 1);
}

int main(void)
{
    char text[] = "Preparation Interview Technical";

    reverse_text(text);
    printf("%s", text);

    return 0;
}
```

**Output:** Technical Interview Preparation

##

```cpp
#include <iostream>
#include <algorithm>
#include <string>
using namespace std;

// Function to reverse a text without reversing the individual words.
// Note that string is passed by reference
void reverseText(string &str)
{
    // `str[low…high]` forms a word
    int low = 0, high = 0;

    // scan the text
    for (int i = 0; i < str.length(); i++)
    {
        // if space is found, we found a word
        if (str[i] == ' ')
        {
            // reverse the found word
            reverse(str.begin() + low, str.begin() + high + 1);

            // reset `low` and `high` for the next word
            low = high = i + 1;
        }
        else {
            high = i;
        }
    }

    // reverse the last word
    reverse(str.begin() + low, str.begin() + high + 1);

    // reverse the whole text
    reverse(str.begin(), str.end());
}

int main()
{
    string str = "Preparation Interview Technical";

    reverseText(str);
    cout << str;

    return 0;
}
```

##

```java
class Main
{
    // Utility function to swap the elements at positions `i` and `j` in the array
    private static void swap(char[] chars, int i, int j)
    {
        char temp = chars[i];
        chars[i] = chars[j];
        chars[j] = temp;
    }

    // Utility function to reverse subarray `chars[begin…end]`
    public static void reverseText(char[] chars, int begin, int end)
    {
        while (begin < end) {
            swap(chars, begin++, end--);
        }
    }

    // Function to reverse a text without reversing the individual words.
    public static String reverseText(String str)
    {
        // base case
        if (str == null || str.length() == 0) {
            return str;
        }

        // Since a string is immutable in Java, convert it to a char array
        char[] chars = str.toCharArray();

        // `chars[low…high]` forms a word
        int low = 0, high = 0;

        // scan the text
        for (int i = 0; i < chars.length; i++)
        {
            // if space is found, we found a word
            if (chars[i] == ' ')
            {
                // reverse the found word
                reverseText(chars, low, high);

                // reset `low` and `high` for the next word
                low = high = i + 1;
            }
            else {
                high = i;
            }
        }

        // reverse the last word
        reverseText(chars, low, high);

        // reverse the whole text
        reverseText(chars, 0, chars.length - 1);

        return new String(chars);
    }

    public static void main(String[] args)
    {
        String str = "Preparation Interview Technical";

        System.out.println(reverseText(str));
    }
}
```

##

```python3
# Utility function to swap the elements at positions `i` and `j` in the list
def swap(chars, i, j):

    temp = chars[i]
    chars[i] = chars[j]
    chars[j] = temp

# Utility function to reverse sublist `chars[begin…end]`
def reverseSublist(chars, begin, end):

    while begin < end:
        swap(chars, begin, end)
        begin = begin + 1
        end = end -1

# Function to reverse a text without reversing the individual words.
def reverseText(s):

    # base case
    if not s:
        return s

    # since a string is immutable, convert it to a character list
    chars = list(s)

    # `chars[low…high]` forms a word
    low = high = 0

    # scan the text
    for i in range(len(chars)):

        # if space is found, we found a word
        if chars[i] == ' ':

            # reverse the found word
            reverseSublist(chars, low, high)

            # reset `low` and `high` for the next word
            low = high = i + 1

        else:
            high = i

    # reverse the last word
    reverseSublist(chars, low, high)

    # reverse the whole text
    reverseSublist(chars, 0, len(chars) - 1)

    return ''.join(chars)

if __name__ == '__main__':

    s = 'Preparation Interview Technical'
    print(reverseText(s))
```

**Exercise:** Modify the first approach to divide string into tokens by using `strtok()` in C, or stringstream `getline()`, or C++ string class `find()` function.
