# Find all n-digit strictly increasing numbers (Bottom-up and Top-down approach)

> Source: https://www.techiedelight.com/find-n-digit-strictly-increasing-numbers-bottom-top-approach/

[String](https://www.techiedelight.com/Category/String/)

Find all n–digit strictly increasing numbers where `n` varies from `1` to `9`. A number is strictly increasing if every digit is greater than its preceding digit.

For example,

**8–digit strictly increasing numbers are:** 12345678 12345679 12345689 12345789 12346789 12356789 12456789 13456789 23456789 **7–digit strictly increasing numbers are:** 1234567 1234568 1234569 1234578 1234579 1234589 1234678 1234679 1234689 1234789 1235678 1235679 1235689 1235789 1236789 1245678 1245679 1245689 1245789 1246789 1256789 1345678 1345679 1345689 1345789 1346789 1356789 1456789 2345678 2345679 2345689 2345789 2346789 2356789 2456789 3456789

> 

A simple solution would be to generate all n–digit numbers and print only those numbers that satisfy the given constraints. The time complexity of this solution would be exponential.

A better solution is to generate only those n–digit numbers that satisfy the given constraints. The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). We fill the current index with digits greater than the previous digit and recur for the next index at each point in the recursion. There are two approaches to solve this problem:

## 1\. Bottom-Up Approach

In the bottom-up approach, we start from the first index and recursively fill the digits from left to right. Following is the C, C++, Java, and Python program that demonstrates it:

```c
#include <stdio.h>

// Function to find all n–digit strictly increasing
// numbers in a bottom-up manner
void printStrictlyInc(int prev, char result[], int index, int size)
{
    // If the array becomes n–digit
    if (index == size)
    {
        // null terminate the character array and print it
        result[index] = '\0';
        printf("%s ", result);

        return;
    }

    // start from the next digit (the last digit is `prev` at `result[index-1]`)
    for (int i = prev + 1; i <= 9; i++)
    {
        // put digit `i` in the current index
        result[index] = '0' + i;

        // recur for the next index
        printStrictlyInc(i, result, index + 1, size);
    }
}

int main(void)
{
    int n = 7;
    char result[n + 1];    // stores output

    printStrictlyInc(0, result, 0, n);

    return 0;
}
```

##

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to find all n–digit strictly increasing
// numbers in a bottom-up manner
void printStrictlyInc(string result, int n, char prev)
{
    if (n)
    {
        // start from the next digit (the last digit is `prev`)
        for (char ch = prev + 1; ch <= '9'; ch++) {
            printStrictlyInc(result + ch, n - 1, ch);
        }
    }
    // if the string becomes n–digit, print it
    else {
        cout << result << " ";
    }
}

int main()
{
    int n = 7;
    string result;

    printStrictlyInc(result, n, '0');

    return 0;
}
```

##

```java
class Main
{
    // Function to find all n–digit strictly increasing numbers
    // in a bottom-up manner
    public static void printStrictlyInc(String result, int n, char prev)
    {
        // if the string becomes n–digit, print it
        if (n == 0)
        {
            System.out.print(result + " ");
            return;
        }

        // start from the next digit (the last digit is `prev`)
        for (char ch = (char)(prev + 1); ch <= '9'; ch++) {
            printStrictlyInc(result + ch, n - 1, ch);
        }
    }

    public static void main(String[] args)
    {
        int n = 7;

        String result = "";
        printStrictlyInc(result, n, '0');
    }
}
```

##

```python3
# Function to find all n–digit strictly increasing numbers
# in a bottom-up manner
def printStrictlyInc(n, result='', prev='0'):

    # if the string becomes n–digit, print it
    if n == 0:
        print(result, end=' ')
        return

    # start from the next digit (the last digit is `prev`)
    for ch in range(ord(prev) + 1, ord('9') + 1):
        printStrictlyInc(n - 1, result + chr(ch), chr(ch))

if __name__ == '__main__':

    n = 7
    printStrictlyInc(n)
```

**Output:** 1234567 1234568 1234569 1234578 1234579 1234589 1234678 1234679 1234689 1234789 1235678 1235679 1235689 1235789 1236789 1245678 1245679 1245689 1245789 1246789 1256789 1345678 1345679 1345689 1345789 1346789 1356789 1456789 2345678 2345679 2345689 2345789 2346789 2356789 2456789 3456789

## 2\. Top-Down Approach

In the top-down approach, we start from the last index and recursively fill the digits from right to left. The implementation can be seen below in C, C++, Java, and Python:

```c
#include <stdio.h>

// Function to find all n–digit strictly increasing
// numbers in a top-down manner
void printStrictlyInc(int next, char result[], int index)
{
    // print the array if it becomes n–digit
    if (index == -1)
    {
        printf("%s ", result);
        return;
    }

    // start from the previous digit (the last digit was next)
    for (int i = next - 1; i > 0; i--)
    {
        // put digit `i` in the current index
        result[index] = '0' + i;

        // recur for the previous index
        printStrictlyInc(i, result, index - 1);
    }
}

int main(void)
{
    int n = 7;

    // character array to store the result
    char result[n + 1];

    // null terminate the array
    result[n] = '\0';

    printStrictlyInc(10, result, n - 1);

    return 0;
}
```

##

```cpp
#include <iostream>
#include <string>
using namespace std;

// Function to find all n–digit strictly increasing
// numbers in a top-down manner
void printStrictlyInc(string result, int n, char curr)
{
    if (n)
    {
        // start from the previous digit (the last digit was next)
        for (char ch = curr; ch >= '1'; ch--) {
            printStrictlyInc(ch + result, n - 1, ch - 1);
        }
    }
    // if the string becomes n–digit, print it
    else {
        cout << result << " ";
    }
}

int main()
{
    int n = 7;
    string result = "";

    printStrictlyInc(result, n, '9');

    return 0;
}
```

##

```java
class Main
{
    // Function to find all n–digit strictly increasing
    // numbers in a top-down manner
    public static void printStrictlyInc(String result, int n, char curr)
    {
        // if the string becomes n–digit, print it
        if (n == 0)
        {
            System.out.println(result);
            return;
        }

        for (char ch = curr; ch >= '1'; ch--) {
            printStrictlyInc(ch + result, n - 1, (char) (ch - 1));
        }
    }

    public static void main(String[] args)
    {
        int n = 7;

        String result = "";
        printStrictlyInc(result, n, '9');
    }
}
```

##

```python3
# Function to find all n–digit strictly increasing
# numbers in a top-down manner
def printStrictlyInc(n, result='', curr='9'):

    # if the string becomes n–digit, print it
    if n == 0:
        print(result, end=' ')
        return

    ch = ord(curr)
    while ch >= ord('1'):
        printStrictlyInc(n - 1, chr(ch) + result, chr(ch - 1))
        ch = ch - 1

if __name__ == '__main__':

    n = 7
    printStrictlyInc(n)
```

**Output:** 3456789 2456789 1456789 2356789 1356789 1256789 2346789 1346789 1246789 1236789 2345789 1345789 1245789 1235789 1234789 2345689 1345689 1245689 1235689 1234689 1234589 2345679 1345679 1245679 1235679 1234679 1234579 1234569 2345678 1345678 1245678 1235678 1234678 1234578 1234568 1234567
