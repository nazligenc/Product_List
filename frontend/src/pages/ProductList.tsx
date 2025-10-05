import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  // --- Swipe State ---
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

  // --- Scroll (smooth) ---
  const scrollByAmount = (offset: number) => {
    carouselRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };
  const scrollLeft = () => scrollByAmount(-500);
  const scrollRight = () => scrollByAmount(500);

  // --- Unified Drag Handlers ---
  const startDrag = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX - (carouselRef.current?.offsetLeft || 0);
    scrollLeftStart.current = carouselRef.current?.scrollLeft || 0;
  };

  const moveDrag = (clientX: number) => {
    if (!isDragging.current || !carouselRef.current) return;
    const x = clientX - (carouselRef.current.offsetLeft || 0);
    carouselRef.current.scrollLeft =
      scrollLeftStart.current - (x - startX.current);
  };

  const endDrag = () => {
    isDragging.current = false;
  };

  // --- Event Binding ---
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) =>
    startDrag(e.pageX);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) =>
    moveDrag(e.pageX);
  const handleMouseUp = endDrag;
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) =>
    startDrag(e.touches[0].pageX);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) =>
    moveDrag(e.touches[0].pageX);
  const handleTouchEnd = endDrag;

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
              className="
                carousel-container flex overflow-x-auto 
                gap-4 sm:gap-6 md:gap-8 lg:gap-10 
                px-2 sm:px-4 py-2 
                scroll-smooth cursor-grab
                scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200
              "
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
