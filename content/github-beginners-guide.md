# Beginner's Guide to GitHub

Jump into version control with GitHub so your team can collaborate smoothly during the hackathon. This guide covers the essentials: installation, setup, common workflows, and tips for staying in sync.

## 🛠 Prerequisites
- A GitHub account: sign up at [github.com/join](https://github.com/join)
- Git installed locally:
  - **Windows**: install [Git for Windows](https://git-scm.com/download/win) and select "Git from the command line and also from 3rd-party software" during setup
  - **macOS**: run `xcode-select --install` or install via [Homebrew](https://brew.sh/) with `brew install git`
  - **Linux**: install via your package manager, e.g. `sudo apt install git` or `sudo dnf install git`

## ⚙️ Configure Git
Set your identity so commits are attributed correctly:
```
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```
Check your settings anytime with `git config --list`.

## 📂 Creating or Cloning a Repository
### Create a New Repo on GitHub
1. Click the **+** icon (top-right) → **New repository**
2. Name the repo (e.g., `awesome-hackathon-project`)
3. Choose **Public** or **Private**
4. Optionally add a README and license
5. Click **Create repository**

### Clone to Your Machine
```
git clone https://github.com/username/awesome-hackathon-project.git
cd awesome-hackathon-project
```
Use `gh repo clone owner/repo` if you have the [GitHub CLI](https://cli.github.com/) installed.

## 🚀 Daily Workflow
1. **Pull latest changes**
   ```
   git pull origin main
   ```
2. **Create a branch for your work**
   ```
   git checkout -b feature/login-form
   ```
3. **Make changes** in your editor
4. **Stage files**
   ```
   git add src/Login.tsx package.json
   ```
5. **Commit with a clear message**
   ```
   git commit -m "Add login form UI"
   ```
6. **Push your branch**
   ```
   git push -u origin feature/login-form
   ```
7. **Open a Pull Request** on GitHub to merge into `main`

## 🔄 Handling Pull Requests
- Review code inline, leave comments, and request changes if needed
- Use **Draft PRs** for early feedback
- Require at least one teammate review before merging
- Merge via **Squash** to keep history tidy, or **Rebase** if you prefer linear commits

## 🤝 Resolving Merge Conflicts
1. Pull the latest `main`
2. Checkout your feature branch and rebase or merge `main`
3. Git will mark conflicting files—open them and choose which changes to keep
4. After fixing, run:
   ```
   git add <file>
   git rebase --continue   # or git commit if you merged
   git push --force-with-lease
   ```
5. Update your PR

## 🧪 Helpful Commands & Tips
- `git status` — snapshot of staged/unstaged files
- `git log --oneline --graph --decorate --all` — visual history
- `git stash` / `git stash pop` — temporarily save work before pulling
- `.gitignore` — exclude files such as `.env`, `node_modules`, or build artifacts
- Enable **branch protection** on `main` to prevent direct pushes
- Use **Issues** and **Projects** on GitHub to track tasks

## 🆘 Getting Help
- GitHub Docs: [docs.github.com](https://docs.github.com/)
- Git Cheat Sheet: [training.github.com/downloads/github-git-cheat-sheet](https://training.github.com/downloads/github-git-cheat-sheet)
- Ask mentors or teammates when you're stuck—resolving git issues together is faster than solo debugging!

Happy collaborating! 🤝
