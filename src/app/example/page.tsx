"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { mockData, ExampleItemDTO } from "./schema";
import ExampleCard from "./ExampleCard";

const Page = () => {
  // State management example (UI & State focus)
  const [items, setItems] = useState<ExampleItemDTO[]>(mockData);

  const toggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "active" ? "inactive" : "active" }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-oonjai-cream-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-oonjai-green-600 mb-4"
          >
            Example Feature
          </motion.h1>
          <p className="text-oonjai-blue-600">
            This page demonstrates the contribution guidelines:
            Tailwind, Framer Motion, All-in-One Directory, and DTO usage.
          </p>
        </header>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item) => (
            <ExampleCard
              key={item.id}
              item={item}
              onToggleStatus={toggleStatus}
            />
          ))}
        </motion.div>

        <footer className="mt-16 pt-8 border-t border-oonjai-cream-200 text-center">
          <p className="text-sm text-gray-500 italic">
            All files for this feature are located in `src/app/example/`.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Page;