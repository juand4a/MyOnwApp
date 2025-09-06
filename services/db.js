// db.js
import { openDatabaseAsync } from 'expo-sqlite';

const dbPromise = openDatabaseAsync('miAppSQLite.db');

// Helper para ISO date
const nowISO = () => new Date().toISOString();

const init = async () => {
  const db = await dbPromise;

  await db.execAsync(`
    PRAGMA foreign_keys = ON;
    PRAGMA journal_mode = WAL;
  `);

  await db.withTransactionAsync(async () => {
    //     await db.runAsync(`
    //   ALTER TABLE users ADD COLUMN salary INTEGER;
    // `);
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT UNIQUE,
        salary INTEGER,
        created_at TEXT
      );
    `);

    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name TEXT,
        type TEXT,
        created_at TEXT
      );
    `);

    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        amount REAL,
        description TEXT,
        category_id INTEGER,
        date TEXT,
        user_id INTEGER,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS incomes (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        amount REAL,
        description TEXT,
        category_id INTEGER,
        date TEXT,
        user_id INTEGER,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS savings (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        amount REAL,
        description TEXT,
        date TEXT,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name TEXT,
        amount REAL,
        start_date TEXT,
        end_date TEXT,
        user_id INTEGER,
        category_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE
      );
    `);

    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS transfers (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        amount REAL,
        from_account TEXT,
        to_account TEXT,
        date TEXT,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  });
};

// ========================== CRUD ==========================

// Usuarios
const insertUser = async (name, email, password,salary) => {
  const db = await dbPromise;
  const res = await db.runAsync(
    `INSERT INTO users (name, email, password, salary, created_at) VALUES (?, ?, ?, ?, ?);`,
    [name, email, password, salary, nowISO()]
  );
  return { id: res.lastInsertRowId };
};

const getAllUsers = async () => {
  const db = await dbPromise;
  return db.getAllAsync(`SELECT * FROM users;`);
};
const getUserByCredentials = async (email, password) => {
  const db = await dbPromise;
  return db.getFirstAsync(
    `SELECT * FROM users WHERE email = ? AND password = ?;`,
    [email, password]
  );
};

const updateUser = async (id, name, email, password) => {
  const db = await dbPromise;
  const res = await db.runAsync(
    `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?;`,
    [name, email, password, id]
  );
  return { changes: res.changes };
};

const deleteUser = async (id) => {
  const db = await dbPromise;
  const res = await db.runAsync(`DELETE FROM users WHERE id = ?;`, [id]);
  return { changes: res.changes };
};

// Categorías
const insertCategory = async (name, type) => {
  const db = await dbPromise;
  const res = await db.runAsync(
    `INSERT INTO categories (name, type, created_at) VALUES (?, ?, ?);`,
    [name, type, nowISO()]
  );
  return { id: res.lastInsertRowId };
};

const getAllCategories = async () => {
  const db = await dbPromise;
  return db.getAllAsync(`SELECT * FROM categories;`);
};

const updateCategory = async (id, name, type) => {
  const db = await dbPromise;
  const res = await db.runAsync(
    `UPDATE categories SET name = ?, type = ? WHERE id = ?;`,
    [name, type, id]
  );
  return { changes: res.changes };
};

const deleteCategory = async (id) => {
  const db = await dbPromise;
  const res = await db.runAsync(`DELETE FROM categories WHERE id = ?;`, [id]);
  return { changes: res.changes };
};

// Gastos
const insertExpense = async (amount, description, category_id, user_id) => {
  const db = await dbPromise;
  const res = await db.runAsync(
    `INSERT INTO expenses (amount, description, category_id, date, user_id)
     VALUES (?, ?, ?, ?, ?);`,
    [amount, description, category_id, nowISO(), user_id]
  );
  return { id: res.lastInsertRowId };
};

const getAllExpenses = async () => {
  const db = await dbPromise;
  return db.getAllAsync(`SELECT * FROM expenses;`);
};

const updateExpense = async (id, amount, description, category_id, user_id) => {
  const db = await dbPromise;
  const res = await db.runAsync(
    `UPDATE expenses SET amount = ?, description = ?, category_id = ?, user_id = ? WHERE id = ?;`,
    [amount, description, category_id, user_id, id]
  );
  return { changes: res.changes };
};

const deleteExpense = async (id) => {
  const db = await dbPromise;
  const res = await db.runAsync(`DELETE FROM expenses WHERE id = ?;`, [id]);
  return { changes: res.changes };
};

// Ingresos
const insertIncome = async (amount, description, category_id, user_id) => {
  const db = await dbPromise;
  const res = await db.runAsync(
    `INSERT INTO incomes (amount, description, category_id, date, user_id)
     VALUES (?, ?, ?, ?, ?);`,
    [amount, description, category_id, nowISO(), user_id]
  );
  return { id: res.lastInsertRowId };
};

const getAllIncomes = async () => {
  const db = await dbPromise;
  return db.getAllAsync(`SELECT * FROM incomes;`);
};

const updateIncome = async (id, amount, description, category_id, user_id) => {
  const db = await dbPromise;
  const res = await db.runAsync(
    `UPDATE incomes SET amount = ?, description = ?, category_id = ?, user_id = ? WHERE id = ?;`,
    [amount, description, category_id, user_id, id]
  );
  return { changes: res.changes };
};

const deleteIncome = async (id) => {
  const db = await dbPromise;
  const res = await db.runAsync(`DELETE FROM incomes WHERE id = ?;`, [id]);
  return { changes: res.changes };
};

// Ahorros
const insertSavings = async (amount, description, user_id) => {
  const db = await dbPromise;
  const res = await db.runAsync(
    `INSERT INTO savings (amount, description, date, user_id)
     VALUES (?, ?, ?, ?);`,
    [amount, description, nowISO(), user_id]
  );
  return { id: res.lastInsertRowId };
};

const getAllSavings = async () => {
  const db = await dbPromise;
  return db.getAllAsync(`SELECT * FROM savings;`);
};

const updateSavings = async (id, amount, description, user_id) => {
  const db = await dbPromise;
  const res = await db.runAsync(
    `UPDATE savings SET amount = ?, description = ?, user_id = ? WHERE id = ?;`,
    [amount, description, user_id, id]
  );
  return { changes: res.changes };
};

const deleteSavings = async (id) => {
  const db = await dbPromise;
  const res = await db.runAsync(`DELETE FROM savings WHERE id = ?;`, [id]);
  return { changes: res.changes };
};

// Suscripciones
const insertSubscription = async (name, amount, start_date, end_date, user_id, category_id) => {
  const db = await dbPromise;
  const res = await db.runAsync(
    `INSERT INTO subscriptions (name, amount, start_date, end_date, user_id, category_id)
     VALUES (?, ?, ?, ?, ?, ?);`,
    [name, amount, start_date, end_date, user_id, category_id]
  );
  return { id: res.lastInsertRowId };
};

const getAllSubscriptions = async () => {
  const db = await dbPromise;
  return db.getAllAsync(`SELECT * FROM subscriptions;`);
};

const updateSubscription = async (id, name, amount, start_date, end_date, user_id, category_id) => {
  const db = await dbPromise;
  const res = await db.runAsync(
    `UPDATE subscriptions
       SET name = ?, amount = ?, start_date = ?, end_date = ?, user_id = ?, category_id = ?
     WHERE id = ?;`,
    [name, amount, start_date, end_date, user_id, category_id, id]
  );
  return { changes: res.changes };
};

const deleteSubscription = async (id) => {
  const db = await dbPromise;
  const res = await db.runAsync(`DELETE FROM subscriptions WHERE id = ?;`, [id]);
  return { changes: res.changes };
};

// Transferencias
const insertTransfer = async (amount, from_account, to_account, user_id) => {
  const db = await dbPromise;
  const res = await db.runAsync(
    `INSERT INTO transfers (amount, from_account, to_account, date, user_id)
     VALUES (?, ?, ?, ?, ?);`,
    [amount, from_account, to_account, nowISO(), user_id]
  );
  return { id: res.lastInsertRowId };
};

const getAllTransfers = async () => {
  const db = await dbPromise;
  return db.getAllAsync(`SELECT * FROM transfers;`);
};

const updateTransfer = async (id, amount, from_account, to_account, user_id) => {
  const db = await dbPromise;
  const res = await db.runAsync(
    `UPDATE transfers
       SET amount = ?, from_account = ?, to_account = ?, user_id = ?
     WHERE id = ?;`,
    [amount, from_account, to_account, user_id, id]
  );
  return { changes: res.changes };
};

const deleteTransfer = async (id) => {
  const db = await dbPromise;
  const res = await db.runAsync(`DELETE FROM transfers WHERE id = ?;`, [id]);
  return { changes: res.changes };
};

// Exporta todo
export default {
  init,
  insertUser,
  getAllUsers,
  getUserByCredentials,
  updateUser,
  deleteUser,
  insertCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  insertExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  insertIncome,
  getAllIncomes,
  updateIncome,
  deleteIncome,
  insertSavings,
  getAllSavings,
  updateSavings,
  deleteSavings,
  insertSubscription,
  getAllSubscriptions,
  updateSubscription,
  deleteSubscription,
  insertTransfer,
  getAllTransfers,
  updateTransfer,
  deleteTransfer,
};
