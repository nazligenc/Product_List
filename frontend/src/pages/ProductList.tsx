import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Swipe state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setSelectedColors(res.data.map(() => "yellow"));
      })
      .catch((err) => console.error("Not found products", err));
  }, []);

  const changeColor = (index: number, color: string) => {
    const newColors = [...selectedColors];
    newColors[index] = color;
    setSelectedColors(newColors);
  };

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 500, behavior: "smooth" });
  };

  // --- Swipe Handlers ---
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.pageX - (carouselRef.current?.offsetLeft || 0);
    scrollLeftStart.current = carouselRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = x - startX.current;
    if (carouselRef.current)
      carouselRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current =
      e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    scrollLeftStart.current = carouselRef.current?.scrollLeft || 0;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = x - startX.current;
    if (carouselRef.current)
      carouselRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="min-h-screen relative ">
      <div className="container mx-auto px-4 py-12 ">
        <h1
          className="text-center text-xl md:text-2xl lg:text-3xl text-gray-800 mb-10"
          style={{ fontFamily: "Avenir, sans-serif" }}
        >
          Product List
        </h1>

        <div className="relative max-w-full mx-auto ">
          <div className="flex justify-between items-center">
            <button
              onClick={scrollLeft}
              className="p-2 text-gray-500 z-10 -mt-4 md:-mt-50"
            >
              <HiChevronLeft size={40} />
            </button>

            <div
              ref={carouselRef}
              className="carousel-container flex overflow-x-auto gap-30 pb-4 px-4 scroll-smooth cursor-grab"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  priceUSD={product.priceUSD}
                  selectedColor={selectedColors[index]}
                  onChangeColor={(color) => changeColor(index, color)}
                />
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="p-2 text-gray-500 z-10 -mt-4 md:-mt-50"
            >
              <HiChevronRight size={40} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
