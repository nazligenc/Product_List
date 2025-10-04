interface ColorSelectorProps {
  selectedColor: string;
  onChange: (color: string) => void;
}

const colors = [
  { key: "yellow", hex: "#E6CA97", label: "Yellow Gold" },
  { key: "white", hex: "#D9D9D9", label: "White Gold" },
  { key: "rose", hex: "#E1A4A9", label: "Rose Gold" },
];

const ColorSelector = ({ selectedColor, onChange }: ColorSelectorProps) => {
  return (
    <div className="mb-4">
      <div className="flex gap-1 sm:gap-2 md:gap-3 mb-1 sm:mb-2">
        {colors.map((c) => (
          <button
            key={c.key}
            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-gray-300 flex-shrink-0 ${
              selectedColor === c.key ? "ring-1 ring-gray-500" : ""
            }`}
            style={{ backgroundColor: c.hex }}
            onClick={() => onChange(c.key)}
          />
        ))}
      </div>
      <span className="text-xs sm:text-sm md:text-base">
        {colors.find((c) => c.key === selectedColor)?.label ?? "Unknown"}
      </span>
    </div>
  );
};

export default ColorSelector;
