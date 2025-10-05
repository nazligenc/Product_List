# Product Listing Application
This is a **product listing application** consisting of a **backend API** and a **frontend interface**. The backend provides product data, which the frontend displays according to the design specifications.


##  Technologies Used

- **Frontend:** React + Vite + Tailwind CSS  
- **Backend:** Node.js + Express  
- **Data Fetching:** Axios  
- **Data Source:** `products.json`  
- **Real-time Gold Price API:** [apised.com](https://apised.com) (API key required)  
## Features:
- RESTful API serving product data from `products.json`.  
- Dynamic price calculation based on the formula:  
   - **Price = (popularityScore + 1) * weight * goldPrice**
- Price is in **US dollars**.  
- Gold price is fetched in real-time from [apised.com](https://apised.com).  
- **Filtering**: Products can be filtered by criteria such as:  
- Price range  
- Popularity score  
- Port conflicts can be avoided using `.env.example` by creating your own `.env` file and updating ports.  

##  API Filtering

The backend API supports filtering products using query parameters. You can filter by:

- `minPrice` – Minimum product price in USD
- `maxPrice` – Maximum product price in USD
- `minPopularity` – Minimum popularity score (0-100)
- `maxPopularity` – Maximum popularity score (0-100)

### Example Requests


   - **localhost:5000/api/products?minPrice=1000**
   - **localhost:5000/api/products?minPopularity=70&maxPopularity=90**

### Frontend

- Displays all products fetched from the backend API.  
- Shows product **name**, **price**, **popularity score** (converted to a 1–5 scale, 1 decimal place), and other relevant information.  
- **Color picker**: Changes the displayed image according to the selected color.  
- **Carousel**: Products can be scrolled using side arrows or swipe gestures on mobile and desktop.  

> **Note:** Backend filtering functionality is implemented but currently not displayed on the frontend.


## ⚡ Setup & Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/nazligenc/Product_List

    ```

2.  Navigate to the project directory:
    ```bash
    cd Product_List
    ```
3.  Setup Backend

    ->Rename .env.example to .env and update it with your local    configuration (ports, API keys, etc.).
    
    ->Edit .env if needed to avoid port conflicts and add your API key from apised.com
    ```bash
    npm install
    npm run dev
    ```
4.  Setup Frontend:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
5.  Open your browser and go to:
    ```bash
    http://localhost:5173
    ```
                                       
