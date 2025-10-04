import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import axios from "axios";

interface Product {
  name: string;
  popularityScore: number;
  weight: number;
  images: { [key: string]: string };
  priceUSD?: number;
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


app.get("/api/products", async (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "..", "data", "products.json");

  try {
    const data = fs.readFileSync(filePath, "utf8");
    const products: Product[] = JSON.parse(data);

    const response = await axios.get("https://gold.g.apised.com/v1/latest", {
      params: { metals: "XAU", base_currency: "USD", weight_unit: "gram" },
      headers: { "x-api-key": process.env.API_KEY },
    });

    const goldPrice =
      response.data?.data?.metal_prices?.XAU?.price ??
      response.data?.data?.metal_prices?.XAU?.price_24k ??
      60;

    const productsWithPrice = products.map((p) => ({
      ...p,
      priceUSD: Number(((p.popularityScore + 1) * p.weight * goldPrice).toFixed(2)),
    }));

    const filters = req.query;

    const filteredProducts = productsWithPrice.filter((product) => {
      let isValid = true;
      if (filters.minPrice) isValid &&= product.priceUSD! >= Number(filters.minPrice);
      if (filters.maxPrice) isValid &&= product.priceUSD! <= Number(filters.maxPrice);
      if (filters.minPopularity) isValid &&= product.popularityScore >= Number(filters.minPopularity);
      if (filters.maxPopularity) isValid &&= product.popularityScore <= Number(filters.maxPopularity);
      return isValid;
    });

    res.json(filteredProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "File could not be read or an error occurred" });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
