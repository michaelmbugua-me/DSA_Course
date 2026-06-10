# Stack Implementation in TypeScript

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

A stack can easily be implemented as an array. Following is the stack implementation in TypeScript using an array:

```ts
class Stack {
    private arr: number[];
    private top: number;
    private capacity: number;

    // Constructor to initialize the stack
    constructor(size: number) {
        this.arr = new Array<number>(size);
        this.capacity = size;
        this.top = -1;
    }

    // Utility function to add an element `x` to the stack
    push(x: number): void {
        if (this.isFull()) {
            console.log("Overflow\nProgram Terminated\n");
            process.exit(-1);
        }

        console.log("Inserting " + x);
        this.arr[++this.top] = x;
    }

    // Utility function to pop a top element from the stack
    pop(): number {
        // check for stack underflow
        if (this.isEmpty()) {
            console.log("Underflow\nProgram Terminated");
            process.exit(-1);
        }

        console.log("Removing " + this.peek());

        // decrease stack size by 1 and (optionally) return the popped element
        return this.arr[this.top--];
    }

    // Utility function to return the top element of the stack
    peek(): number {
        if (this.isEmpty()) {
            process.exit(-1);
        }
        return this.arr[this.top];
    }

    // Utility function to return the size of the stack
    size(): number {
        return this.top + 1;
    }

    // Utility function to check if the stack is empty or not
    isEmpty(): boolean {
        return this.top === -1;               // or return this.size() === 0;
    }

    // Utility function to check if the stack is full or not
    isFull(): boolean {
        return this.top === this.capacity - 1;     // or return this.size() === this.capacity;
    }
}

const stack = new Stack(3);

stack.push(1);      // inserting 1 in the stack
stack.push(2);      // inserting 2 in the stack

stack.pop();        // removing the top element (2)
stack.pop();        // removing the top element (1)

stack.push(3);      // inserting 3 in the stack

console.log("The top element is " + stack.peek());
console.log("The stack size is " + stack.size());

stack.pop();        // removing the top element (3)

// check if the stack is empty
if (stack.isEmpty()) {
    console.log("The stack is empty");
}
else {
    console.log("The stack is not empty");
}
```

**Output:** Inserting 1 Inserting 2 Removing 2 Removing 1 Inserting 3 The top element is 3 The stack size is 1 Removing 3 The stack is empty

The time complexity of `push()`, `pop()`, `peek()`, `isEmpty()`, `isFull()` and `size()` is constant, i.e., O(1).

## Using an Array

The stack is also included in the TypeScript standard library’s array operations.

```ts
const stack: string[] = [];

stack.push("A");    // Insert `A` into the stack
stack.push("B");    // Insert `B` into the stack
stack.push("C");    // Insert `C` into the stack
stack.push("D");    // Insert `D` into the stack

// prints the top of the stack (`D`)
console.log("The top element is " + stack[stack.length - 1]);

stack.pop();        // removing the top element (`D`)
stack.pop();        // removing the next top (`C)

// returns the total number of elements present in the stack
console.log("The stack size is " + stack.length);

// check if the stack is empty
if (stack.length === 0) {
    console.log("The stack is empty");
}
else {
    console.log("The stack is not empty");
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
