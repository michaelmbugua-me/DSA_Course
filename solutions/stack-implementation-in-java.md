# Stack Implementation in Java

> Source: https://www.techiedelight.com/stack-implementation-in-java/

A stack is a linear data structure that follows the LIFO (Last–In, First–Out) principle. That means the objects can be inserted or removed only at one end of it, also called a top.

The stack supports the following operations:

  * push inserts an item at the top of the stack (i.e., above its current top element).
  * pop removes the object at the top of the stack and returns that object from the function. The stack size will be decremented by one. [ ](https://commons.wikimedia.org/wiki/File%3AData_stack.svg "By User:Boivie \[Public domain\], via Wikimedia Commons")
  * isEmpty tests if the stack is empty or not.
  * isFull tests if the stack is full or not.
  * peek returns the object at the top of the stack without removing it from the stack or modifying the stack in any way.
  * size returns the total number of elements present in the stack.

> 

## Stack Implementation using an array

A stack can easily be implemented as an array. Following is the stack implementation in Java using an array:

```
class Stack
{
    private int arr[];
    private int top;
    private int capacity;

    // Constructor to initialize the stack
    Stack(int size)
    {
        arr = new int[size];
        capacity = size;
        top = -1;
    }

    // Utility function to add an element `x` to the stack
    public void push(int x)
    {
        if (isFull())
        {
            System.out.println("Overflow\nProgram Terminated\n");
            System.exit(-1);
        }

        System.out.println("Inserting " + x);
        arr[++top] = x;
    }

    // Utility function to pop a top element from the stack
    public int pop()
    {
        // check for stack underflow
        if (isEmpty())
        {
            System.out.println("Underflow\nProgram Terminated");
            System.exit(-1);
        }

        System.out.println("Removing " + peek());

        // decrease stack size by 1 and (optionally) return the popped element
        return arr[top--];
    }

    // Utility function to return the top element of the stack
    public int peek()
    {
        if (!isEmpty()) {
            return arr[top];
        }
        else {
            System.exit(-1);
        }

        return -1;
    }

    // Utility function to return the size of the stack
    public int size() {
        return top + 1;
    }

    // Utility function to check if the stack is empty or not
    public boolean isEmpty() {
        return top == -1;               // or return size() == 0;
    }

    // Utility function to check if the stack is full or not
    public boolean isFull() {
        return top == capacity - 1;     // or return size() == capacity;
    }
}

class Main
{
    public static void main (String[] args)
    {
        Stack stack = new Stack(3);

        stack.push(1);      // inserting 1 in the stack
        stack.push(2);      // inserting 2 in the stack

        stack.pop();        // removing the top element (2)
        stack.pop();        // removing the top element (1)

        stack.push(3);      // inserting 3 in the stack

        System.out.println("The top element is " + stack.peek());
        System.out.println("The stack size is " + stack.size());

        stack.pop();        // removing the top element (3)

        // check if the stack is empty
        if (stack.isEmpty()) {
            System.out.println("The stack is empty");
        }
        else {
            System.out.println("The stack is not empty");
        }
    }
}
```

**Output:** Inserting 1 Inserting 2 Removing 2 Removing 1 Inserting 3 The top element is 3 The stack size is 1 Removing 3 The stack is empty

The time complexity of `push()`, `pop()`, `peek()`, `isEmpty()`, `isFull()` and `size()` is constant, i.e., O(1).

## Using Java Collections

The stack is also included in [Java’s collection](https://docs.oracle.com/javase/8/docs/api/java/util/Stack.html) framework.

```
import java.util.Stack;

class Main
{
    public static void main(String[] args)
    {
        Stack<String> stack = new Stack<String>();

        stack.push("A");    // Insert `A` into the stack
        stack.push("B");    // Insert `B` into the stack
        stack.push("C");    // Insert `C` into the stack
        stack.push("D");    // Insert `D` into the stack

        // prints the top of the stack (`D`)
        System.out.println("The top element is " + stack.peek());

        stack.pop();        // removing the top element (`D`)
        stack.pop();        // removing the next top (`C)

        // returns the total number of elements present in the stack
        System.out.println("The stack size is " + stack.size());

        // check if the stack is empty
        if (stack.empty()) {
            System.out.println("The stack is empty");
        }
        else {
            System.out.println("The stack is not empty");
        }
    }
}
```

**Output:** The top element is D The stack size is 2 The stack is not empty

**Also See:**

> [Stack Implementation in C](https://techiedelight.com/stack-implementation/)

> [Stack Implementation in C++](https://techiedelight.com/stack-implementation-in-cpp/)

> [Stack Implementation in Python](https://techiedelight.com/stack-implementation-python/)

> [Stack Implementation using a Linked List – C, Java, and Python](https://techiedelight.com/stack-implementation-using-linked-list/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.88/5. Vote count: 180

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
