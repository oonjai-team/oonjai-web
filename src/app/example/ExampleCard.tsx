"use client";

import { motion } from "framer-motion";
import { ExampleItemDTO } from "./schema";

interface Props {
  item: ExampleItemDTO;
  onToggleStatus: (id: string) => void;
}

const ExampleCard = ({ item, onToggleStatus }: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      layout={"position"}
      className="p-4 rounded-xl border-2 transition-colors border-oonjai-cream-300 bg-white"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-oonjai-green-700">{item.name}</h3>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full border ${
            item.status === "active"
              ? "bg-oonjai-green-50 text-oonjai-green-600 border-oonjai-green-200"
              : "bg-oonjai-red-50 text-oonjai-red-600 border-oonjai-red-200"
          }`}
        >
          {item.status.toUpperCase()}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-oonjai-blue-500 font-medium">
          ฿{item.price.toFixed(2)}
        </span>
        <button
          onClick={() => onToggleStatus(item.id)}
          className="px-4 py-2 rounded-lg bg-oonjai-green-500 text-white font-semibold hover:bg-oonjai-green-600 active:scale-95 transition-all text-sm"
        >
          Toggle Status
        </button>
      </div>
    </motion.div>
  );
};

export default ExampleCard;
