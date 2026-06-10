# Implement two stacks in a single array

> Source: https://www.techiedelight.com/implement-two-stacks-single-array/

[Stack](https://www.techiedelight.com/Category/Stack/)

This post will discuss how to implement two [stacks](https://techiedelight.com/stack-implementation/) in a single array efficiently.

A simple solution would be to divide the array into two halves and allocate each half to implement two stacks. In other words, for an array `A` of size `n`, the solution would allocate `A[0, n/2]` memory for the first stack and `A[n/2+1, n-1]` memory for the second stack. The problem with this approach is that it doesn’t efficiently utilize the available space in the array. For instance, if one half of the array is full, any subsequent push operations would lead to a stack overflow exception even though the other half has space available.

To handle this, we can grow stacks from two extreme corners of the array. In other words, the first stack grows from the `0'th` index, and the second stack grows from the `(n-1)'th` index, where `n` is the array size. Both stacks can grow towards each other with no fixed capacity. Now overflow will only happen if both stacks are full (i.e., top elements of both stacks are adjacent), and there is no space left in the array to accommodate a new element.

Following is the TypeScript implementation of the idea:

```ts
class Stack {
    // Constructor
    capacity: number;
    A: number[];
    top1: number;
    top2: number;

    constructor(n: number) {
        this.capacity = n;
        this.A = new Array(n).fill(0);
        this.top1 = -1;
        this.top2 = n;
    }

    // Function to insert a given element into the first stack
    pushFirst(key: number): void {
        // check if the array is full
        if (this.top1 + 1 === this.top2) {
            console.log('Stack Overflow');
            process.exit(-1);
        }
        this.top1 = this.top1 + 1;
        this.A[this.top1] = key;
    }

    // Function to insert a given element into the second stack
    pushSecond(key: number): void {
        // check if the array is full
        if (this.top1 + 1 === this.top2) {
            console.log('Stack Overflow');
            process.exit(-1);
        }
        this.top2 = this.top2 - 1;
        this.A[this.top2] = key;
    }

    // Function to pop an element from the first stack
    popFirst(): number {
        // if no elements are left in the array
        if (this.top1 < 0) {
            console.log('Stack Underflow');
            process.exit(-1);
        }
        const top = this.A[this.top1];
        this.top1 = this.top1 - 1;
        return top;
    }

    // Function to pop an element from the second stack
    popSecond(): number {
        // if no elements are left in the array
        if (this.top2 >= this.capacity) {
            console.log('Stack Underflow');
            process.exit(-1);
        }
        const top = this.A[this.top2];
        this.top2 = this.top2 + 1;
        return top;
    }
}

const first = [1, 2, 3, 4, 5];
const second = [6, 7, 8, 9, 10];

const stack = new Stack(first.length + second.length);

for (const i of first) {
    stack.pushFirst(i);
}

for (const j of second) {
    stack.pushSecond(j);
}

console.log('Popping element from the first stack:', stack.popFirst());
console.log('Popping element from the second stack:', stack.popSecond());
```

**Output:** Popping element from the first stack: 5 Popping element from the second stack: 10

The time complexity of all stack operations is constant, i.e., O(1).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 190

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
