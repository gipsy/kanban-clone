import React from "react"
import Link from "next/link"

export default function Home() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-3">
        <h1 className="h1-bold text-dark-200 dark:text-light-900">
          Welcome
        </h1>
        <p className="paragraph-regular text-dark-400 dark:text-light-700">
          This is a <strong className="text-dark-200 dark:text-light-900">pet project</strong>
          : a small Kanban-style board built to explore UI/UX patterns and how list ordering
          behaves when you drag items between columns.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="h3-semibold text-dark-200 dark:text-light-900">
          What it is for
        </h2>
        <p className="paragraph-regular text-dark-400 dark:text-light-700">
          The goal is not production feature completeness—it is to showcase a clear Kanban
          experience: columns, cards, search, and smooth reordering without reshuffling the
          whole list on every change.
        </p>
        <p className="paragraph-regular text-dark-400 dark:text-light-700">
          Open{" "}
          <Link
            href="/board"
            className="text-primary-500 underline-offset-4 hover:underline"
          >
            Boards
          </Link>{" "}
          from the sidebar to try it.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="h3-semibold text-dark-200 dark:text-light-900">
          Ordering: Lexorank
        </h2>
        <p className="paragraph-regular text-dark-400 dark:text-light-700">
          Card order within a column is maintained with <strong className="text-dark-200 dark:text-light-900">Lexorank</strong>
          : string ranks inserted between neighbors so moves are cheap and conflict-friendly
          compared to renumbering every row. The same idea is explained in this article:
        </p>
        <p className="paragraph-regular">
          <a
            href="https://medium.com/whisperarts/lexorank-what-are-they-and-how-to-use-them-for-efficient-list-sorting-a48fc4e7849f"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 underline-offset-4 hover:underline"
          >
            Lexorank — what are they and how to use them for efficient list sorting
          </a>
          <span className="text-dark-400 dark:text-light-600"> (Medium)</span>
        </p>
      </section>
    </article>
  )
}
