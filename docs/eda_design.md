### Components for Displaying EDA Results

When designing your pages, consider these elements to present your EDA findings clearly and interactively:

1.  **Dashboard Layout:**
    *   **Overview Section:** A summary of the dataset (e.g., number of rows, columns, data types, missing values percentage).
    *   **Interactive Filters/Selectors:** Allow users to filter data by features, select specific variables for detailed analysis, or choose different plot types.
    *   **Navigation:** Clear links or tabs to different sections of the EDA (e.g., "Univariate Analysis," "Bivariate Analysis," "Feature Engineering Insights").

2.  **Data Summaries:**
    *   **Descriptive Statistics Tables:** For numerical and categorical features.
    *   **Missing Value Summary:** A table or plot showing missing percentages per column.
    *   **Duplicate Row/Column Count:** Indicate presence of duplicates.

3.  **Visualizations:**
    *   **Interactive Plots:** Enable zooming, panning, and hovering for detailed information.
    *   **Facet/Grid Plots:** For comparing distributions or relationships across different categories.
    *   **Heatmaps:** Especially for correlation matrices.
    *   **Pair Plots:** To visualize relationships between multiple variables.

4.  **Narrative/Insights:**
    *   **Text Descriptions:** Explain what each plot or table shows and highlight key observations.
    *   **Key Findings/Actionable Insights:** Summarize important discoveries that might influence feature engineering, model selection, or data cleaning.

5.  **Data Quality Reports:**
    *   **Outlier Detection Results:** List potential outliers and their impact.
    *   **Inconsistent Data Entries:** Highlight issues like varying spellings for the same category.

### Common Analysis and Plots for EDA

Here's a breakdown of common analyses and plots, categorized for clarity:

#### 1. Univariate Analysis (Analyzing individual features)

*   **For Numerical Features:**
    *   **Descriptive Statistics:** Mean, median, mode, standard deviation, variance, min, max, quartiles (25th, 50th, 75th percentile), skewness, kurtosis.
    *   **Plots:**
        *   **Histograms:** To visualize the distribution of data.
        *   **Box Plots (Box-and-Whisker Plots):** To show the distribution, central tendency, spread, and potential outliers.
        *   **Density Plots (KDE Plots):** Smoothed version of histograms, better for comparing distributions.

*   **For Categorical Features:**
    *   **Frequency Tables:** Count of occurrences for each category.
    *   **Plots:**
        *   **Bar Plots (Count Plots):** To show the frequency of each category.
        *   **Pie Charts/Donut Charts:** (Use sparingly, as bar plots are often better for comparison) To show proportions of categories.

*   **For Date/Time Features:**
    *   **Plots:**
        *   **Time Series Plots:** To observe trends, seasonality, and cycles over time.

#### 2. Bivariate Analysis (Analyzing relationships between two features)

*   **Numerical vs. Numerical:**
    *   **Analysis:**
        *   **Correlation:** Pearson (linear), Spearman (monotonic), Kendall (rank).
    *   **Plots:**
        *   **Scatter Plots:** To visualize the relationship, identify patterns, and detect clusters or outliers.
        *   **Joint Plots:** Combine scatter plots with histograms/KDEs for each variable.
        *   **Hexbin Plots:** Useful for very large datasets where scatter plots become dense.

*   **Numerical vs. Categorical:**
    *   **Analysis:**
        *   **Grouped Descriptive Statistics:** Calculate statistics (mean, median) of the numerical feature for each category.
        *   **ANOVA (Analysis of Variance):** To test if there are significant differences between the means of groups.
    *   **Plots:**
        *   **Box Plots/Violin Plots:** Show the distribution of the numerical feature across different categories.
        *   **Bar Plots (Grouped/Stacked):** If the numerical feature is aggregated (e.g., average income per category).

*   **Categorical vs. Categorical:**
    *   **Analysis:**
        *   **Cross-Tabulation (Contingency Tables):** Frequency counts for combinations of categories.
        *   \[\chi^2\] **Chi-Squared Test:** To test for independence between two categorical variables.
    *   **Plots:**
        *   **Stacked Bar Plots:** To show the proportion of one categorical variable within each level of another.
        *   **Grouped Bar Plots:** To compare frequencies across categories.
        *   **Heatmaps:** Of contingency tables to visually represent frequencies.

#### 3. Multivariate Analysis (Analyzing relationships among three or more features)

*   **Analysis:**
    *   **Principal Component Analysis (PCA):** For dimensionality reduction and visualizing high-dimensional data.
    *   **Cluster Analysis:** To group similar data points.
*   **Plots:**
    *   **Pair Plots (Seaborn's `pairplot`):** A grid of scatter plots and histograms/KDEs for multiple variables.
    *   **3D Scatter Plots:** For visualizing three numerical variables (can be difficult to interpret without interaction).
    *   **Heatmaps of Correlation Matrices:** To visualize correlations between all numerical features.
    *   **Parallel Coordinates Plot:** Useful for visualizing relationships across many dimensions.

#### 4. Missing Value Analysis

*   **Analysis:**
    *   **Count/Percentage of Missing Values:** Per feature.
    *   **Patterns of Missingness:** Are values missing randomly, or is there a pattern?
*   **Plots:**
    *   **Missing Value Matrix/Heatmap:** (e.g., using `missingno` library) To visualize where missing values occur in the dataset.
    *   **Bar Plot of Missing Counts:** To quickly see which columns have the most missing data.

#### 5. Outlier Detection

*   **Analysis:**
    *   **IQR Method:** Identify points outside \(Q1 - 1.5 \times IQR\) and \(Q3 + 1.5 \times IQR\).
    *   **Z-score Method:** Identify points beyond a certain standard deviation from the mean.
    *   **Isolation Forest/LOF (Local Outlier Factor):** More advanced methods.
*   **Plots:**
    *   **Box Plots:** Visually identify outliers as points beyond the whiskers.
    *   **Scatter Plots:** Outliers often appear as isolated points.
