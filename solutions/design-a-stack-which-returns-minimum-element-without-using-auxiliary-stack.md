# Design a stack that returns a minimum element without using an auxiliary stack

> Source: https://www.techiedelight.com/design-a-stack-which-returns-minimum-element-without-using-auxiliary-stack/

[Stack](https://www.techiedelight.com/Category/Stack/)

Design a [stack](https://techiedelight.com/stack-implementation/) to support an additional operation that returns the minimum element from the stack in constant time. The stack should continue supporting all other operations like push, pop, top, size, empty, etc., without degradation in these operations’ performance.

We have used two stacks in the [previous approach](https://techiedelight.com/design-stack-which-returns-minimum-element-constant-time/) – the main stack to store the actual stack elements and an auxiliary stack to determine the minimum number in constant time. This implementation requires extra space for the auxiliary stack, but we can do this without an auxiliary stack. The idea is to do some tricky calculations before pushing numbers into the stack.

Suppose we will push a number value into a stack with a minimum number, `min`. If the value is greater than or equal to the `min`, it is pushed directly into the stack. If it is less than `min`, push `2×value-min`, and update `min` as a value since a new minimum number is pushed. How about to pop? We pop it directly if the top of the stack (it is denoted as top) is greater than or equal to `min`. Otherwise, the number top is not the real pushed number. The real pushed number is stored as `min`. After the current minimum number is popped, we need to restore the previous minimum number, `2×min-top`.

Now let’s demonstrate its correctness of this solution. Since the value is greater than or equal to `min`, it is pushed into stack direct without updating `min`. Therefore, when we find that the top of the stack is greater than or equal to `min`, we can pop directly without updating `min`. However, if we find the value is less than `min`, push `2×value-min`. We should notice that `2×value-min` should be less than the value. Then we update the current `min` as value. Therefore, the new top of the stack is less than the current `min`. Therefore, when we find that the top of the stack is less than `min`, the real top (real pushed number value) is stored in `min`. After we pop the top of the stack, we have to restore the previous minimum number. Since `top=2×value-previous-min` and value is current `min`, previous `min` is `2×current-min-top`.

This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <stack>
using namespace std;

class MinStack
{
    // main stack to store elements
    stack<int> s;

    // variable to store the minimum element
    int min;

public:

    // Inserts a given element on top of the stack
    void push(int val)
    {
        if (s.empty())
        {
            s.push(val);
            min = val;
        }
        else if (val > min) {
            s.push(val);
        }
        else {
            s.push(2*val - min);
            min = val;
        }
    }

    // Removes the top element from the stack
    void pop()
    {
        if (s.empty()) {
            cout << "Stack underflow!!" << endl;
            exit(-1);
        }

        int top = s.top();
        if (top < min) {
            min = 2*min - top;
        }
        s.pop();
    }

    // Returns the minimum element from the stack in constant time
    int getMin() {
        return min;
    }
};

int main()
{
    MinStack s;

    s.push(6);
    cout << s.getMin() << endl;

    s.push(7);
    cout << s.getMin() << endl;

    s.push(5);
    cout << s.getMin() << endl;

    s.push(3);
    cout << s.getMin() << endl;

    s.pop();
    cout << s.getMin() << endl;

    s.pop();
    cout << s.getMin() << endl;

    return 0;
}
```

**Output:** 6 6 5 3 5 6

##

```java
import java.util.Stack;

class MinStack
{
    // main stack to store elements
    private Stack<Integer> s = new Stack<>();

    // variable to store the minimum element
    private int min;

    // Inserts a given element on top of the stack
    public void push(int val)
    {
        if (s.empty())
        {
            s.push(val);
            min = val;
        }
        else if (val > min) {
            s.push(val);
        }
        else {
            s.push(2*val - min);
            min = val;
        }
    }

    // Removes the top element from the stack
    public void pop()
    {
        if (s.empty()) {
            System.out.println("Stack underflow!!");
            System.exit(-1);
        }

        int top = s.peek();
        if (top < min) {
            min = 2*min - top;
        }
        s.pop();
    }

    // Returns the minimum element from the stack in constant time
    public int getMin() {
        return min;
    }
}

class Main
{
    public static void main (String[] args)
    {
        MinStack s = new MinStack();

        s.push(6);
        System.out.println(s.getMin());

        s.push(7);
        System.out.println(s.getMin());

        s.push(5);
        System.out.println(s.getMin());

        s.push(3);
        System.out.println(s.getMin());

        s.pop();
        System.out.println(s.getMin());

        s.pop();
        System.out.println(s.getMin());
    }
}
```

##

```python3
from collections import deque

class MinStack:
    def __init__(self):
        # main stack to store elements
        self.s = deque()
        # variable to store the minimum element
        self.min = None

    # Inserts a given element on top of the stack
    def push(self, val):
        if not self.s:
            self.s.append(val)
            self.min = val
        elif val > self.min:
            self.s.append(val)
        else:
            self.s.append(2*val - self.min)
            self.min = val

    # Removes the top element from the stack
    def pop(self):
        if not self.s:
            self.print('Stack underflow!!')
            exit(-1)
        top = self.s[-1]
        if top < self.min:
            self.min = 2*self.min - top
        self.s.pop()

    # Returns the minimum element from the stack in constant time
    def getMin(self):
        return self.min

if __name__ == '__main__':

    s = MinStack()

    s.push(6)
    print(s.getMin())

    s.push(7)
    print(s.getMin())

    s.push(5)
    print(s.getMin())

    s.push(3)
    print(s.getMin())

    s.pop()
    print(s.getMin())

    s.pop()
    print(s.getMin())
```

**Reference:** [Coding Interview Questions: No. 02 – Stack with Function min()](https://codercareer.blogspot.com/2011/09/no-02-stack-with-function-min.html)

Also See:

> [Design a stack that returns the minimum element in constant time](https://www.techiedelight.com/design-stack-which-returns-minimum-element-constant-time/ "Design a stack that returns the minimum element in constant time")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.56/5. Vote count: 169

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
