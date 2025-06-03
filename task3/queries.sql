-- Create the orders table
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);

-- Insert sample data
INSERT INTO orders (customer, amount, order_date) VALUES
('Alice', 5000, '2024-03-01'),
('Bob', 8000, '2024-03-05'),
('Alice', 3000, '2024-03-15'),
('Charlie', 7000, '2024-02-20'),
('Alice', 10000, '2024-02-28'),
('Bob', 4000, '2024-02-10'),
('Charlie', 9000, '2024-03-22'),
('Alice', 2000, '2024-03-30');

-- Task 1: Calculate total sales volume for March 2024
-- Expected result: $27,000 (5000 + 8000 + 3000 + 9000 + 2000)
SELECT SUM(amount) as total_sales
FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-03';

-- Task 2: Find the customer who spent the most overall
-- Expected result: Alice ($20,000) - Sum of orders: 5000 + 3000 + 10000 + 2000
SELECT 
    customer,
    SUM(amount) as total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- Task 3: Calculate the average order value
-- Expected result: $6,000 (Total $48,000 / 8 orders)
SELECT ROUND(AVG(amount), 2) as average_order_value
FROM orders;

-- Bonus: All results in one query
SELECT 
    (SELECT SUM(amount) 
     FROM orders 
     WHERE strftime('%Y-%m', order_date) = '2024-03') as march_sales,
    (SELECT customer || ' (' || SUM(amount) || ')' 
     FROM orders 
     GROUP BY customer 
     ORDER BY SUM(amount) DESC 
     LIMIT 1) as top_customer,
    (SELECT ROUND(AVG(amount), 2) 
     FROM orders) as avg_order_value; 