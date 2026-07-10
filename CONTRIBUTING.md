# Contributing to C0 Team Full-Stack Starter Suite

First off, thank you for considering contributing to C0 Team! It's people like you who make this tool great.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any violations to info@c0team.com.

## How Can I Contribute?

### Reporting Bugs

- **Check if the bug is already reported:** Search open issues.
- **Use the Bug Report template:** When creating a new issue, use the standard [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) and include as much detail as possible.

### Suggesting Enhancements

- **Check if the feature request is already suggested:** Search open issues.
- **Use the Feature Request template:** When creating a new issue, use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md).

### Pull Requests

1. Fork the repository and create your branch from `master`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes.
4. Make sure your code follows the style guidelines of this project.
5. Submit a pull request and fill out the [Pull Request Template](.github/pull_request_template.md).

## Local Development Setup

To set up the project locally for development:

1. Clone the repository.
2. Initialize and configure the backend (virtualenv, dependencies, migrations).
3. Initialize and configure the frontend (npm install).
4. Run both frontend and backend using the standard `run.bat` (on Windows) or starting them manually:
   - **Backend:** `cd backend && python manage.py runserver`
   - **Frontend:** `cd frontend && npm run dev`
