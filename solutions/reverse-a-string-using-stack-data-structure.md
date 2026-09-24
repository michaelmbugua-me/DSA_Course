# Reverse a string using a stack data structure

> Source: https://www.techiedelight.com/reverse-a-string-using-stack-data-structure/

This post will discuss how to reverse a string using the stack data structure in C/C++, Java, and Python.

## 1\. Using explicit stack

The idea is to create an empty [stack](https://techiedelight.com/stack-implementation/) and push all characters of the string into it. Then pop each character one by one from the stack and put them back to the input string starting from the `0'th` index.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <stack>
#include <string>
using namespace std;

// Reverse a string using a stack container in C++.
// Note that the string is passed by reference
void reverse(string &str)
{
    // create an empty stack
    stack<int> s;

    // Push each character in the string to the stack
    for (char ch: str) {
        s.push(ch);
    }

    // pop all characters from the stack and
    // put them back to the input string
    for (int i = 0; i < str.length(); i++)
    {
        str[i] = s.top();
        s.pop();
    }
}

int main()
{
    string str = "Reverse me";

    reverse(str);
    cout << str;

    return 0;
}
```

**Output:** em esreveR

##

```java
import java.util.Stack;

class Main
{
    // Reverse a string using a stack container in Java
    public static String reverse(String str)
    {
        // create an empty stack
        Stack<Character> stack = new Stack<>();

        // push each character in the string into the stack
        char[] chars = str.toCharArray();
        for (char c: chars) {
            stack.push(c);
        }

        // pop all characters from the stack and
        // put them back to the character array
        for (int i = 0; i < str.length(); i++) {
            chars[i] = stack.pop();
        }

        // convert the char array to a string and return
        return new String(chars);
    }

    public static void main (String[] args)
    {
        String str = "Reverse me";

        str = reverse(str);
        System.out.println(str);
    }
}
```

##

```python3
from collections import deque

# Reverse a string using a stack
def reverse(s):
    # build a stack from characters in the string
    stack = deque(s)
    # pop all characters from the stack and join them back into a string
    return ''.join(stack.pop() for _ in range(len(s)))

if __name__ == '__main__':

    s = 'Reverse me'
    s = reverse(s)
    print(s)
```

The time complexity of the above solution is O(n), where `n` is the length of the input string. The auxiliary space required by the program is O(n) for the stack data structure.

## 2\. Using implicit stack

We can also use an implicit stack, i.e., [call stack](https://en.wikipedia.org/wiki/Call_stack)., to reverse a string, as demonstrated below in C, Java, and Python:

```c
#include <stdio.h>

// Utility function to swap two characters
void swap(char *x, char *y)
{
    char ch = *x;
    *x = *y;
    *y = ch;
}

// Reverse a string using implicit stack (recursion) in C
void reverse(char *str, int j)
{
    static int i = 0;

    // return if we reached the end of the string
    // `j` now points at the end of the string
    if (*(str + j) == '\0') {
        return;
    }

    // recur with increasing index `j` by one position
    reverse(str, j + 1);

    // swap characters at i'th and j'th index
    if (i <= j)
    {
        swap(&str[i], &str[j]);

        // advance index `i` by one position, and recursion will take care of index `j`
        i++;
    }
}

// Wrapper function
void Reverse(char *str) {
    reverse(str, 0);
}

int main(void)
{
    char str[] = "Reverse me";

    Reverse(str);
    printf("%s", str);

    return 0;
}
```

**Output:** em esreveR

##

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Reverse a string using implicit stack (recursion) in C++.
// Note that the string is passed by reference
void reverse(string &str, int &i, int j)
{
    // base case: `j` reaches string length
    if (j == str.length()) {
        return;
    }

    reverse(str, i, j + 1);

    // swap characters at i'th and j'th index
    if (i <= j)
    {
        swap(str[i], str[j]);

        // advance `i` by one position, and recursion will take care of index `j`
        i++;
    }
}

// Wrapper function
void reverse(string &str)
{
    int i = 0;
    reverse(str, i, 0);
}

int main()
{
    string str = "Reverse me";

    reverse(str);
    cout << str;

    return 0;
}
```

##

```python3
# Reverse a string using implicit stack (recursion)
def swap(s, i, j):
    temp = s[i]
    s[i] = s[j]
    s[j] = temp

def reverse(s, i=0, j=0):
    # base case: `j` reaches string length
    if j == len(s):
        return i

    i = reverse(s, i, j + 1)

    # swap characters at i'th and j'th index
    if i <= j:
        swap(s, i, j)
        # advance `i` by one position, and recursion will take care of index `j`
        i += 1

    return i

if __name__ == '__main__':

    s = 'Reverse me'

    chars = [*s]
    reverse(chars)
    s = ''.join(chars)

    print(s)
```

Here’s the alternative, more straightforward approach that takes advantage of the implicit stack to reverse the string.

```c
#include <stdio.h>
#include <string.h>

// Utility function to swap two characters
void swap(char *x, char *y)
{
    char ch = *x;
    *x = *y;
    *y = ch;
}

// Reverse a string using implicit stack (recursion) in C
void reverse(char *str, int i, int j)
{
    if (i < j)
    {
        // swap characters at i'th and j'th index
        swap(&str[i], &str[j]);

        // recur with increasing i'th index by position and
        // decreasing j'th index by one position
        reverse(str, i + 1, j - 1);
    }
}

int main(void)
{
    char str[] = "Reverse me";

    reverse(str, 0, strlen(str) - 1);
    printf("%s", str);

    return 0;
}
```

**Output:** em esreveR
