# Pattern 16: Backtracking (bonus)

> Extension to the 14 Patterns article — backtracking is the engine behind "try everything" problems.

## Overview

Systematically build candidate solutions one choice at a time; at each step, **choose → explore → un-choose**. When a partial solution violates a constraint, abandon that branch (prune) and backtrack to try the next choice. It's DFS over the space of partial solutions, with the key insight that pruning invalid branches early is what makes it tractable.

## Recognition cues

- "Print/find **all** solutions", "all possible ways/configurations"
- Constraints accumulate as you build (N-Queens, Sudoku, permutations with restrictions)
- Choice tree where making and undoing a choice is cheap
- Classic cast: N-Queens, Sudoku, word search, Hamiltonian paths, Knight's tour, generating subsets/permutations

## Template (Python)

```python3
def backtrack(path, choices):
    if is_complete(path):
        solutions.append(path[:])    # copy!
        return
    for choice in choices:
        if not is_valid(choice, path):
            continue                 # prune
        path.append(choice)          # choose
        backtrack(path, next_choices(choice))  # explore
        path.pop()                   # un-choose (backtrack)
```

## Complexity

- Time: exponential by nature — O(branching^depth); pruning is what saves you
- Space: O(depth) for the recursion stack + path

## Common pitfalls

- Forgetting to copy the path when recording a solution (`path[:]`)
- Not restoring mutable state after recursion (visited flags, board cells)
- Missing pruning opportunities → timeout (e.g. check placement validity *before* recursing, not after)
- Confusing with DP: if you only need the count/best and states repeat, memoize; if you need all distinct solutions, backtrack

## Practice problems in this repo

- [Print all possible solutions to N Queens Problem](../solutions/print-possible-solutions-n-queens-problem.md)
- [Chess Knight Problem — Find Shortest path from source to destination](../solutions/chess-knight-problem-find-shortest-path-source-destination.md)
- [Print all Possible Knight's Tours in a chessboard](../solutions/print-possible-knights-tours-chessboard.md)
- [Find Shortest Path in Maze](../solutions/find-shortest-path-in-maze.md)
- [Find Longest Possible Route in a Matrix](../solutions/find-longest-possible-route-matrix.md)
- [Magnet Puzzle](../solutions/magnet-puzzle.md)
- [Tower of Hanoi Problem](../solutions/tower-of-hanoi-problem.md)
- [Generate list of possible words from a character matrix](../solutions/generate-list-of-possible-words-from-a-character-matrix.md) — word search
- [Find all binary strings that can be formed from given wildcard pattern](../solutions/find-binary-strings-can-formed-given-wildcard-pattern.md)
- [Find all N-digit strictly increasing numbers (Bottom-Up and Top-Down Approach)](../solutions/find-n-digit-strictly-increasing-numbers-bottom-top-approach.md)
- [Generate binary numbers between 1 to N](../solutions/generate-binary-numbers-1-n.md)
