export default function reducerFunc(state = [], action) {
    switch (action.type) {
        case "addToCart": {
            const item = action.payload;
            const exist = state.some((currentItem) => currentItem.id === item.id);

            if (exist) {
                return state.map((currentItem) =>
                    currentItem.id === item.id ? { ...currentItem, qty: currentItem.qty + item.qty } : currentItem
                );
            }

            return [...state, { ...item, qty: item.qty || 1 }];
        }

        case "increaseQty": {
            return state.map((item) =>
                item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
            );
        }

        case "decreaseQty": {
            return state
                .map((item) =>
                    item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
                )
                .filter((item) => item.qty > 0);
        }

        case "removeItem": {
            return state.filter((item) => item.id !== action.payload.id);
        }

        case "clearCart": {
            return [];
        }

        case "updateQty": {
            return state
                .map((item) =>
                    item.id === action.payload.id ? { ...item, qty: action.payload.qty } : item
                )
                .filter((item) => item.qty > 0);
        }

        default: {
            throw new Error("Unknown action: " + action.type);
        }
    }
}