# Find the length of the longest balanced parenthesis in a string

> Source: https://www.techiedelight.com/find-length-longest-balanced-parenthesis-string/

Given a string consisting of opening and closing parenthesis, find the length of the longest balanced parenthesis in it.

For example, the longest balanced parenthesis is highlighted in the following expressions:

((**()()** **(()())**(() (((**()** (((( **()()**

> 

A simple solution would be to generate all substrings of the given string and, for each substring, check if it is balanced or not. If the substring is balanced and has more length than the maximum length balanced substring found so far, update the result. The time complexity of this solution is O(n3) since there are O(n2) substrings for a string of length `n`, and each substring takes O(n) time to check if it is balanced.

We can solve this problem in O(n) time by using O(n) space. The idea is to iterate over the string characters, and if the current character is an opening parenthesis, push its index in a [stack](https://techiedelight.com/stack-implementation/). If the current character is a closing parenthesis, pop the top index from the stack and push the current index into the stack if it becomes empty.

We can get the length of the longest balanced parenthesis ending at the current character (closing parenthesis) by finding the difference between the current index and index at the stack’s top. We keep track of the length of the longest balanced parenthesis and update it whenever required.

For example, the following table demonstrates the above operations for string `(()())(()`. Note that the stack initially contains `-1` to handle the case when balanced parenthesis starts from index `0`.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <stack>
using namespace std;

// Function to find the length of the longest balanced parenthesis in a string
int findMaxLen(string str)
{
    // create a stack of integers for storing an index of parenthesis in the string
    stack<int> stack;

    // initialize the stack by -1
    stack.push(-1);

    // stores the length of the longest balanced parenthesis
    int len = 0;

    // iterate over the characters of the string
    for (int i = 0; i < str.length(); i++)
    {
        // if the current character is an opening parenthesis,
        // push its index in the stack
        if (str[i] == '(') {
            stack.push(i);
        }

        // if the current character is a closing parenthesis
        else {
            // pop the top index from the stack
            stack.pop();

            // if the stack becomes empty, push the current index into the stack
            if (stack.empty())
            {
                stack.push(i);
                continue;
            }

            // get length of the longest balanced parenthesis ending
            // at current character
            int curr_len = i - stack.top();

            // update the length of the longest balanced parenthesis
            if (len < curr_len) {
                len = curr_len;
            }
        }
    }

    return len;
}

int main()
{
    cout << findMaxLen("((()()") << endl;       // prints 4
    cout << findMaxLen("(((()") << endl;        // prints 2
    cout << findMaxLen("((((") << endl;         // prints 0
    cout << findMaxLen("()()") << endl;         // prints 4
    cout << findMaxLen("(()())(()");            // prints 6

    return 0;
}
```

##

```java
import java.util.Stack;

class Main
{
    // Function to find the length of the longest balanced parenthesis in a string
    public static int findMaxLen(String str)
    {
        // base case
        if (str == null) {
            return 0;
        }

        // create a stack of integers for storing an index of parenthesis in the string
        Stack<Integer> stack = new Stack<>();

        // initialize the stack by -1
        stack.push(-1);

        // stores the length of the longest balanced parenthesis
        int len = 0;

        // iterate over the characters of the string
        for (int i = 0; i < str.length(); i++)
        {
            // if the current character is an opening parenthesis,
            // push its index in the stack
            if (str.charAt(i) == '(') {
                stack.push(i);
            }

            // if the current character is a closing parenthesis
            else
            {
                // pop the top index from the stack
                stack.pop();

                // if the stack becomes empty, push the current index into the stack
                if (stack.empty())
                {
                    stack.push(i);
                    continue;
                }

                // get length of the longest balanced parenthesis ending at the
                // current character
                int curr_len = i - stack.peek();

                // update the length of the longest balanced parenthesis
                if (len < curr_len) {
                    len = curr_len;
                }
            }
        }

        return len;
    }

    public static void main(String[] args)
    {
        System.out.println(findMaxLen("((()()"));       // prints 4
        System.out.println(findMaxLen("(((()"));        // prints 2
        System.out.println(findMaxLen("(((("));         // prints 0
        System.out.println(findMaxLen("()()"));         // prints 4
        System.out.println(findMaxLen("(()())(()"));    // prints 6
    }
}
```

##

```python3
from collections import deque

# Function to find the length of the longest balanced parenthesis in a string
def findMaxLen(s):

    # base case
    if not s:
        return 0

    # create a stack of integers for storing an index of parenthesis in the string
    stack = deque()

    # initialize the stack by -1
    stack.append(-1)

    # stores the length of the longest balanced parenthesis
    length = 0

    # iterate over the characters of the string
    for i, e in enumerate(s):

        # if the current character is an opening parenthesis,
        # push its index in the stack
        if e == '(':
            stack.append(i)

        # if the current character is a closing parenthesis
        else:
            # pop the top index from the stack
            stack.pop()

            # if the stack becomes empty, push the current index into the stack
            if not stack:
                stack.append(i)
                continue

            # get the length of the longest balanced parenthesis ending at the
            # current character
            curr_len = i - stack[-1]

            # update the length of the longest balanced parenthesis
            if length < curr_len:
                length = curr_len

    return length

if __name__ == '__main__':

    print(findMaxLen('((()()'))         # prints 4
    print(findMaxLen('(((()'))          # prints 2
    print(findMaxLen('(((('))           # prints 0
    print(findMaxLen('()()'))           # prints 4
    print(findMaxLen('(()())(()'))      # prints 6
```

Also See:

> [Find duplicate parenthesis in an expression](https://www.techiedelight.com/find-duplicate-parenthesis-expression/ "Find duplicate parenthesis in an expression")

> [Check if an expression is balanced or not](https://www.techiedelight.com/check-given-expression-balanced-expression-not/ "Check if an expression is balanced or not")

> [Construct a string from an encoded sequence](https://www.techiedelight.com/construct-string-from-encoded-sequence/ "Construct a string from an encoded sequence")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 169

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
