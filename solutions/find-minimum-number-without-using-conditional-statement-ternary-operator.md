# Find minimum number without using conditional statement or ternary operator

> Source: https://www.techiedelight.com/find-minimum-number-without-using-conditional-statement-ternary-operator/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

Given two integers, find the minimum number between them without using any conditional statement (or ternary operator).

## Approach 1

We can use `(a > b) × b + (b > a) × a` expression to find minimum number. This expression works as explained below.

**Case 1:** When a is greater (a > b) × b + (b > a) × a = 1 × b + 0 × a = b **Case 2:** When b is greater (a > b) × b + (b > a) × a = 0 × b + 1 × a = a

The following TypeScript program demonstrates it:

```ts
function minimum(a: number, b: number): number {
    const min = Number(a > b) * b + Number(b > a) * a;
    return min;
}

console.log(`The minimum number is ${minimum(-8, 9)}`);
```

## Approach 2: Short–circuiting in Boolean expressions

We can take advantage of [short-circuiting](https://en.wikipedia.org/wiki/Short-circuit_evaluation) in Boolean expressions. In boolean operations such as `AND`, `y` is evaluated only if `x` is true for `x && y`; `y` is not evaluated if `x` is false because the whole expression would be false, which can be derived without evaluating `y`.

We can apply the above principle to the following code. Initially, `min` is `a`. Now if `min > b` is true, i.e., `b` is less than `a`, the second subexpression `min = b` will be evaluated and `min` will set to `b`; otherwise, if `min > b` is false, the second subexpression will not be evaluated and `min` will remain equal to `a`.

```ts
function minimum(a: number, b: number): number {
    // initialize `min` with `a`
    let min = a;

    // set `min` to `b` if and only if `min` is more than `b`
    (min > b) && (min = b);

    return min;
}

console.log(`The minimum number is ${minimum(-8, 9)}`);
```

## Approach 3: Using repeated subtraction

We can find the minimum of two integers by doing repeated subtraction until any number becomes zero. The total number of times we do removal will be the minimum number.

This approach is demonstrated below in TypeScript. This solution won’t work on negative numbers.

```ts
function minimum(a: number, b: number): number {
    let min = 0;
    let [x, y] = [a, b];
    while (x !== 0 && y !== 0) {
        x--;
        y--;
        ++min;
    }
    return min;
}

console.log(`The minimum number is ${minimum(8, 9)}`);
```
