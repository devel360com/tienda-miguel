import { CartItem, CartState, Coupon, ShippingOption } from "@/types/cart";

// Opciones de envío disponibles
export const shippingOptions: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Envío Estándar',
    price: 4.99,
    estimatedDays: '3-5 días hábiles'
  },
  {
    id: 'express',
    name: 'Envío Express',
    price: 9.99,
    estimatedDays: '1-2 días hábiles'
  },
  {
    id: 'free',
    name: 'Envío Gratuito',
    price: 0,
    estimatedDays: '5-7 días hábiles'
  }
];

// Cupones disponibles
export const availableCoupons: Coupon[] = [
  {
    code: 'VERANO2024',
    discount: 10,
    type: 'percentage',
    minimumPurchase: 100
  },
  {
    code: 'BIENVENIDO',
    discount: 15,
    type: 'fixed'
  }
];

// Guardar el carrito en localStorage
export const saveCartToStorage = (cart: CartState) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

// Cargar el carrito desde localStorage
export const loadCartFromStorage = (): CartState => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  }
  return {
    items: [],
    selectedShipping: null,
    appliedCoupon: null
  };
};

// Validar un cupón
export const validateCoupon = (code: string): Coupon | null => {
  return availableCoupons.find(coupon => coupon.code === code) || null;
};

// Calcular el descuento
export const calculateDiscount = (subtotal: number, coupon: Coupon | null): number => {
  if (!coupon) return 0;
  
  if (coupon.minimumPurchase && subtotal < coupon.minimumPurchase) {
    return 0;
  }

  return coupon.type === 'percentage' 
    ? (subtotal * coupon.discount) / 100 
    : coupon.discount;
};

// Calcular el total final
export const calculateTotal = (
  items: CartItem[],
  shipping: ShippingOption | null,
  coupon: Coupon | null
): { subtotal: number; discount: number; shipping: number; iva: number; total: number } => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = calculateDiscount(subtotal, coupon);
  const shippingCost = shipping?.price || 0;
  const discountedSubtotal = subtotal - discount;
  const iva = discountedSubtotal * 0.21; // 21% IVA
  const total = discountedSubtotal + shippingCost + iva;

  return {
    subtotal,
    discount,
    shipping: shippingCost,
    iva,
    total
  };
};
