# DSA
This Repository will contain only Data structure related Programs.

## StarPattern - Multiple programs to solve star patterns.
## Count Digits -

## DSA learning notes

This repository also contains my topic-wise notes, reusable problem-solving patterns, and practice reflections. Current focus: **Trees**.

### Start here

- [Topics](notes/topics/README.md) — concepts and topic roadmaps.
- [Trees](notes/topics/trees/README.md) — my current learning checklist.
- [Patterns](notes/patterns/README.md) — approaches that apply across problems.
- [Practice log](practice/README.md) — problems, mistakes, and revision status.
- [Templates](templates/README.md) — copy these when adding notes.

### Folder structure

```text
notes/
  topics/
    README.md
    trees/
      README.md          # Learning roadmap and links
      fundamentals.md    # Definitions and core concepts
      types-of-trees.md  # Tree categories and their properties
      traversals.md      # DFS and BFS notes
  patterns/
    README.md
    tree-dfs.md          # Reusable recursive approach
practice/
  README.md              # Practice log
  trees/
    README.md            # Tree problem notes and solution conventions
templates/
  README.md
  topic.md
  pattern.md
  problem.md
```

### How I use this repository

1. Learn a topic and write the explanation in my own words under `notes/topics/<topic>/`.
2. When an approach repeats, capture it under `notes/patterns/` and link it from the topic.
3. For each problem, copy `templates/problem.md` into `practice/<topic>/<problem-name>.md`. Keep runnable solutions beside the note, for example `maximum-depth.js`.
4. Record the problem in the practice log, including mistakes and a revision date.
5. Revisit it without looking at the solution before marking it revised.

Use lowercase, hyphen-separated names such as `binary-search.md`. Add folders as I learn new topics; start with Trees.

### Existing programs

- [StarPattern.js](StarPattern.js) — multiple programs to solve star patterns.
- [CountDigit.js](CountDigit.js) — number and digit exercises.
