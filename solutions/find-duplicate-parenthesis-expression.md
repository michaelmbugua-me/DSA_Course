# Find duplicate parenthesis in an expression

> Source: https://www.techiedelight.com/find-duplicate-parenthesis-expression/

Given a balanced expression that can contain opening and closing parenthesis, check if it contains any duplicate parenthesis or not.

For example,

**Input:** ((x+y))+z **Output:** true **Explanation:** Duplicate () found in subexpression ((x+y)) **Input:** (x+y) **Output:** false **Explanation:** No duplicate () is found **Input:** ((x+y)+((z))) **Output:** true **Explanation:** Duplicate () found in subexpression ((z))

> 

We can use a [stack](https://techiedelight.com/stack-implementation-in-cpp/) to solve this problem. The idea is to traverse the given expression and

  * If the current character in the expression is not a closing parenthesis `')'`, push the character into the stack.
  * If the current character in the expression is a closing parenthesis `')'`, check if the topmost element in the stack is an opening parenthesis or not. If it is an opening parenthesis, then the subexpression ending at the current character is of the form `((exp))`; otherwise, continue popping characters from the stack till matching `'('` is found for current `')'`.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <stack>
using namespace std;

// Function to find duplicate parenthesis in an expression
bool hasDuplicateParenthesis(string exp)
{
    if (exp.length() <= 3) {
        return false;
    }

    // take an empty stack of characters
    stack<char> stack;

    // traverse the input expression
    for (char c: exp)
    {
        // if the current char in the expression is not a closing parenthesis
        if (c != ')') {
            stack.push(c);
        }
        // if the current char in the expression is a closing parenthesis
        else {
            // if the stack's top element is an opening parenthesis,
            // the subexpression of the form ((exp)) is found
            if (stack.top() == '(') {
                return true;
            }

            // pop till '(' is found for current ')'
            while (stack.top() != '(') {
                stack.pop();
            }

            // pop '('
            stack.pop();
        }
    }

    // if we reach here, then the expression does not have any
    // duplicate parenthesis
    return false;
}

int main()
{
    string exp = "((x+y))";        // assumes valid expression

    if (hasDuplicateParenthesis(exp)) {
        cout << "The expression has duplicate parenthesis.";
    }
    else {
        cout << "The expression does not have duplicate parenthesis";
    }

    return 0;
}
```

**Output:** The expression has duplicate parenthesis

##

```java
import java.util.Stack;

class Main
{
    // Function to find duplicate parenthesis in an expression
    public static boolean hasDuplicateParenthesis(String exp)
    {
        if (exp == null || exp.length() <= 3) {
            return false;
        }

        // take an empty stack of characters
        Stack<Character> stack = new Stack<>();

        // traverse the input expression
        for (char c: exp.toCharArray())
        {
            // if the current char in the expression is not a closing parenthesis
            if (c != ')') {
                stack.push(c);
            }
            // if the current char in the expression is a closing parenthesis
            else {
                // if the stack's top element is an opening parenthesis,
                // the subexpression of the form ((exp)) is found
                if (stack.peek() == '(') {
                    return true;
                }

                // pop till '(' is found for current ')'
                while (stack.peek() != '(') {
                    stack.pop();
                }

                // pop '('
                stack.pop();
            }
        }

        // if we reach here, then the expression does not have any
        // duplicate parenthesis
        return false;
    }

    public static void main(String[] args)
    {
        String exp = "((x+y))";        // assumes valid expression

        if (hasDuplicateParenthesis(exp)) {
            System.out.println("The expression has duplicate parenthesis.");
        }
        else {
            System.out.println("The expression does not have duplicate parenthesis");
        }
    }
}
```

##

```python3
from collections import deque

# Function to find duplicate parenthesis in an expression
def hasDuplicateParenthesis(exp):

    if not exp or len(exp) <= 3:
        return False

    # take an empty stack of characters
    stack = deque()

    # traverse the input expression
    for c in exp:
        # if the current char in the expression is not a closing parenthesis
        if c != ')':
            stack.append(c)
        # if the current char in the expression is a closing parenthesis
        else:
            # if the stack's top element is an opening parenthesis,
            # the subexpression of the form ((exp)) is found
            if stack[-1] == '(':
                return True

            # pop till '(' is found for current ')'
            while stack[-1] != '(':
                stack.pop()

            # pop '('
            stack.pop()

    # if we reach here, then the expression does not have any
    # duplicate parenthesis
    return False

if __name__ == '__main__':

    exp = '((x+y))' # assumes valid expression

    if hasDuplicateParenthesis(exp):
        print('The expression has duplicate parenthesis.')
    else:
        print('The expression does not have duplicate parenthesis')
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the length of the input expression.

**Suggested Read:**

> [Find all strings of a given length containing balanced parentheses](https://techiedelight.com/find-strings-given-length-containing-balanced-parentheses/)

> [Find all combinations of non-overlapping substrings of a string](https://techiedelight.com/find-combinations-non-overlapping-substrings-string/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.88/5. Vote count: 216

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [LIFO](https://www.techiedelight.com/Tags/LIFO/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
