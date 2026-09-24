# Reverse a string using recursion – C, C++, and Java

> Source: https://www.techiedelight.com/reverse-a-string-using-recursion/

Write a recursive program to efficiently reverse a given string in C, C++, and Java.

For example,

**Input:** Techie Delight **Output:** thgileD eihceT

## Approach 1

As seen in the [previous post](https://techiedelight.com/reverse-string-without-using-recursion/), we can easily reverse a given string using a stack data structure. As the stack is involved, we can easily convert the code to use the [call stack](https://en.wikipedia.org/wiki/Call_stack).

The implementation can be seen below in C and C++:

```c
#include <stdio.h>

// Function to swap two given characters
void swap(char *x, char *y)
{
    char temp = *x;
    *x = *y;
    *y = temp;
}

// Recursive function to reverse a given string
void reverse(char *str, int k)
{
    static int i = 0;

    // if the end of the string is reached
    if (*(str + k) == '\0') {
        return;
    }

    reverse(str, k + 1);

    if (i <= k) {
        swap(&str[i++], &str[k]);
    }
}

int main()
{
    char str[] = "Techie Delight";

    reverse(str, 0);
    printf("Reverse of the given string is %s", str);

    return 0;
}
```

##

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Recursive function to reverse a given string
// Note string is passed as a reference parameter
void reverse(string &str, int k)
{
    static int i = 0;

    // if the end of the string is reached
    if (k == str.length()) {
        return;
    }

    reverse(str, k + 1);

    if (i <= k) {
        swap(str[i++], str[k]);
    }
}

int main()
{
    string str = "Techie Delight";

    reverse(str, 0);
    cout << "Reverse of the given string is " << str;

    return 0;
}
```

## Approach 2

The above solution uses a static variable, which is not recommended. We can easily solve this problem without using any static variable. This approach is almost similar to approach #3 discussed [here](https://techiedelight.com/reverse-string-without-using-recursion/).

Following is the implementation in C, C++, and Java based on the above idea:

```c
#include <stdio.h>
#include <string.h>

// Function to swap two given characters
void swap(char *x, char *y)
{
    char temp = *x;
    *x = *y;
    *y = temp;
}

// Recursive function to reverse a given string
void reverse(char str[], int l, int h)
{
    if (l < h)
    {
        swap(&str[l], &str[h]);
        reverse(str, l + 1, h - 1);
    }
}

int main()
{
    char str[] = "Techie Delight";

    reverse(str, 0, strlen(str) - 1);

    printf("Reverse of the given string is %s", str);

    return 0;
}
```

##

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

// Recursive function to reverse a given string
// Note string is passed as a reference parameter
void reverse(string &str, int l, int h)
{
    if (l < h)
    {
        swap(str[l], str[h]);
        reverse(str, l + 1, h - 1);
    }
}

int main()
{
    string str = "Techie Delight";

    reverse(str, 0, str.length() - 1);
    cout << "Reverse of the given string is " << str;

    return 0;
}
```

##

```java
class Main
{
    private static void swap(char[] c, int i, int j)
    {
        char temp = c[i];
        c[i] = c[j];
        c[j] = temp;
    }

    // Recursive function to reverse a given string
    public static void reverse(char[] c, int l, int h)
    {
        if (l < h)
        {
            swap(c, l, h);
            reverse(c, l + 1, h - 1);
        }
    }

    public static void main(String[] args)
    {
        String str = "Techie Delight";

        char[] c = str.toCharArray();
        reverse(c, 0, c.length - 1);
        str = new String(c);

        System.out.print("Reverse of the given string is " + str);
    }
}
```

The time complexity of both above-discussed methods is O(n) and requires O(n) implicit space for the call stack, where `n` is the length of the input string.
