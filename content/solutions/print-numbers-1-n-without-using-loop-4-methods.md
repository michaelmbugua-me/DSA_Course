# Print all numbers between 1 to N without using any loop | 4 methods

> Source: https://www.techiedelight.com/print-numbers-1-n-without-using-loop-4-methods/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Write a program to print all numbers between 1 and `N` without using a loop.

## Method 1: Using static variable in recursive main

The idea is to call the `main()` function recursively, and with each call, print the next element from the series. To store information about the previous element printed, we use a static variable (Note that a global variable will also work fine).

The following TypeScript program demonstrates it:

```ts
const N = 100;

// emulate a static variable in the recursive main using a closure
const main = (() => {
    let i = 1;
    return function main(): void {
        if (i <= N && process.stdout.write(`${i++} `)) {
            main();
        }
    };
})();

main();
```

OR

```ts
const N = 100;

// emulate a static variable in the recursive main using a closure
const main = (() => {
    let i = 0;
    return function main(): void {
        if (i++ < N) {
            process.stdout.write(`${i} `);
            main();
        }
    };
})();

main();
```

## Method 2: Using Recursion by implementing a separate method

```ts
const N = 100;

function print(n: number): void {
    if (n <= 0) {
        return;
    }

    print(n - 1);
    process.stdout.write(`${n} `);
}

print(N);
```

OR

```ts
const N = 100;

// Short–circuiting (not a conditional statement)
const print = (n: number): void =>
    n > 0 && (print(n - 1), process.stdout.write(`${n} `));

print(N);
```

## Method 3: Using a MACRO

```ts
// TypeScript has no macros — emulate the 10×10 unrolled macro expansion
// with nested function calls (no loop keywords used)
const cout = (i: { v: number }): void => {
    process.stdout.write(`${i.v++} `);
};

const LEVEL = (i: { v: number }): void => {
    cout(i); cout(i); cout(i); cout(i); cout(i);
    cout(i); cout(i); cout(i); cout(i); cout(i);
};

const PRINT = (i: { v: number }): void => {
    LEVEL(i); LEVEL(i); LEVEL(i); LEVEL(i); LEVEL(i);
    LEVEL(i); LEVEL(i); LEVEL(i); LEVEL(i); LEVEL(i);
};

const i = { v: 1 };

// prints numbers from 1 to 100
PRINT(i);
```

## Method 4: Without Recursion using struct/class with static field

```ts
const N = 100;

class X {
    static i = 0;
    constructor() {
        console.log(++X.i);
    }
}

// instantiate N objects, each printing the next number
const ob = Array.from({ length: N }, () => new X());
```

We can also use the class replacing struct.

```ts
const N = 100;

class X {
    static i = 0;
    constructor() {
        console.log(++X.i);
    }
}

// instantiate N objects, each printing the next number
const ob = Array.from({ length: N }, () => new X());
```

**Exercise:** Extend method 3 to print numbers from 1 to 1000

**References:** <https://stackoverflow.com/questions/4568645/printing-1-to-1000-without-loop-or-conditionals/>

Also See:

> [Print all numbers between 1 to N without using a semicolon](https://www.techiedelight.com/print-numbers-1-n-without-using-semicolon/ "Print all numbers between 1 to N without using a semicolon")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.51/5. Vote count: 65

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
