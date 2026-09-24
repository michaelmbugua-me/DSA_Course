# Stack Implementation using a Linked List – C, Java, and Python

> Source: https://www.techiedelight.com/stack-implementation-using-linked-list/

A stack is a [linear data structure](https://en.wikipedia.org/wiki/Linear_data_structure "Linear data structure") that serves as a collection of elements, with three main operations: push, pop, and peek. We have discussed these operations in the [previous post](https://techiedelight.com/stack-implementation/) and covered an array implementation of the stack data structure. In this post, a [linked list](https://techiedelight.com/introduction-linked-lists/) implementation of the stack is discussed.

> 

We can easily implement a stack through a [linked list](https://techiedelight.com/linked-list-implementation-part-1/). In linked list implementation, a stack is a pointer to the “head” of the list where pushing and popping items happens, with perhaps a counter to keep track of the list’s size.

The advantage of using a linked list over arrays is that it is possible to implement a stack that can grow or shrink as much as needed. Using an array will restrict the maximum capacity of the array, which can lead to stack overflow. Here each new node will be dynamically allocated, so overflow is not possible unless memory is exhausted.

The implementation can be seen below in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int data;               // integer data
    struct Node* next;      // pointer to the next node
};

int nodesCount;

// Utility function to add an element `x` to the stack
void push(struct Node **top, int x)        // insert at the beginning
{
    // allocate a new node in a heap
    struct Node* node = NULL;
    node = (struct Node*)malloc(sizeof(struct Node));

    // check if stack (heap) is full. Then inserting an element would
    // lead to stack overflow
    if (!node)
    {
        printf("Heap Overflow\n");
        exit(-1);
    }

    printf("Inserting %d\n", x);

    // set data in the allocated node
    node->data = x;

    // set the .next pointer of the new node to point to the current
    // top node of the list
    node->next = *top;

    // update top pointer
    *top = node;

    // increase stack's size by 1
    nodesCount += 1;
}

// Utility function to check if the stack is empty or not
int isEmpty(struct Node* top) {
    return top == NULL;
}

// Utility function to return the top element of the stack
int peek(struct Node *top)
{
    // check for an empty stack
    if (!isEmpty(top)) {
        return top->data;
    }
    else {
        printf("The stack is empty\n");
        exit(EXIT_FAILURE);
    }
}

// Utility function to pop a top element from the stack
int pop(struct Node** top)        // remove at the beginning
{
    struct Node *node;

    // check for stack underflow
    if (*top == NULL)
    {
        printf("Stack Underflow\n");
        exit(EXIT_FAILURE);
    }

    // take note of the top node's data
    int x = peek(*top);

    printf("Removing %d\n", x);

    node = *top;

    // update the top pointer to point to the next node
    *top = (*top)->next;

    // decrease stack's size by 1
    nodesCount -= 1;

    // free allocated memory
    free(node);

    return x;
}

// Utility function to return the nodesCount of the stack
int size() {
    return nodesCount;
}

int main(void)
{
    struct Node* top = NULL;

    push(&top, 1);
    push(&top, 2);
    push(&top, 3);

    printf("The top element is %d\n", peek(top));

    pop(&top);
    pop(&top);
    pop(&top);

    if (isEmpty(top)) {
        printf("The stack is empty\n");
    }
    else {
        printf("The stack is not empty\n");
    }

    return 0;
}
```

##

```java
// A Linked List Node
class Node
{
    int data;       // integer data
    Node next;      // pointer to the next node
}

class Stack
{
    private Node top;
    private int nodesCount;

    public Stack() {
        this.top = null;
        this.nodesCount = 0;
    }

    // Utility function to add an element `x` to the stack
    public void push(int x)        // insert at the beginning
    {
        // allocate a new node in a heap
        Node node = new Node();

        // check if stack (heap) is full. Then inserting an element would
        // lead to stack overflow
        if (node == null)
        {
            System.out.println("Heap Overflow");
            return;
        }

        System.out.println("Inserting " + x);

        // set data in the allocated node
        node.data = x;

        // set the .next pointer of the new node to point to the current
        // top node of the list
        node.next = top;

        // update top pointer
        top = node;

        // increase stack's size by 1
        this.nodesCount += 1;
    }

    // Utility function to check if the stack is empty or not
    public boolean isEmpty() {
        return top == null;
    }

    // Utility function to return the top element of the stack
    public int peek()
    {
        // check for an empty stack
        if (isEmpty()) {
            System.out.println("The stack is empty");
            System.exit(-1);
        }
        return top.data;
    }

    // Utility function to pop a top element from the stack
    public int pop()        // remove at the beginning
    {
        // check for stack underflow
        if (isEmpty())
        {
            System.out.println("Stack Underflow");
            System.exit(-1);
        }

        // take note of the top node's data
        int top = peek();

        System.out.println("Removing " + top);

        // decrease stack's size by 1
        this.nodesCount -= 1;

        // update the top pointer to point to the next node
        this.top = (this.top).next;

        return top;
    }

    // Utility function to return the size of the stack
    public int size() {
        return this.nodesCount;
    }
}

class Main
{
    public static void main(String[] args)
    {
        Stack stack = new Stack();

        stack.push(1);
        stack.push(2);
        stack.push(3);

        System.out.println("The top element is " + stack.peek());

        stack.pop();
        stack.pop();
        stack.pop();

        if (stack.isEmpty()) {
            System.out.println("The stack is empty");
        }
        else {
            System.out.println("The stack is not empty");
        }
    }
}
```

##

```python3
# A Linked List Node
class Node:
    def __init__(self, key, next=None):
        self.key = key
        self.next = next

class Stack:
    def __init__(self):
        self.top = None
        self.nodesCount = 0

    # Utility function to add an element `x` to the stack
    def push(self, x):        # insert at the beginning

        # allocate a new node in a heap
        node = Node(x)

        # check if stack (heap) is full. Then inserting an element would
        # lead to stack overflow
        if node is None:
            print('Heap Overflow')
            return

        # set data in the allocated node
        node.data = x

        # set the .next pointer of the new node to point to the current
        # top node of the list
        node.next = self.top

        # update top pointer
        self.top = node

        # increase stack's size by 1
        self.nodesCount += 1

    # Utility function to check if the stack is empty or not
    def isEmpty(self):
        return self.top is None

    # Utility function to return the top element of the stack
    def peek(self):
        # check for an empty stack
        if not self.isEmpty():
            return self.top.data
        else:
            print('The stack is empty')
            exit(-1)

    # Utility function to pop a top element from the stack
    def pop(self):            # remove at the beginning

        # check for stack underflow
        if self.top is None:
            print('Stack Underflow')
            exit(-1)

        # take note of the top node's data
        top = self.top.data

        # update the top pointer to point to the next node
        self.top = self.top.next

        # decrease stack's size by 1
        self.nodesCount -= 1

        return top

    # Function to return the size of the stack
    def size(self):
        return self.nodesCount

if __name__ == '__main__':

    stack = Stack()

    stack.push(1)
    stack.push(2)
    stack.push(3)

    print('Top element is', stack.peek())

    stack.pop()
    stack.pop()
    stack.pop()

    if stack.isEmpty():
        print('The stack is empty')
    else:
        print('The stack is not empty')
```

**Output:** Inserting 1 Inserting 2 Inserting 3 The top element is 3 Removing 3 Removing 2 Removing 1 The stack is empty

The time complexity of push and pop operations is O(1).

**References:** <https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>

Also See:

> [Stack Implementation using Templates in C++](https://www.techiedelight.com/stack-implementation-using-templates/ "Stack Implementation using Templates in C++")

> [Stack Implementation in Java](https://www.techiedelight.com/stack-implementation-in-java/ "Stack Implementation in Java")

> [Stack Implementation in C](https://www.techiedelight.com/stack-implementation/ "Stack Implementation in C")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 223

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
