export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

export interface Coupon {
  code: string;
  discount: number; // percentage
  type: 'percentage' | 'fixed';
  minimumPurchase?: number;
}

export interface CartState {
  items: CartItem[];
  selectedShipping: ShippingOption | null;
  appliedCoupon: Coupon | null;
}
