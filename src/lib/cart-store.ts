import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export interface CartLine {
  productSlug: string;
  name: string;
  colorway: string;
  image: string;
  price: number;
  size: number;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  lastAddedAt: number;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (product: Product, size: number, quantity?: number) => void;
  removeLine: (productSlug: string, size: number) => void;
  setQuantity: (productSlug: string, size: number, quantity: number) => void;
  clear: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      lastAddedAt: 0,

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, size, quantity = 1) => {
        set((state) => {
          const existing = state.lines.find(
            (l) => l.productSlug === product.slug && l.size === size
          );
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l === existing ? { ...l, quantity: l.quantity + quantity } : l
              ),
              isOpen: true,
              lastAddedAt: Date.now(),
            };
          }
          const newLine: CartLine = {
            productSlug: product.slug,
            name: product.name,
            colorway: product.colorway,
            image: product.images[0],
            price: product.price,
            size,
            quantity,
          };
          return {
            lines: [...state.lines, newLine],
            isOpen: true,
            lastAddedAt: Date.now(),
          };
        });
      },

      removeLine: (productSlug, size) => {
        set((state) => ({
          lines: state.lines.filter(
            (l) => !(l.productSlug === productSlug && l.size === size)
          ),
        }));
      },

      setQuantity: (productSlug, size, quantity) => {
        set((state) => ({
          lines: state.lines
            .map((l) =>
              l.productSlug === productSlug && l.size === size
                ? { ...l, quantity }
                : l
            )
            .filter((l) => l.quantity > 0),
        }));
      },

      clear: () => set({ lines: [] }),

      totalItems: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
      totalPrice: () =>
        get().lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    }),
    {
      name: "footshootermzl-cart",
      partialize: (state) => ({ lines: state.lines }),
    }
  )
);
