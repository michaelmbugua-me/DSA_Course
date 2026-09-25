# Stack Implementation in Python

> Source: https://www.techiedelight.com/stack-implementation-python/

A stack is a linear data structure that follows the LIFO (Last–In, First–Out) order, i.e., items can be inserted or removed only at one end of it.

The stack supports the following standard operations:

  * push: Pushes an item at the top of the stack.
  * pop: Remove and return the item from the top of the stack.
  * peek: Returns the item at the top of the stack without removing it.
  * size: Returns the total number of items in the stack.
  * isEmpty: Checks whether the stack is empty.
  * isFull: Checks whether the stack is full.

Here’s a visual demonstration of `push` and `pop` operations at the top of the stack.

[ ](https://commons.wikimedia.org/wiki/File%3AData_stack.svg "By User:Boivie \[Public domain\], via Wikimedia Commons")

The time complexity of all the above operations is constant.

> 

## Stack Implementation using an Array

The stack can easily be implemented as an array. Following is the custom stack implementation in TypeScript, which uses an array:

```ts
// Custom stack implementation in TypeScript
class Stack {
    // Constructor to initialize the stack
    arr: (number | null)[];
    capacity: number;
    top: number;
    constructor(arr: (number | null)[], capacity: number, top: number) {
        this.arr = arr;
        this.capacity = capacity;
        this.top = top;
    }

    // Function to add an element `val` to the stack
    push(val: number): void {
        if (this.isFull()) {
            console.log('Stack Overflow!! Calling exit()…');
            process.exit(-1);
        }

        console.log(`Inserting ${val} into the stack…`);
        this.top = this.top + 1;
        this.arr[this.top] = val;
    }

    // Function to pop a top element from the stack
    pop(): number | null {
        // check for stack underflow
        if (this.isEmpty()) {
            console.log('Stack Underflow!! Calling exit()…');
            process.exit(-1);
        }

        console.log(`Removing ${this.peek()} from the stack`);

        // decrease stack size by 1 and (optionally) return the popped element
        const top = this.arr[this.top];
        this.top = this.top - 1;
        return top;
    }

    // Function to return the top element of the stack
    peek(): number | null {
        if (this.isEmpty()) {
            process.exit(-1);
        }
        return this.arr[this.top];
    }

    // Function to return the size of the stack
    size(): number {
        return this.top + 1;
    }

    // Function to check if the stack is empty or not
    isEmpty(): boolean {
        return this.size() === 0;
    }

    // Function to check if the stack is full or not
    isFull(): boolean {
        return this.size() === this.capacity;
    }
}

const stack = new Stack(new Array<number | null>(3).fill(null), 3, -1);

stack.push(1);       // Inserting 1 in the stack
stack.push(2);       // Inserting 2 in the stack

stack.pop();         // removing the top element (2)
stack.pop();         // removing the top element (1)

stack.push(3);       // Inserting 3 in the stack

console.log('The top element is', stack.peek());
console.log('The stack size is', stack.size());

stack.pop();         // removing the top element (3)

// check if the stack is empty
if (stack.isEmpty()) {
    console.log('The stack is empty');
}
else {
    console.log('The stack is not empty');
}
```

**Output:** Inserting 1 into the stack… Inserting 2 into the stack… Removing 2 from the stack Removing 1 from the stack Inserting 3 into the stack… The top element is 3 The stack size is 1 Removing 3 from the stack The stack is empty

## Using an Array

The TypeScript standard library offers array operations, which can act as a double-ended queue. A deque is a generalization of stacks and queues which support constant-time additions and deletions from either side of the deque in either direction.

Following is a simple example demonstrating the usage of array operations to implement stack data structure in TypeScript:

```ts
// Stack implementation using array operations in TypeScript

const stack: string[] = [];

console.log('Inserting A into the stack…');
stack.push('A');

console.log('Inserting B into the stack…');
stack.push('B');

console.log('Inserting C into the stack…');
stack.push('C');

console.log('Inserting D into the stack…');
stack.push('D');

console.log('The top element is', stack[stack.length - 1]);                 // prints the stack's top (D)

console.log(`Removing ${stack.pop()} from the stack`);   // removing the top element (D)
console.log(`Removing ${stack.pop()} from the stack`);   // removing the next top (C)

// returns the total number of elements present in the stack
console.log('The stack size is', stack.length);

console.log(`Removing ${stack.pop()} from the stack`);   // removing the top element (B)
console.log(`Removing ${stack.pop()} from the stack`);   // removing the next top (A)

// check if the stack is empty
if (stack.length === 0) {
    console.log('The stack is empty');
}
else {
    console.log('The stack is not empty');
}
```

**Output:** Inserting A into the stack… Inserting B into the stack… Inserting C into the stack… Inserting D into the stack… The top element is D Removing D from the stack Removing C from the stack The stack size is 2 Removing B from the stack Removing A from the stack The stack is empty

**Also See:**

> [Stack Implementation in C](https://techiedelight.com/stack-implementation/)

> [Stack Implementation in C++](https://techiedelight.com/stack-implementation-in-cpp/)

> [Stack Implementation in Java](https://techiedelight.com/stack-implementation-in-java/)

> [Stack Implementation using a Linked List – C, Java, and Python](https://techiedelight.com/stack-implementation-using-linked-list/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 192

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
