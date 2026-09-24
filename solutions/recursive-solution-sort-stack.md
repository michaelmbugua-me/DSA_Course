# Recursive solution to sort a stack

> Source: https://www.techiedelight.com/recursive-solution-sort-stack/

[Stack](https://www.techiedelight.com/Category/Stack/)

Given a stack, sort it using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The use of any other data structures (like containers in STL or Collections in Java) is not allowed.

For example,

Stack before sorting : 5 | -2 | 9 | -7 | 3 where 3 is the top element Stack after sorting : -7 | -2 | 3 | 5 | 9 where 9 is the top element

> 

The idea is simple – recursively remove values from the [stack](https://techiedelight.com/stack-implementation/) until the stack becomes empty and then insert those values (from the [call stack](https://en.wikipedia.org/wiki/Call_stack)) back into the stack in a sorted position.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <stack>
#include <vector>
using namespace std;

// Insert the given key into the sorted stack while maintaining its sorted order.
// This is similar to the recursive insertion sort routine
void sortedInsert(stack<int> &stack, int key)
{
    // base case: if the stack is empty or
    // the key is greater than all elements in the stack
    if (stack.empty() || key > stack.top())
    {
        stack.push(key);
        return;
    }

    /* We reach here when the key is smaller than the top element */

    // remove the top element
    int top = stack.top();
    stack.pop();

    // recur for the remaining elements in the stack
    sortedInsert(stack, key);

    // insert the popped element back into the stack
    stack.push(top);
}

// Recursive method to sort a stack
void sortstack(stack<int> &stack)
{
    // base case: stack is empty
    if (stack.empty()) {
        return;
    }

    // remove the top element
    int top = stack.top();
    stack.pop();

    // recur for the remaining elements in the stack
    sortstack(stack);

    // insert the popped element back into the sorted stack
    sortedInsert(stack, top);
}

void printStack(stack<int> stack)
{
    while (!stack.empty())
    {
        cout << stack.top() << " ";
        stack.pop();
    }
    cout << endl;
}

int main()
{
    vector<int> list = { 5, -2, 9, -7, 3 };

    stack<int> stack;
    for (int i: list) {
        stack.push(i);
    }

    cout << "Stack before sorting: ";
    printStack(stack);

    sortstack(stack);

    cout << "Stack after sorting: ";
    printStack(stack);

    return 0;
}
```

**Output:** Stack before sorting: 3 -7 9 -2 5 Stack after sorting: 9 5 3 -2 -7

##

```java
import java.util.Arrays;
import java.util.List;
import java.util.Stack;

class Main
{
    // Insert the given key into the sorted stack while maintaining its
    // sorted order. This is similar to the recursive insertion sort routine.
    public static void sortedInsert(Stack<Integer> stack, int key)
    {
        // base case: if the stack is empty or
        // the key is greater than all elements in the stack
        if (stack.isEmpty() || key > stack.peek())
        {
            stack.push(key);
            return;
        }

        /* We reach here when the key is smaller than the top element */

        // remove the top element
        int top = stack.pop();

        // recur for the remaining elements in the stack
        sortedInsert(stack, key);

        // insert the popped element back into the stack
        stack.push(top);
    }

    // Recursive method to sort a stack
    public static void sortStack(Stack<Integer> stack)
    {
        // base case: stack is empty
        if (stack.isEmpty()) {
            return;
        }

        // remove the top element
        int top = stack.pop();

        // recur for the remaining elements in the stack
        sortStack(stack);

        // insert the popped element back into the sorted stack
        sortedInsert(stack, top);
    }

    public static void main(String[] args)
    {
        List<Integer> list = Arrays.asList(5, -2, 9, -7, 3);

        Stack<Integer> stack = new Stack<>();
        stack.addAll(list);

        System.out.println("Stack before sorting: " + stack);
        sortStack(stack);
        System.out.println("Stack after sorting: " + stack);
    }
}
```

##

```python3
from collections import deque

# Insert the given key into the sorted stack while maintaining its sorted order.
# This is similar to the recursive insertion sort routine
def sortedInsert(stack, key):

    # base case: if the stack is empty or
    # the key is greater than all elements in the stack
    if not stack or key > stack[-1]:
        stack.append(key)
        return

    ''' We reach here when the key is smaller than the top element '''

    # remove the top element
    top = stack.pop()

    # recur for the remaining elements in the stack
    sortedInsert(stack, key)

    # insert the popped element back into the stack
    stack.append(top)

# Recursive method to sort a stack
def sortStack(stack):

    # base case: stack is empty
    if not stack:
        return

    # remove the top element
    top = stack.pop()

    # recur for the remaining elements in the stack
    sortStack(stack)

    # insert the popped element back into the sorted stack
    sortedInsert(stack, top)

if __name__ == '__main__':

    A = [5, -2, 9, -7, 3]

    stack = deque(A)

    print('Stack before sorting:', list(stack))
    sortStack(stack)
    print('Stack after sorting:', list(stack))
```

The time complexity of the above solution is O(n2) and requires O(n) implicit space for the call stack, where `n` is the total number of elements in the stack.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.7/5. Vote count: 165

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [LIFO](https://www.techiedelight.com/Tags/LIFO/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
