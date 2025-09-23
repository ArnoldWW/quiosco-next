import { OrderItem } from "@/types";
import { create } from "zustand";

type Store = {
  order: OrderItem[];
  addToOrder: (item: OrderItem) => void;
  increaseItemQuantity?: (item: OrderItem) => void;
  decreaseItemQuantity?: (id: number) => void;
  removeItemFromOrder?: (id: number) => void;
  clearOrder?: () => void;
};

export const useStore = create<Store>((set) => ({
  order: [],
  addToOrder: (item) => {
    set((state) => {
      // Check if the item already exists in the order
      const existingItem = state.order.find(
        (orderItem) => orderItem.id === item.id
      );

      if (existingItem) {
        // If it exists, update the quantity and subtotal
        const updatedOrder = state.order.map((orderItem) =>
          orderItem.id === item.id
            ? {
                ...orderItem,
                quantity: orderItem.quantity + item.quantity,
                subtotal: orderItem.subtotal + item.subtotal
              }
            : orderItem
        );
        return { order: updatedOrder };
      } else {
        // If it doesn't exist, add the new item to the order
        return { order: [...state.order, item] };
      }
    });
  },
  increaseItemQuantity(item) {
    set((state) => {
      const updatedOrder = state.order.map((orderItem) =>
        orderItem.id === item.id
          ? {
              ...orderItem,
              quantity: orderItem.quantity + 1,
              subtotal: orderItem.subtotal + orderItem.price
            }
          : orderItem
      );
      return { order: updatedOrder };
    });
  },
  decreaseItemQuantity(id) {
    set((state) => {
      const existingItem = state.order.find((orderItem) => orderItem.id === id);

      if (existingItem && existingItem.quantity > 1) {
        // Decrease quantity and subtotal if more than one
        const updatedOrder = state.order.map((orderItem) =>
          orderItem.id === id
            ? {
                ...orderItem,
                quantity: orderItem.quantity - 1,
                subtotal: orderItem.subtotal - orderItem.price
              }
            : orderItem
        );
        return { order: updatedOrder };
      } else {
        // Remove item from order if quantity is 1
        const updatedOrder = state.order.filter(
          (orderItem) => orderItem.id !== id
        );
        return { order: updatedOrder };
      }
    });
  },
  removeItemFromOrder(id) {
    set((state) => {
      const updatedOrder = state.order.filter(
        (orderItem) => orderItem.id !== id
      );
      return { order: updatedOrder };
    });
  },
  clearOrder() {
    set({ order: [] });
  }
}));
