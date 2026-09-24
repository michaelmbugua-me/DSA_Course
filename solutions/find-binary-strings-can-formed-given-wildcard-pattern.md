# Find all binary strings that can be formed from a wildcard pattern

> Source: https://www.techiedelight.com/find-binary-strings-can-formed-given-wildcard-pattern/

Given a binary pattern containing `?` wildcard character at a few positions, find all possible combinations of binary strings that can be formed by replacing the wildcard character by either `0` or `1`.

For example, for wildcard pattern `1?11?00?1?`, the possible combinations are:

1011000010 1011000011 1011000110 1011000111 1011100010 1011100011 1011100110 1011100111 1111000010 1111000011 1111000110 1111000111 1111100010 1111100011 1111100110 1111100111

> 

## Recursive Solution

We can easily solve this problem by using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The idea is to process each character of the pattern one at a time and recur for the remaining pattern. If the current digit is `0` or `1`, ignore it. If the current character is a wildcard character `?`, replace it with `0` and `1`, and recur for the remaining pattern.

Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>

// Find all binary strings that can be formed from a given wildcard pattern
void printAllCombinations(char pattern[], int i)
{
    if (pattern[i] == '\0')
    {
        printf("%s\n", pattern);
        return;
    }

    // if the current character is '?'
    if (pattern[i] == '?')
    {
        for (int k = 0; k < 2; k++)
        {
            // replace '?' with 0 and 1
            pattern[i] = k + '0';

            // recur for the remaining pattern
            printAllCombinations(pattern, i + 1);

            // backtrack (since the array is passed by reference to the function)
            pattern[i] = '?';
        }
        return;
    }

    // if the current character is 0 or 1, ignore it and
    // recur for the remaining pattern
    printAllCombinations(pattern, i + 1);
}

int main()
{
    char pattern[] = "1?11?00?1?";

    printAllCombinations(pattern, 0);

    return 0;
}
```

##

```java
class Main
{
    // Find all binary strings that can be formed from a given wildcard pattern
    private static void printAllCombinations(char[] pattern, int i)
    {
        // base case
        if (pattern == null || pattern.length == 0) {
            return;
        }

        // base case
        if (i == pattern.length)
        {
            System.out.println(pattern);
            return;
        }

        // if the current character is '?'
        if (pattern[i] == '?')
        {
            for (char ch = '0'; ch <= '1'; ch++)
            {
                // replace '?' with 0 and 1
                pattern[i] = ch;

                // recur for the remaining pattern
                printAllCombinations(pattern, i + 1);

                // backtrack
                pattern[i] = '?';
            }
        }
        else {
            // if the current character is 0 or 1, ignore it and
            // recur for the remaining pattern
            printAllCombinations(pattern, i + 1);
        }
    }

    public static void main(String[] args)
    {
        char[] pattern = "1?11?00?1?".toCharArray();
        printAllCombinations(pattern, 0);
    }
}
```

##

```python3
# Find all binary strings that can be formed from a given wildcard pattern
def printAllCombinations(pattern, i=0):

    # base case
    if not pattern:
        return

    if i == len(pattern):
        print(''.join(pattern))
        return

    # if the current character is '?'
    if pattern[i] == '?':
        for ch in '01':

            # replace '?' with 0 and 1
            pattern[i] = ch

            # recur for the remaining pattern
            printAllCombinations(pattern, i + 1)

            # backtrack
            pattern[i] = '?'

    else:
        # if the current character is 0 or 1, ignore it and
        # recur for the remaining pattern
        printAllCombinations(pattern, i + 1)

if __name__ == '__main__':

    pattern = '1?11?00?1?'
    printAllCombinations(list(pattern))
