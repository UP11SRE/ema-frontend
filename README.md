### Analytics Frontend

This project is a frontend application for data analysis built with React and Vite.

### Please note: Due to server optimization, the backend response time might be slightly longer (up to 1 minute) on the initial application load. This is because the backend server spins down during periods of inactivity. Subsequent requests will experience faster response times.

## Features

# User Authentication:

- Users can register for an account.
- Users can log in with their existing credentials.
- Protected Dashboard:
- Only logged-in users can access the dashboard.

# Data Management:

- Upload: Upload CSV files for analysis.
- Query: Perform various queries on uploaded data:
- Exact match on string columns.
- Numerical operations (min, max, mean) on numerical columns.
- Less than or greater than comparisons on date columns.
- Results are displayed in a table format.
- Get All Data: Retrieve all data from the database and display it in a table format (useful for data validation).
- Frontend Framework: React Bootstrap provides a sleek and responsive design.

# Technologies

- Frontend: React, Vite
- UI Framework: React Bootstrap

# Getting Started

- Clone this repository.
- Install dependencies: npm install
- Run the development server: npm run develop
- This will start the application at http://localhost:5173/
  Deployment

## The application is currently deployed on Render at: https://analytics-frontend-mq5e.onrender.com

# Backend Integration:

- The Backend of this Frontend React App is hosted on: https://analytics-backend-odh4.onrender.com

* Backend code repo: https://github.com/UP11SRE/analytics_backend.git

## Querying Data

The Query functionality within the dashboard empowers you to perform various data analyses on your uploaded datasets. Here's a detailed guide on how to construct effective queries:

## For column names containing spaces (e.g., "Release date"), enter them using underscores instead (e.g., "Release_date"). This ensures proper query interpretation.

# Exact Matches

- To locate rows where a specific value exists in a particular column, employ the following format:
- Parameter: Column Name (e.g., AppID)
- Value: Value (e.g., 20220)
- Dropdown: Choose "Exact"
- Example: AppID 20220 exact - This query retrieves rows where the AppID column exactly matches the value 20220.

# String-Based Queries

- To perform queries based on textual data in string columns, follow these steps:
- Parameter Type: Column Name (e.g., Name)
- Value Type: Value (e.g., "Jolt") - Enclose the text in double quotes
- Dropdown: Choose "String"
- Example: Product Name "Jolt" string - This query returns rows where the Product Name column contains the exact term "Jolt" (case-sensitive).

# Aggregate Queries (min, max, mean)

- To compute aggregate values (minimum, maximum, or average) on numerical columns, utilize this format:
- Parameter Type: Choose "min", "max", or "mean" from the dropdown
- Value Type: Column Name (e.g., Price)
- Dropdown: Choose "Aggregate"
- Example: min Price aggregate - This query calculates the minimum value present in the Price column.

# Date-Based Queries (less than, greater than)

- Currently, date comparisons are only supported for date columns. Here's how to construct such queries:
- Parameter Type: Column Name (e.g., Release_date)
- Value Type: Date (e.g., "Oct 21, 2008")
- Dropdown: Choose "Less Than" or "Greater Than"
- Example: Release_date "Oct 21 2008" less than - This query retrieves rows where the Release_date column has values earlier than "Oct 21 2008".

## Important Notes:

- Currently supported aggregate functions are min, max, and mean.

- Date comparisons are restricted to date columns.

# By following these guidelines, you can effectively leverage the Query feature to extract valuable insights from your data.

## Project Overview Video

- For a visual explanation of this project, you can view a video walkthrough here: https://www.loom.com/share/5d9f22d342d04422b7387ccd65d783c8?sid=04541838-ed7f-4207-a9d9-7c07c6c54e60

## Contributing

Pull requests and contributions are welcome! Please follow standard coding practices and create issues for any bugs or feature requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
