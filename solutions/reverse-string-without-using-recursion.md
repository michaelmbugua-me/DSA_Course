# Iterative solution to reverse a string in C++ and Java

> Source: https://www.techiedelight.com/reverse-string-without-using-recursion/

Write an iterative program to reverse a string in C++ and Java.

For example,

**Input:** Hello, World **Output:** dlroW ,olleH

## 1\. Using built-in methods

A simple approach is to use `strrev()` function in C, or `[std::reverse](https://cplusplus.com/reference/algorithm/reverse/)` in C++, or `[StringBuilder.reverse()](https://docs.oracle.com/javase/7/docs/api/java/lang/StringBuilder.html#reverse\(\))` method in Java.

```cpp
#include <iostream>
#include <algorithm>
#include <string>
#include <cstring>
using namespace std;

// Function to reverse a given `std::string` using `std::reverse`.
// Note that `std::string` is passed as a reference parameter.
void reverse(string& str) {
    reverse(str.begin(), str.end());
}

// Function to reverse a given character array using `std::reverse`
void reverse(char *str) {
    reverse(str, str + strlen(str));
}

int main()
{
    /* Using std::string */

    string str = "Hello, World";
    reverse(str);
    cout << "Reverse of the given std::string is  " << str << endl;

    /* Using C-string */

    char s[] = "Hello, World";
    reverse(s);
    cout << "Reverse of the given C-string is  " << s;

    return 0;
}
```

##

```java
import java.lang.StringBuilder;

class Main
{
    public static void main (String[] args)
    {
        String str = "Hello, World";
        String rev = new StringBuilder(str).reverse().toString();

        System.out.println("The reverse of the given string is " + rev);
    }
}
```

## 2\. Using Stack

We can easily reverse a given string using the [stack data structure](https://techiedelight.com/stack-implementation/). The idea is to push each character of the string into a stack and then start filling the input string (starting from index 0) by popping characters from the stack until it is empty.

Following is the C++ and Java implementation of the idea:

```cpp
#include <iostream>
#include <stack>
using namespace std;

// Iterative function to reverse a given string.
// Note that `std::string` is passed as a reference parameter
void reverse(string &str, int n)
{
    // create an empty stack of characters
    stack<char> s;

    // push each character of the given string into the stack
    for (int i = 0; i < n; i++) {
        s.push(str[i]);
    }

    // start from index 0
    int k = 0;

    // pop characters from the stack until it is empty
    while (!s.empty())
    {
        // assign each popped character back to the input string
        str[k++] = s.top();
        s.pop();
    }
}

int main()
{
    string str = "Hello, World";

    reverse(str, str.length());
    cout << "Reverse of the given string is " << str;

    return 0;
}
```

##

```java
import java.util.Stack;

class Main
{
    // Iterative function to reverse a given string.
    public static void reverse(char[] c)
    {
        // create an empty stack of characters
        Stack<Character> stack = new Stack<>();

        // push each character of the given string into the stack
        for (int i = 0; i < c.length; i++) {
            stack.push(c[i]);
        }

        // start from index 0
        int k = 0;

        // pop characters from the stack until it is empty
        while (!stack.empty())
        {
            // assign each popped character back to the input string
            c[k++] = stack.pop();
        }
    }

    public static void main(String[] args)
    {
        String str = "Hello, World";

        char[] c = str.toCharArray();
        reverse(c);
        str = new String(c);

        System.out.print("Reverse of the given string is " + str);
    }
}
```

The time complexity of the above solution is O(n) and the auxiliary space used by the program is O(n) for stack.

## 3\. In-place conversion

The above solution takes O(n) for stack data structure which is not recommended. We can easily solve this problem in linear time and constant space. Following is the iterative [in-place solution](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) in C++ and Java:

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Iterative function to reverse a given string.
// Note that the string is passed as a reference parameter
void reverse(string &str)
{
    // start with two endpoints of the given string
    int begin = 0;
    int end = str.length() - 1;

    // run till two end-points intersect
    while (begin < end) {
        swap(str[begin++], str[end--]);
    }
}

int main()
{
    string str = "Hello, World";

    reverse(str);
    cout << "Reverse of the given string is " << str;

    return 0;
}
```
