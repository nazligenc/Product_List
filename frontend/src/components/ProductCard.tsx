import StarRating from "./StarRating";
import ColorSelector from "./ColorSelector";

interface ProductCardProps {
  product: any;
  priceUSD?: number;
  selectedColor: string;
  onChangeColor: (color: string) => void;
}

const ProductCard = ({
  product,
  priceUSD,
  selectedColor,
  onChangeColor,
}: ProductCardProps) => {
  return (
    <div className="flex-none w-full sm:w-[50%] md:w-[30%] lg:w-[22%] xl:w-[18%] max-w-xs p-3 sm:p-4 md:p-5">
      <div className="aspect-square bg-gray-100 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
        <img
          src={product.images[selectedColor]}
          alt={product.name}
          className="object-cover w-full h-full rounded-xl"
        />
      </div>

      <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-800 mb-1">
        {product.name}
      </h3>

      <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-600 mb-3">
        ${priceUSD} USD
      </p>

      <ColorSelector selectedColor={selectedColor} onChange={onChangeColor} />
      <StarRating score={product.popularityScore * 5} />
    </div>
  );
};

export default ProductCard;
