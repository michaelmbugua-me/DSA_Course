# Stack Implementation in TypeScript

> Source: https://www.techiedelight.com/stack-implementation-in-cpp/

A stack is a [linear data structure](https://en.wikipedia.org/wiki/Linear_data_structure "Linear data structure") that serves as a container of objects that are inserted and removed according to the LIFO (Last–In, First–Out) rule.

The stack has three main operations: `push`, `pop`, and `peek`. We have discussed these operations in the previous post and covered [array](https://techiedelight.com/stack-implementation/) and [linked list implementation of stack data structure](https://techiedelight.com/stack-implementation-using-linked-list/) in C. In this article, a TypeScript implementation of the stack data structure is discussed using a class.

Following is the stack implementation in TypeScript which covers the following operations:

  1. push: Inserts a new element at the top of the stack, above its current top element.
  2. pop: Removes the top element on the stack, thereby decrementing its size by one.
  3. isEmpty: Returns true if the stack is empty, i.e., its size is zero; otherwise, it returns false.
  4. isFull: Returns true if the stack is full, i.e., its size has reached maximum allocated capacity; otherwise, it returns false.
  5. peek: Returns the top element present in the stack without modifying the stack.
  6. size: Returns the count of elements present in the stack.

> 

Stack Implementation using an array:

```ts
// A class to represent a stack
class Stack {
    private arr: number[];
    private top: number;
    private capacity: number;

    // Constructor to initialize the stack
    constructor(size = 10) {
        this.arr = new Array(size);
        this.capacity = size;
        this.top = -1;
    }

    // Utility function to add an element `x` to the stack
    push(x: number): void {
        if (this.isFull()) {
            throw new Error('Overflow\nProgram Terminated');
        }

        console.log(`Inserting ${x}`);
        this.arr[++this.top] = x;
    }

    // Utility function to pop a top element from the stack
    pop(): number {
        // check for stack underflow
        if (this.isEmpty()) {
            throw new Error('Underflow\nProgram Terminated');
        }

        console.log(`Removing ${this.peek()}`);

        // decrease stack size by 1 and (optionally) return the popped element
        return this.arr[this.top--];
    }

    // Utility function to return the top element of the stack
    peek(): number {
        if (this.isEmpty()) {
            throw new Error('Program Terminated');
        }
        return this.arr[this.top];
    }

    // Utility function to return the size of the stack
    size(): number {
        return this.top + 1;
    }

    // Utility function to check if the stack is empty or not
    isEmpty(): boolean {
        return this.top === -1;             // or return this.size() === 0;
    }

    // Utility function to check if the stack is full or not
    isFull(): boolean {
        return this.top === this.capacity - 1;  // or return this.size() === this.capacity;
    }
}

const pt = new Stack(3);

pt.push(1);
pt.push(2);

pt.pop();
pt.pop();

pt.push(3);

console.log(`The top element is ${pt.peek()}`);
console.log(`The stack size is ${pt.size()}`);

pt.pop();

if (pt.isEmpty()) {
    console.log('The stack is empty');
}
else {
    console.log('The stack is not empty');
}
```

**Output:** Inserting 1 Inserting 2 Removing 2 Removing 1 Inserting 3 The top element is 3 The stack size is 1 Removing 3 The stack is empty

The time complexity of all stack operations is constant, i.e., O(1).

Using the built-in array:

JavaScript arrays have `push` and `pop` operations with LIFO semantics like a [stack](https://cplusplus.com/reference/stack/stack/), and `unshift` and `shift` operations like a [list](https://cplusplus.com/reference/list/list/).

```ts
// Stack implementation in TypeScript using a plain array
const s: string[] = [];

s.push('A');    // Insert `A` into the stack
s.push('B');    // Insert `B` into the stack
s.push('C');    // Insert `C` into the stack
s.push('D');    // Insert `D` into the stack

// returns the total number of elements present in the stack
console.log(`The stack size is ${s.length}`);

// prints the top of the stack (`D`)
console.log(`The top element is ${s[s.length - 1]}`);

s.pop();        // removing the top element (`D`)
s.pop();        // removing the next top (`C`)

console.log(`The stack size is ${s.length}`);

// check if the stack is empty
if (s.length === 0) {
    console.log('The stack is empty');
}
else {
    console.log('The stack is not empty');
}
```

**Output:** The stack size is 4 The top element is D The stack size is 2 The stack is not empty

```ts
// Stack implementation in TypeScript using array front operations
const s: string[] = [];

s.unshift('A');     // Insert `A` into the stack
s.unshift('B');     // Insert `B` into the stack
s.unshift('C');     // Insert `C` into the stack
s.unshift('D');     // Insert `D` into the stack

// returns the total number of elements present in the stack
console.log(`The stack size is ${s.length}`);

// prints the top of the stack (`D`)
console.log(`The top element is ${s[0]}`);

s.shift();          // removing the top element (`D`)
s.shift();          // removing the next top (`C`)

console.log(`The stack size is ${s.length}`);

// check if the stack is empty
if (s.length === 0) {
    console.log('The stack is empty');
}
else {
    console.log('The stack is not empty');
}
```

**Output:** The top element is D The stack size is 2 The stack is not empty

**Also See:**

> [Stack Implementation in Java](https://techiedelight.com/stack-implementation-in-java/)

> [Stack Implementation in Python](https://techiedelight.com/stack-implementation-python/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 203

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
