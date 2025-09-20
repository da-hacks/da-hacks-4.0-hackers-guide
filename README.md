# DAHacks 4.0 Hacker's Guide

## How does this work?
This is essentially a fancy Markdown viewer. It reads each Markdown file in the `content/` directory in the format `page number-page name.md`; for example `01-welcome.md`. Then, it orders them into pages based on the page number, so it's in the style of an ebook.

## How do I run this?
This uses [pnpm](https://pnpm.io/) as the package manager.

Install packages:
```bash
pnpm i
```

Then run the development server:
```bash
pnpm dev
```