```

**Output:** 1011000010 1011000011 1011000110 1011000111 1011100010 1011100011 1011100110 1011100111 1111000010 1111000011 1111000110 1111000111 1111100010 1111100011 1111100110 1111100111

## Iterative Solution

We can also solve this problem iteratively using [stack](https://techiedelight.com/stack-implementation/), [queue](https://techiedelight.com/circular-queue-implementation-c/), set, vector, or any other container. The idea remains the same. Start by processing each character of the pattern one at a time, but instead of recursing for the remaining pattern, push it into a container. At each iteration, pop a string from the container, find the first occurrence of wildcard pattern `?` in it, replace `?` with `0` and `1`, and finally push it back into the container. If no wildcard pattern is found, print the popped string. Repeat this process until the container is empty.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <stack>
using namespace std;

// Find all binary strings that can be formed from a given
// wildcard pattern
void printAllCombinations(string pattern)
{
    // create an empty stack (we can also use set, queue, vector, or
    // any other container)
    stack<string> list;
    list.push(pattern);        // push the pattern into the stack

    size_t index;

    // loop till stack is empty
    while (!list.empty())
    {
        // pop a string from the stack and process it
        string curr = list.top();
        list.pop();

        // `index` stores position of the first occurrence of wildcard
        // pattern in `curr`
        if ((index = curr.find_first_of('?')) != string::npos)
        {
            for (int i = 0; i < 2; i++)
            {
                // replace '?' with 0 and 1 and push it into the stack
                curr[index] = i + '0';
                list.push(curr);
            }
        }

        // if no wildcard pattern is found, print the string
        else {
            cout << curr << endl;
        }
    }
}

int main()
{
    string pattern = "1?11?00?1?";

    printAllCombinations(pattern);

    return 0;
}
```

##

```java
import java.util.Stack;

class Main
{
    // Find all binary strings that can be formed from a given wildcard pattern
    public static void printAllCombinations(String pattern)
    {
        // base case
        if (pattern == null || pattern.length() == 0) {
            return;
        }

        // create an empty stack (we can also use set, queue, list, or
        // any other container)
        Stack<String> stack = new Stack<>();
        stack.push(pattern);        // push the pattern into the stack

        int index;

        // loop till stack is empty
        while (!stack.empty())
        {
            // pop a string from the stack and process it
            String curr = stack.pop();

            // `index` stores position of the first occurrence of wildcard
            // pattern in `curr`
            if ((index = curr.indexOf('?')) != -1)
            {
                // replace '?' with 0 and 1 and push it into the stack
                for (char ch = '0'; ch <= '1'; ch++)
                {
                    curr = curr.substring(0, index) + ch +
                            curr.substring(index + 1);
                    stack.push(curr);
                }
            }

            // if no wildcard pattern is found, print the string
            else {
                System.out.println(curr);
            }
        }
    }

    public static void main(String[] args)
    {
        String pattern = "1?11?00?1?";

        printAllCombinations(pattern);
    }
}
```

##

```python3
from collections import deque

# Find all binary strings that can be formed from a given wildcard pattern
def printAllCombinations(pattern):

    # base case
    if not pattern:
        return

    # create an empty stack (we can also use set, list, or any other container)
    stack = deque()
    stack.append(pattern)     # push the pattern into the stack

    # loop till stack is empty
    while stack:

        # pop a string from the stack and process it
        curr = stack.pop()

        # `index` stores position of the first occurrence of wildcard
        # pattern in `curr`
        index = curr.find('?')
        if index != -1:
            # replace '?' with 0 and 1 and push it into the stack
            for ch in '01':
                curr = curr[:index] + ch + curr[index + 1:]
                stack.append(curr)

        # if no wildcard pattern is found, print the string
        else:
            print(curr)

if __name__ == '__main__':

    pattern = '1?11?00?1?'
    printAllCombinations(pattern)
```

**Output:** 1111100111 1111100110 1111100011 1111100010 1111000111 1111000110 1111000011 1111000010 1011100111 1011100110 1011100011 1011100010 1011000111 1011000110 1011000011 1011000010

The worst-case time complexity of the above solutions is O(2n) and requires O(n) extra space, where `n` is the length of the input string. The worst case happens when all the strings’ characters are `?` and exponential number of strings gets generated. For example, for the string `??????`, there are `64` strings in the output.

The best-case time complexity of the above solution is O(n). The best case happens when the string doesn’t contain any wildcard character `?`.
