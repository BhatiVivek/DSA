# Tree DFS: combine subtree results

## When to use it

Use this approach when a tree problem can be solved by asking the same question about each child and combining the answers. Examples include tree size, height, and balance checks.

## Core idea

Give each recursive call a precise contract: **what does this call return for the subtree rooted at this node?** Handle the empty subtree, solve the children, then combine their results.

## Example: tree size

Contract: `size(node)` returns the number of nodes in that subtree.

```js
function size(node) {
  if (node === null) return 0;

  const leftSize = size(node.left);
  const rightSize = size(node.right);
  return 1 + leftSize + rightSize;
}
```

Why it works: the subtree consists of its root and two disjoint child subtrees. Counting each child subtree and adding one counts every node exactly once.

## Dry run

For a root with two leaf children, each leaf receives 0 from its empty children and returns 1. The root then returns `1 + 1 + 1 = 3`.

## Complexity

For `n` nodes and height `h`, time is O(n) because each node is visited once. Auxiliary space is O(h + 1) for the recursion stack.

## Example: maximum depth

Contract: `maxDepth(root)` returns the number of **nodes** on the longest path from this root to a leaf. An empty subtree returns 0.

```js
function maxDepth(root) {
  if (root === null) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  return 1 + Math.max(leftDepth, rightDepth);
}
```

This is postorder reasoning: ask the left subtree, ask the right subtree, combine their answers, and return the result to the parent.

For the [five-node example](../topics/trees/fundamentals.md), leaves 4, 5, and 3 return 1. Node 2 returns 2, and root 1 returns 3. Time is O(n), and auxiliary stack space is O(h + 1).

This differs from **height in edges**: that same tree has height 2. To compute edge-based height with this recurrence, use -1 for the empty-subtree base case, so a leaf returns 0.

## Think recursively

Every subtree is itself a tree:

```text
             NODE
            /    \
      LEFT TREE  RIGHT TREE
```

Instead of memorizing separate algorithms, decide:

1. What should a call return for its subtree?
2. What is the answer for an empty subtree?
3. What information do I need from each child?
4. What must happen before, between, or after the child calls?

Before the child calls corresponds to preorder processing, between them to inorder, and after them to postorder. See [choosing a traversal](../topics/trees/traversals.md#choosing-a-traversal) for other recognition clues.

## Pitfalls

- Choose a base-case value that matches the return contract.
- Return child results instead of accidentally discarding them.
- Avoid recomputing the same subtree result inside each call; that can increase time complexity.
- Very deep recursion can exceed JavaScript's call-stack limit. An explicit stack is useful for deep trees.

## Recall prompt

How would the combine step and base case change if the result were height in edges instead of size?

## Related notes

- [Tree fundamentals](../topics/trees/fundamentals.md)
- [Traversals](../topics/trees/traversals.md)
- [Tree practice](../../practice/trees/README.md)
