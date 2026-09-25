# Solution conversion spec: Python/Java/C/C++ → TypeScript

You are converting solution files in this repo so every code sample is TypeScript and all other
languages are removed. Follow these rules exactly.

## What to do per file

1. Each file is a Techie Delight solution page. It typically contains several `## Approach N`
   sections. Each approach has code blocks tagged ```cpp, ```java, ```python3 (sometimes ```c,
   sometimes ```std — treat ```std like ```cpp).
2. For each approach, produce ONE TypeScript implementation and delete the other language blocks
   (including the bare `##` separator lines between them and the "**Output:**" line may stay —
   keep it directly after the code block).
3. Pick the source implementation to convert in this order of preference:
   **python3 → java → cpp → c → std**. Convert that one faithfully to TypeScript.
4. Rewrite any prose sentence that references the removed languages. Typical fixes:
   - "Following is the C++, Java, and Python implementation of the idea:" →
     "Following is a TypeScript implementation of the idea:"
   - "Here's a C/Java/Python program that demonstrates it:" → "Here's a TypeScript program that demonstrates it:"
   - Adjust any other "C++/Java/Python" phrasing to be TypeScript-only. Never leave a sentence
     claiming code in a language that is no longer present.

## TypeScript conversion rules

- Idiomatic TS: `const`/`let`, arrow functions or plain functions, template literals instead of
  string concat, `===`. Keep all comments from the source.
- Signatures typed: `(s: string, low: number, high: number): boolean`.
- Java/C++ idioms → TS:
  - `str.charAt(i)` → `s[i]`; `str.substring(...)` → `slice(...)`; `int[] arr` → `arr: number[]`
  - `System.out.println(x)` / `cout << x` → `console.log(x)`
  - `static void main` demos → top-level demo code (`const ... = ...; if (...) console.log(...)`)
  - `boolean` → `boolean`, `true/false` lower-case
  - `String[] args`, `#include`, `using namespace std`, `return 0` are dropped
  - `null` checks keep as `if (s === null)` when the algorithm needs it
- Data structures used across solutions — define them locally at the top of the block only if the
  code uses them:
  - Linked list: `class ListNode { constructor(public val: number, public next: ListNode | null = null) {} }`
  - Binary tree: `class TreeNode { constructor(public val: number, public left: TreeNode | null = null, public right: TreeNode | null = null) {} }`
  - Graph: adjacency `Map<number, number[]>` or `number[][]` — no fancy classes needed.
  - Keep these definitions compact (they are demo scaffolding, not the solution).
- Stacks/queues/priority queues: plain `number[]` arrays with `push/pop/shift`; for heaps, add a
  short comment `// min-heap assumed (JS has no builtin heap)` and keep heap ops as plain array ops
  with a comment, or a tiny inline helper if the algorithm demands real heap behavior. Never import
  libraries.
- If the source has multiple demo `main` blocks per approach, keep just the essential demo lines.
- If the Python uses recursion/none of Java's verbosity, the TS block will be short — that's fine.

## Do not touch

- Headings (`#` title, `> Source:` line, category links), problem description, "For example"
  sections, `## Approach N` headings, "**Output:**" lines, complexity notes, links in prose.
- Do NOT renumber or merge approaches.

## Untagged code fences

Many files use bare ``` fences for actual C/C++/Java/Python code (no language tag). These ARE code
and MUST be converted to ```ts exactly like tagged blocks. How to tell code from non-code text:
code fences contain things like `#include`, `int main()`, `def x(...)`, `class ...`, `{ }`,
`printf`, `System.out.println`, `cout`. Non-code text (leave alone) is plain prose, lists of
rules, or output dumps. When in doubt, read the surrounding prose — if it says "implementation",
"demonstrates", "program", it's code.

## Verify after each file

- No ```cpp / ```java / ```c / ```python3 / ```std fences remain in the file.
- Every remaining fence is ```ts (except plain ``` fences used for non-code text like output or
  decision flows — leave those).
- The file still has the same approaches count as before.
