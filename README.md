# FlowFinance - Personal Finance Dashboard

FlowFinance is a premium, beautifully crafted personal finance application designed to help individuals and administrators track their financial health effortlessly.

---

## 🏗️ Overview of Approach

The architecture and design philosophy of FlowFinance focuses heavily on delivering a fast, locally responsive, and aesthetically pleasing User Experience (UX).

1. **State-Driven Modular UX**: Built heavily utilizing React functional components (`Sidebar`, `Header`, `Dashboard`, `Transactions`), providing a clear separation of concerns. The local state ensures that UI interactions are instantaneous.
2. **"Glassmorphic" Dark Theme**: Powered entirely by Tailwind CSS, the UI utilizes custom color tokens and deep slate backgrounds tailored to provide a professional, easy-on-the-eyes interface without relying on heavy external styling libraries.
3. **Data Synchronicity**: The frontend interacts directly with a Node/Express REST API on `localhost:5000` to fetch and upload transaction capabilities. To ensure high availability, the app intelligently falls back to and merges with `localStorage` payloads.
4. **Micro-Interactions Focus**: Integrated `Animate.css` to orchestrate fluid entry and staggering animations. This creates a deeply polished feel across dashboards and list loads rather than static, jarring page swaps.

---

## ✨ Explanation of Features

FlowFinance comes packed with an array of built-in tooling meant to simplify financial tracking:

- **Role-Based Viewering (Admin / Viewer)**
  A quick-switch toggle allows the user to demo the perspective of an administrator versus a standard viewer. *Admins* have full mutation rights to add and delete specific row items, while *Viewers* get a strictly analytical UI to observe charts and stats.
  
- **Visual Analytics Dashboard**
  Built with Recharts, the dashboard includes:
  - A responsive **Balance Trend LineChart**.
  - A categorical **Spending Breakdown PieChart**.
  - Dynamic **Insights Tracking** predicting your highest spending category and mapping total income over a dynamic savings goal progress bar.

- **Transaction Management & Filtering**
  The Transaction portal provides a fully searchable list. Users can effortlessly query by typing descriptions, categories, or transaction types (Income vs Expense) directly into the search bar. Amounts are parsed into localized number formatting (such as `en-IN` standards).

- **CSV Export & Portability**
  All active (or filtered) transactional data currently inside the application's state can be safely exported straight to your machine as a `transactions.csv` file using `react-csv`.

- **Alerts & Visual Feedback**
  To prevent "silent" failures or unseen success events, `react-toastify` fires concise, floating toast notifications when transactions are successfully logged to the server or during potential fetch errors.

---

## 🚀 Setup Instructions

Follow these steps to get the project running seamlessly on your local hardware.

### Prerequisites
- Install **Node.js** Environment (v16.x or newer is recommended).
- Have your backend server code running locally on `http://localhost:5000` so the `axios` API calls can properly resolve.

### 1. Clone & Navigate
Navigate to your project folder using your terminal:
```bash
git clone <your-repository-url>
cd test
```

### 2. Install Dependencies
Run the built-in package manager to fetch `react`, `vite`, `tailwindcss`, `recharts`, `animate.css`, and other vital libraries.
```bash
npm install
```

### 3. Start the Development Server
Launch the super-fast Vite server.
```bash
npm run dev
```

### 4. Viewing the Build
Once compiled (which usually takes under a second), open your browser and navigate to:
```
http://localhost:5173
```
*Port might differ depending on availability. Vite will mention the active URL in your terminal console.*

Enjoy tracking your finances!
