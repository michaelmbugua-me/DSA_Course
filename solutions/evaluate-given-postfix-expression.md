# Evaluate a postfix expression

> Source: https://www.techiedelight.com/evaluate-given-postfix-expression/

Write code to evaluate a given postfix expression efficiently.

For example,

82/ will evaluate to 4 (8/2) 138*+ will evaluate to 25 (1+8*3) 545*+5/ will evaluate to 5 ((5+4*5)/5)

Assume that the postfix expression contains only single-digit numeric operands, without any whitespace.

> 

We can easily compute a postfix expression by using a [stack](https://techiedelight.com/stack-implementation-in-cpp/). The idea is to traverse the given postfix expression from left to right. If the current character of the expression is an operand, push it into the stack; otherwise, if the current character is an operator, pop the top two elements from the stack, evaluate them using the current operator and push the result back into the stack. When all the expression characters are processed, we will be left with only one element in the stack containing the value of a postfix expression.

Following is the implementation in C++, Java, and Python based on the above idea:

```cpp
#include <iostream>
#include <string>
#include <stack>
using namespace std;

// Function to evaluate a given postfix expression
int evalPostfix(string exp)
{
    // create an empty stack
    stack<int> stack;

    // traverse the given expression
    for (char c: exp)
    {
        // if the current character is an operand, push it into the stack
        if (c >= '0' && c <= '9') {
            stack.push(c - '0');
        }
        // if the current character is an operator
        else {
            // remove the top two elements from the stack
            int x = stack.top();
            stack.pop();

            int y = stack.top();
            stack.pop();

            // evaluate the expression 'x op y', and push the
            // result back to the stack
            if (c == '+') {
                stack.push(y + x);
            }
            else if (c == '-') {
                stack.push(y - x);
            }
            else if (c == '*') {
                stack.push(y * x);
            }
            else if (c == '/') {
                stack.push(y / x);
            }
        }
    }

    // At this point, the stack is left with only one element, i.e.,
    // expression result
    return stack.top();
}

int main()
{
    string exp = "138*+";

    cout << evalPostfix(exp);

    return 0;
}
```

**Output:** 25

##

```java
import java.util.Stack;

class Main
{
    // Function to evaluate a given postfix expression
    public static int evalPostfix(String exp)
    {
        // base case
        if (exp == null || exp.length() == 0) {
            System.exit(-1);
        }

        // create an empty stack
        Stack<Integer> stack = new Stack<>();

        // traverse the given expression
        for (char c: exp.toCharArray())
        {
            // if the current character is an operand, push it into the stack
            if (Character.isDigit(c)) {
                stack.push(c - '0');
            }
            // if the current character is an operator
            else {
                // remove the top two elements from the stack
                int x = stack.pop();
                int y = stack.pop();

                // evaluate the expression 'x op y', and push the
                // result back to the stack
                if (c == '+') {
                    stack.push(y + x);
                }
                else if (c == '-') {
                    stack.push(y - x);
                }
                else if (c == '*') {
                    stack.push(y * x);
                }
                else if (c == '/') {
                    stack.push(y / x);
                }
            }
        }

        // At this point, the stack is left with only one element, i.e.,
        // expression result
        return stack.pop();
    }

    public static void main(String[] args)
    {
        String exp = "138*+";
        System.out.println(evalPostfix(exp));
    }
}
```

##

```python3
from collections import deque

# Function to evaluate a given postfix expression
def evalPostfix(exp):

    # base case
    if not exp:
        exit(-1)

    # create an empty stack
    stack = deque()

    # traverse the given expression
    for ch in exp:

        # if the current is an operand, push it into the stack
        if ch.isdigit():
            stack.append(int(ch))

        # if the current is an operator
        else:
            # remove the top two elements from the stack
            x = stack.pop()
            y = stack.pop()

            # evaluate the expression 'x op y', and push the
            # result back to the stack
            if ch == '+':
                stack.append(y + x)
            elif ch == '-':
                stack.append(y - x)
            elif ch == '*':
                stack.append(y * x)
            elif ch == '/':
                stack.append(y // x)

    # At this point, the stack is left with only one element, i.e.,
    # expression result
    return stack.pop()

if __name__ == '__main__':

    exp = '138*+'
    print(evalPostfix(exp))
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the length of the postfix expression.

Also See:

> [Convert an infix expression into a postfix expression](https://www.techiedelight.com/convert-infix-to-postfix-expression/ "Convert an infix expression into a postfix expression")

> [Evaluate a given expression](https://www.techiedelight.com/evaluate-given-expression/ "Evaluate a given expression")

> [Construction of an expression tree](https://www.techiedelight.com/expression-tree/ "Construction of an expression tree")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.79/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
