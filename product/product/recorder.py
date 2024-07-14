import streamlit as st
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as 
from tabulate import tabulate
import time
  
# Function to fetch data from Amazon and Flipkart
def fetch_data(amazon_url, flipkart_url):
    options = Options()
    options.add_argument("--start-maximized")
    options.add_argument("--force-device-scale-factor=0.70")
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)

    # Fetch data from Amazon
    driver.get(amazon_url)
    product_title_amazon = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "productTitle"))
    ).text.strip()

    ratings_element = driver.find_element(By.CSS_SELECTOR, "span.a-declarative span.a-icon-alt")
    ratings_text = ratings_element.get_attribute("innerHTML").strip()

    ratings_count_element = driver.find_element(By.ID, "acrCustomerReviewText")
    ratings_count = ratings_count_element.text.strip()

    elements_amazon = driver.find_elements(By.CLASS_NAME, "aok-offscreen")
    elements_amazon_text = [element.text.strip() for element in elements_amazon]

    price_element_amazon = driver.execute_script(
        'return document.querySelector(".aok-offscreen").innerText'
    )

    # Fetch data from Flipkart
    driver.execute_script("window.open('');")
    driver.switch_to.window(driver.window_handles[1])
    driver.get(flipkart_url)

    product_name_flipkart = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "VU-ZEz"))
    ).text.strip()

    rating_flipkart = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "XQDdHH"))
    ).text.strip()
    formatted_rating = f"{rating_flipkart} out of 5 stars"

    reviews_flipkart = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "Wphh3N"))
    ).text.strip()

    price_flipkart = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "Nx9bqj"))
    ).text.strip()

    driver.quit()

    return {
        "Amazon": {
            "Product Title": product_title_amazon,
            "Customer Reviews": ratings_text,
            "Number of Ratings": ratings_count,
            "Price": price_element_amazon,
            "Additional Info": ratings_count
        },
        "Flipkart": {
            "Product Name": product_name_flipkart,
            "Rating": formatted_rating,
            "Reviews": reviews_flipkart,
            "Price": price_flipkart
        }
    }

# Streamlit app
def main():
    st.title("Amazon vs Flipkart Product Comparison")
    amazon_url = st.text_input("Enter Amazon product URL:")
    flipkart_url = st.text_input("Enter Flipkart product URL:")

    # Custom CSS for the button
    st.markdown("""
        <style>
        .green-button {
            background-color: green;
            color: white;
            border: none;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 12px;
        }
        </style>
    """, unsafe_allow_html=True)

    # Custom button
    button_clicked = st.markdown("""
        <button class="green-button" onclick="window.location.reload();">Compare Products</button>
    """, unsafe_allow_html=True)

    if button_clicked:
        if amazon_url and flipkart_url:
            try:
                data = fetch_data(amazon_url, flipkart_url)

                st.subheader("Comparison between Amazon and Flipkart Products:")
                table = [
                    ["Attribute", "Amazon", "Flipkart"],
                    ["Product Title", data["Amazon"]["Product Title"], data["Flipkart"]["Product Name"]],
                    ["Customer Reviews", data["Amazon"]["Customer Reviews"], data["Flipkart"]["Rating"]],
                    ["Price", data["Amazon"]["Price"], data["Flipkart"]["Price"]],
                    ["Additional Info",(data["Amazon"]["Additional Info"]), f"{data['Flipkart']['Reviews']} reviews"]
                ]
                st.table(table)
            except Exception as e:
                st.error(f"Error fetching data: {e}")
        else:
            st.warning("Please enter both Amazon and Flipkart URLs.")

if __name__ == "__main__":
    main()