export interface Client {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  registeredAt: string;
  totalOrders: number;
  status: "active" | "blocked";
}

export interface Master {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  specialization: string;
  experienceYears: number;
  rating: number;
  status: "active" | "on_leave" | "fired";
  hireDate: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  sortOrder: number;
  active: boolean;
}

export interface Service {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  warrantyDays: number;
  active: boolean;
}

export interface ApplianceType {
  id: string;
  name: string;
  brand: string;
  category: string;
  avgRepairCost: number;
}

export interface RepairOrder {
  id: string;
  orderNumber: string;
  clientId: string;
  masterId: string;
  applianceTypeId: string;
  serviceId: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  description: string;
  cost: number;
  createdAt: string;
  completedAt: string | null;
  address: string;
}

export interface SparePart {
  id: string;
  name: string;
  partNumber: string;
  applianceTypeIds: string[];
  stockQuantity: number;
  unitPrice: number;
  supplier: string;
  minStock: number;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  contractDate: string;
  rating: number;
}

export interface Warehouse {
  id: string;
  name: string;
  address: string;
  managerId: string;
  capacity: number;
  occupied: number;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: "cash" | "card" | "transfer";
  status: "pending" | "paid" | "refunded";
  paidAt: string | null;
  transactionId: string;
}

export interface Review {
  id: string;
  orderId: string;
  clientId: string;
  masterId: string;
  rating: number;
  comment: string;
  createdAt: string;
  published: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  active: boolean;
  promoCode: string;
}

export type EntityName =
  | "clients"
  | "masters"
  | "categories"
  | "services"
  | "appliances"
  | "orders"
  | "parts"
  | "suppliers"
  | "warehouses"
  | "payments"
  | "reviews"
  | "promotions";

export interface BaseEntity {
  id: string;
  [key: string]: unknown;
}

export type EntityMap = {
  clients: Client;
  masters: Master;
  categories: ServiceCategory;
  services: Service;
  appliances: ApplianceType;
  orders: RepairOrder;
  parts: SparePart;
  suppliers: Supplier;
  warehouses: Warehouse;
  payments: Payment;
  reviews: Review;
  promotions: Promotion;
};
