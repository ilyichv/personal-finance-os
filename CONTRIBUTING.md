# Contributing

Thanks for your interest in contributing to personal-finance-os. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [@ilyichdev](https://twitter.com/ilyichdev).

## About this repository

- We use [bun](https://bun.sh/) for development.

## Structure

This repository is structured as a standard Next.js project that uses app router.

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/personal-finance-os.git
```

### Navigate to project directory

```bash
cd personal-finance-os
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
bun install
```

### Configure environment variables
Follow the instructions in [README.md](https://github.com/ilyichv/personal-finance-os/README.md) to configure environment variables.

### Run the project

```bash
bun dev
```

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category: message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat: add new prop to the avatar component`

If you are interested in the detailed specification you can visit
https://www.conventionalcommits.org/ or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Requests for new features

If you have a request for a new feature, please open a discussion on GitHub. We'll be happy to help you out.
