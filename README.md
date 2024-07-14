# hushh_browser_companion_extension

**Product Comparison Script (Amazon vs Flipkart)**
This Python script uses Selenium to compare product details between Amazon and Flipkart.

**Requirements**
  -Python 3.x
  -Selenium
  -Webdriver Manager
  -Tabulate
Install dependencies using pip:

for example Copy code-
**pip install selenium webdriver-manager tabulate**


**Usage**
1. Clone the repository:
    Copy code-
    git clone https://github.com/your_username/product-comparison.git
    cd product

2. Run the script:    
    In terminal Copy code-
    python streamlit recorder.py

3. Input URLs:
   Enter the URLs of the Amazon and Flipkart products when prompted.

4. View Comparison:
   The script will open the URLs, extract product details (title, ratings, reviews, price), and display them in a comparison table.

5. Close the WebDriver:
   Ensure to close the WebDriver window after the comparison is complete.

**Script Details**
   **->Amazon:** Extracts product details including title, ratings, reviews, and price.
   **->Flipkart**: Opens the product page in a new tab, extracts similar details, and compares them with Amazon.

**Notes**
   -Make sure to have an active internet connection as the script relies on live data from Amazon and Flipkart.
   -Adjust the script if there are changes in the website structure (e.g., element IDs, class names) of Amazon or Flipkart.

**Contributing**
   -Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

