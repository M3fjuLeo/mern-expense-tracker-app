const xlsx = require("xlsx");
const Expense = require("../models/Expense.js");

exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, title, amount, date } = req.body;

    if (!title || !amount || !date)
      return res.status(400).json({ message: "All fields are required" });

    const newExpense = new Expense({
      userId,
      icon,
      title,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Server Error: ", error });
  }
};

exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error: ", error });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error: ", error });
  }
};

exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for excel
    const data = expense.map((item) => ({
      Title: item.title,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");

    const buffer = xlsx.write(wb, { bookType: "xlsx", type: "base64" });
    res.send(Buffer.from(buffer, "base64"));

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=income_details.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
