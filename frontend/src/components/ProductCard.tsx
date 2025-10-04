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
    <div className="flex-none w-36 sm:w-44 md:w-52 lg:w-60 p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="aspect-square bg-gray-100 rounded-xl mb-2 sm:mb-3 md:mb-4 flex items-center justify-center">
        <img
          src={product.images[selectedColor]}
          alt={product.name}
          className="object-cover w-full h-full rounded-xl"
        />
      </div>

      <h3 className="text-sm sm:text-base md:text-lg lg:text-lg font-medium text-gray-800 mb-1 sm:mb-2">
        {product.name}
      </h3>

      <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-600 mb-2 sm:mb-4">
        ${priceUSD} USD
      </p>

      <ColorSelector selectedColor={selectedColor} onChange={onChangeColor} />

      <StarRating score={product.popularityScore * 5} />
    </div>
  );
};

export default ProductCard;
