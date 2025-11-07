# Expense Tracker App

A web application for managing personal finances. It allows users to add, review, and analyze both income and expenses. With clear charts and summaries, users can track financial habits and make better budgeting decisions.

---

## ✨ Features

- User authentication (Sign Up / Login)
- Add income and expense transactions
- View recent transactions
- Dashboard with:
  - Current balance
  - Total income
  - Total expenses
- Data visualization:
  - Bar chart (income)
  - Line chart (expenses)
  - Pie chart (balance overview)
- Export data to `.xlsx`
- Responsive UI

---

## 🧰 Tech Stack

| Technology / Library  | Purpose                |
| --------------------- | ---------------------- |
| React                 | UI components          |
| React Router          | Navigation             |
| @tanstack/react-query | Server state & caching |
| Tailwind CSS          | Styling                |
| Axios                 | HTTP requests          |
| Recharts              | Data visualization     |
| React Hot Toast       | Notifications          |
| Moment.js             | Date formatting        |
| xlsx                  | Exporting to Excel     |

---

## 📦 Installation

```bash
git clone https://github.com/your-repo-name.git
cd expense-tracker-app
npm install
npm run dev
```

🔒 Authentication

The app uses JWT Authentication.
After signing in, the token is stored in localStorage.
User data and state updates are handled using UserContext + React Query.
