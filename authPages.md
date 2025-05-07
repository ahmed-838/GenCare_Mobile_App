# Working on Authentication Branch

This document provides a quick guide for team members working on the `feature/authentication` branch.

---

## 1. Clone the Repository and Switch to the Branch

### Steps:
1. Clone the repository if you haven't already:
   ```bash
   git clone https://github.com/ahmed-838/GenCare_Mobile.git
   cd GenCare_Mobile
   ```

2. Pull the latest changes from the main branch:
   ```bash
   git pull origin main
   ```

3. Switch to the `feature/authentication` branch:
   ```bash
   git checkout feature/authentication
   ```

---

## 2. Add Your Code

1. Implement your part of the authentication feature in the respective files.
2. Follow the folder structure:
   - **(auth)** (e.g., `Login`, `Signup`) should go under `App/`.

---

## 3. Commit and Push Changes

### Steps:
1. Add your changes:
   ```bash
   git add .
   ```

2. Commit with a meaningful message:
   ```bash
   git commit -m "Add <specific-feature> to authentication"
   ```

3. Push your changes to the branch:
   ```bash
   git push origin feature/authentication
   ```

---

## 4. Create a Pull Request
1. Once your work is complete, go to the [GitHub Repository](https://github.com/ahmed-838/GenCare_Mobile).
2. Navigate to the "Pull Requests" tab and click **New Pull Request**.
3. Set the base branch to `main` and compare it with `feature/authentication`.
4. Add a clear description of the changes you made and submit the pull request.

---

## 5. General Guidelines

- **Test your changes**: Ensure everything works correctly before pushing.
- **Follow naming conventions**: Use clear, descriptive names for variables, functions, and files.
- **Communicate**: If you encounter any issues, share them in the team group.

---

For any questions or issues, reach out to the team lead.
