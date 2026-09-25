# Stack Implementation using a Linked List – C, Java, and Python

> Source: https://www.techiedelight.com/stack-implementation-using-linked-list/

A stack is a [linear data structure](https://en.wikipedia.org/wiki/Linear_data_structure "Linear data structure") that serves as a collection of elements, with three main operations: push, pop, and peek. We have discussed these operations in the [previous post](https://techiedelight.com/stack-implementation/) and covered an array implementation of the stack data structure. In this post, a [linked list](https://techiedelight.com/introduction-linked-lists/) implementation of the stack is discussed.

> 

We can easily implement a stack through a [linked list](https://techiedelight.com/linked-list-implementation-part-1/). In linked list implementation, a stack is a pointer to the “head” of the list where pushing and popping items happens, with perhaps a counter to keep track of the list’s size.

The advantage of using a linked list over arrays is that it is possible to implement a stack that can grow or shrink as much as needed. Using an array will restrict the maximum capacity of the array, which can lead to stack overflow. Here each new node will be dynamically allocated, so overflow is not possible unless memory is exhausted.

The implementation can be seen below in TypeScript:

```ts
// A Linked List Node
class Node {
    constructor(public key: number, public next: Node | null = null) {}
}

class Stack {
    top: Node | null = null;
    nodesCount = 0;

    // Utility function to add an element `x` to the stack
    push(x: number): void {     // insert at the beginning

        // allocate a new node in a heap
        const node = new Node(x);

        // set data in the allocated node
        node.key = x;

        // set the .next pointer of the new node to point to the current
        // top node of the list
        node.next = this.top;

        // update top pointer
        this.top = node;

        // increase stack's size by 1
        this.nodesCount += 1;
    }

    // Utility function to check if the stack is empty or not
    isEmpty(): boolean {
        return this.top === null;
    }

    // Utility function to return the top element of the stack
    peek(): number {
        // check for an empty stack
        if (this.isEmpty()) {
            console.log('The stack is empty');
            process.exit(-1);
        }
        return this.top!.key;
    }

    // Utility function to pop a top element from the stack
    pop(): number {             // remove at the beginning

        // check for stack underflow
        if (this.top === null) {
            console.log('Stack Underflow');
            process.exit(-1);
        }

        // take note of the top node's data
        const top = this.top!.key;

        // update the top pointer to point to the next node
        this.top = this.top!.next;

        // decrease stack's size by 1
        this.nodesCount -= 1;

        return top;
    }

    // Function to return the size of the stack
    size(): number {
        return this.nodesCount;
    }
}

const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);

console.log('The top element is', stack.peek());

stack.pop();
stack.pop();
stack.pop();

if (stack.isEmpty()) {
    console.log('The stack is empty');
}
else {
    console.log('The stack is not empty');
}
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
