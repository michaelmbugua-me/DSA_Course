# Check if an expression is balanced or not

> Source: https://www.techiedelight.com/check-given-expression-balanced-expression-not/

Given a string containing opening and closing braces, check if it represents a balanced expression or not.

For example,

{[{}{}]}[()], {{}{}}, []{}() are balanced expressions. {()}[), {(}) are not balanced.

> 

We can use a [stack](https://techiedelight.com/stack-implementation/) to solve this problem. The idea is to traverse the given expression, and

  * If the current character in the expression is an opening brace `(` or `{` or `[`, push it into the stack.
  * If the current character in the expression is a closing brace `)` or `}` or `]`, pop a character from the stack, and return false if the popped character is not the same as the current character, or it does not pair with the current character of the expression. Also, if the stack is empty, the total number of opening braces is less than the closing brace number at that point, so the expression cannot be balanced.

This would translate to a simple code below in C++, Java, and Python:

```cpp
#include <iostream>
#include <stack>
using namespace std;

// Function to check if the given expression is balanced or not
bool isBalanced(string exp)
{
    // base case: length of the expression must be even
    if (exp.length() & 1) {
        return false;
    }

    // take an empty stack of characters
    stack<char> stack;

    // traverse the input expression
    for (char ch: exp)
    {
        // if the current character in the expression is an opening brace,
        // push it into the stack
        if (ch == '(' || ch == '{' || ch == '[') {
            stack.push(ch);
        }

        // if the current character in the expression is a closing brace
        if (ch == ')' || ch == '}' || ch == ']')
        {
            // return false if a mismatch is found (i.e., if the stack is empty,
            // the expression cannot be balanced since the total number of opening
            // braces is less than the total number of closing braces)
            if (stack.empty()) {
                return false;
            }

            // pop character from the stack
            char top = stack.top();
            stack.pop();

            // if the popped character is not an opening brace or does
            // not pair with the current character of the expression
            if ((top == '(' && ch != ')') ||
                    (top == '{' && ch != '}') ||
                    (top == '[' && ch != ']')) {
                return false;
            }
        }
    }

    // the expression is balanced only when the stack is empty at this point
    return stack.empty();
}

int main()
{
    string exp = "{()}[{}]";

    if (isBalanced(exp)) {
        cout << "The expression is balanced";
    }
    else {
        cout << "The expression is not balanced";
    }

    return 0;
}
```

**Output:** The expression is balanced

##

```java
import java.util.Stack;

class Main
{
    // Function to check if the given expression is balanced or not
    public static boolean isBalanced(String exp)
    {
        // base case: length of the expression must be even
        if (exp == null || exp.length() % 2 == 1) {
            return false;
        }

        // take an empty stack of characters
        Stack<Character> stack = new Stack<>();

        // traverse the input expression
        for (char c: exp.toCharArray())
        {
            // if the current character in the expression is an opening brace,
            // push it into the stack
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            }

            // if the current character in the expression is a closing brace
            if (c == ')' || c == '}' || c == ']')
            {
                // return false if a mismatch is found (i.e., if the stack is empty,
                // the expression cannot be balanced since the total number of opening
                // braces is less than the total number of closing braces)
                if (stack.empty()) {
                    return false;
                }

                // pop character from the stack
                Character top = stack.pop();

                // if the popped character is not an opening brace or does not pair
                // with the current character of the expression
                if ((top == '(' && c != ')') || (top == '{' && c != '}')
                        || (top == '[' && c != ']')) {
                    return false;
                }
            }
        }

        // the expression is balanced only when the stack is empty at this point
        return stack.empty();
    }

    public static void main(String[] args)
    {
        String exp = "{()}[{}]";

        if (isBalanced(exp)) {
            System.out.println("The expression is balanced");
        }
        else {
            System.out.println("The expression is not balanced");
        }
    }
}
```

##

```python3
from collections import deque

# Function to check if the given expression is balanced or not
def isBalanced(exp):

    # base case: length of the expression must be even
    if not exp or len(exp) & 1:
        return False

    # take an empty stack of characters
    stack = deque()

    # traverse the input expression
    for ch in exp:

        # if the current character in the expression is an opening brace,
        # push it into the stack
        if ch == '(' or ch == '{' or ch == '[':
            stack.append(ch)

        # if the current character in the expression is a closing brace
        if ch == ')' or ch == '}' or ch == ']':
            # return false if a mismatch is found (i.e., if the stack is empty,
            # the expression cannot be balanced since the total number of opening
            # braces is less than the total number of closing braces)
            if not stack:
                return False

            # pop character from the stack
            top = stack.pop()

            # if the popped character is not an opening brace or does not pair
            # with the current character of the expression
            if (top == '(' and ch != ')') or (top == '{' and ch != '}' or
                                            (top == '[' and ch != ']')):
                return False

    # the expression is only balanced if the stack is empty at this point
    return not stack

if __name__ == '__main__':

    exp = '{()}[{}]'

    if isBalanced(exp):
        print('The expression is balanced')
    else:
        print('The expression is not balanced')
```

Another good solution traverses the given expression, and for each opening brace in the expression, push the corresponding closing brace into the stack. If the expression’s current character is a closing brace, it should match the stack’s top element. If a match is found, pop the top character from the stack; otherwise, we can say that the expression is not balanced. Also, note that the stack should be empty after we have processed all characters in the expression.

This would translate to a simple code below in C++, Java, and Python:

```cpp
#include <iostream>
#include <stack>
using namespace std;

// Function to check if the given expression is balanced or not
bool isBalanced(string exp)
{
    // base case: length of the expression must be even
    if (exp.length() & 1) {
        return false;
    }

    // take an empty stack of characters
    stack<char> stack;

    // traverse the input expression
    for (char ch: exp)
    {
        // if the current character in the expression is an opening brace,
        // push the corresponding closing brace into the stack.
        if (ch == '(') {
            stack.push(')');
        }
        else if (ch == '{') {
            stack.push('}');
        }
        else if (ch == '[') {
            stack.push(']');
        }

        // check if the current character is the same as the last inserted
        // character on the stack
        else if (!stack.empty() && stack.top() == ch) {
            stack.pop();
        }

        // return false if the stack is empty or
        // if the popped character is not an opening brace
        else {
            return false;
        }
    }

    // the expression is balanced only when the stack is empty at this point
    return stack.empty();
}

int main()
{
    string exp = "{()}[{}]";

    if (isBalanced(exp)) {
        cout << "The expression is balanced";
    }
    else {
        cout << "The expression is not balanced";
    }

    return 0;
}
```

**Output:** The expression is balanced

##

```java
import java.util.Stack;

class Main
{
    // Function to check if the given expression is balanced or not
    public static boolean isBalanced(String exp)
    {
        // base case: length of the expression must be even
        if (exp == null || exp.length() % 2 == 1) {
            return false;
        }

        // take an empty stack of characters
        Stack<Character> stack = new Stack<>();

        // traverse the input expression
        for (char ch: exp.toCharArray())
        {
            // if the current character in the expression is an opening brace,
            // push the corresponding closing brace into the stack.
            if (ch == '(') {
                stack.push(')');
            }
            else if (ch == '{') {
                stack.push('}');
            }
            else if (ch == '[') {
                stack.push(']');
            }

            // return false if the popped character is not the same as the
            // current character
            else if (stack.isEmpty() || stack.pop() != ch) {
                return false;
            }
        }

        // the expression is balanced only when the stack is empty at this point
        return stack.empty();
    }

    public static void main(String[] args)
    {
        String exp = "{()}[{}]";

        if (isBalanced(exp)) {
            System.out.println("The expression is balanced");
        }
        else {
            System.out.println("The expression is not balanced");
        }
    }
}
```

##

```python3
from collections import deque

# Function to check if the given expression is balanced or not
def isBalanced(exp):

    # base case: length of the expression must be even
    if not exp or len(exp) & 1:
        return False

    # take an empty stack of characters
    stack = deque()

    # traverse the input expression
    for ch in exp:

        # if the current character in the expression is an opening brace,
        # push the corresponding closing brace into the stack.
        if ch == '(':
            stack.append(')')
        elif ch == '{':
            stack.append('}')
        elif ch == '[':
            stack.append(']')

        # return false if the popped character is not the same as the current character
        elif not stack or stack.pop() != ch:
            return False

    # the expression is only balanced if the stack is empty at this point
    return not stack

if __name__ == '__main__':

    exp = '{()}[{}]'

    if isBalanced(exp):
        print('The expression is balanced')
    else:
        print('The expression is not balanced')
```

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the length of the input expression.
