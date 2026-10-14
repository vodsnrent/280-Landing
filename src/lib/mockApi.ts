import type { EntityMap, EntityName, BaseEntity } from "@/types/entities";
import {
  mockClients, mockMasters, mockCategories, mockServices,
  mockAppliances, mockOrders, mockParts, mockSuppliers,
  mockWarehouses, mockPayments, mockReviews, mockPromotions,
} from "@/data/mockData";

const store: Record<string, BaseEntity[]> = {
  clients: [...mockClients],
  masters: [...mockMasters],
  categories: [...mockCategories],
  services: [...mockServices],
  appliances: [...mockAppliances],
  orders: [...mockOrders],
  parts: [...mockParts],
  suppliers: [...mockSuppliers],
  warehouses: [...mockWarehouses],
  payments: [...mockPayments],
  reviews: [...mockReviews],
  promotions: [...mockPromotions],
};

const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

function genId(entity: string): string {
  const prefix = entity.substring(0, 2);
  const items = store[entity];
  const maxNum = items.reduce((max, item) => {
    const match = item.id.match(/-(\d+)$/);
    return match ? Math.max(max, parseInt(match[1], 10)) : max;
  }, 0);
  return `${prefix}-${maxNum + 1}`;
}

export const mockApi = {
  async list<T extends EntityName>(entity: T): Promise<EntityMap[T][]> {
    await delay();
    return [...store[entity]] as EntityMap[T][];
  },

  async create<T extends EntityName>(
    entity: T,
    data: Omit<EntityMap[T], "id">
  ): Promise<EntityMap[T]> {
    await delay();
    const newItem = { ...data, id: genId(entity) } as unknown as BaseEntity;
    store[entity].unshift(newItem);
    return newItem as EntityMap[T];
  },

  async update<T extends EntityName>(
    entity: T,
    id: string,
    data: Partial<EntityMap[T]>
  ): Promise<EntityMap[T]> {
    await delay();
    const idx = store[entity].findIndex((item) => item.id === id);
    if (idx === -1) throw new Error("Запись не найдена");
    store[entity][idx] = { ...store[entity][idx], ...data };
    return store[entity][idx] as EntityMap[T];
  },

  async delete<T extends EntityName>(
    entity: T,
    id: string
  ): Promise<void> {
    await delay();
    const idx = store[entity].findIndex((item) => item.id === id);
    if (idx === -1) throw new Error("Запись не найдена");
    store[entity].splice(idx, 1);
  },

  async get<T extends EntityName>(
    entity: T,
    id: string
  ): Promise<EntityMap[T] | null> {
    await delay();
    const item = store[entity].find((i) => i.id === id);
    return (item as EntityMap[T]) ?? null;
  },
};
