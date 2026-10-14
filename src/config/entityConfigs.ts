import type { EntityName } from "@/types/entities";
import { Wrench, Users, GraduationCap, FolderTree, Settings, Refrigerator,
  ClipboardList, Package, Truck, Warehouse, CreditCard, Star, Tag,
  LayoutDashboard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "date" | "datetime" | "textarea" | "boolean";
  options?: { value: string; label: string }[];
  required?: boolean;
}

export interface ColumnConfig {
  key: string;
  label: string;
  type: "text" | "badge" | "date" | "datetime" | "number" | "currency";
  badgeColors?: Record<string, string>;
}

export interface EntityConfig {
  name: EntityName;
  title: string;
  singular: string;
  icon: LucideIcon;
  fields: FieldConfig[];
  columns: ColumnConfig[];
}

export const entityConfigs: Record<EntityName, EntityConfig> = {
  clients: {
    name: "clients",
    title: "Клиенты",
    singular: "Клиент",
    icon: Users,
    fields: [
      { key: "fullName", label: "ФИО", type: "text", required: true },
      { key: "phone", label: "Телефон", type: "text", required: true },
      { key: "email", label: "Email", type: "text", required: true },
      { key: "address", label: "Адрес", type: "textarea", required: true },
      { key: "registeredAt", label: "Дата регистрации", type: "date", required: true },
      { key: "totalOrders", label: "Всего заказов", type: "number", required: true },
      { key: "status", label: "Статус", type: "select", required: true, options: [
        { value: "active", label: "Активен" }, { value: "blocked", label: "Заблокирован" }
      ]},
    ],
    columns: [
      { key: "fullName", label: "ФИО", type: "text" },
      { key: "phone", label: "Телефон", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "totalOrders", label: "Заказов", type: "number" },
      { key: "status", label: "Статус", type: "badge", badgeColors: { active: "bg-emerald-100 text-emerald-700", blocked: "bg-red-100 text-red-700" } },
    ],
  },
  masters: {
    name: "masters",
    title: "Мастера",
    singular: "Мастер",
    icon: GraduationCap,
    fields: [
      { key: "fullName", label: "ФИО", type: "text", required: true },
      { key: "phone", label: "Телефон", type: "text", required: true },
      { key: "email", label: "Email", type: "text", required: true },
      { key: "specialization", label: "Специализация", type: "text", required: true },
      { key: "experienceYears", label: "Опыт (лет)", type: "number", required: true },
      { key: "rating", label: "Рейтинг", type: "number", required: true },
      { key: "status", label: "Статус", type: "select", required: true, options: [
        { value: "active", label: "Работает" }, { value: "on_leave", label: "В отпуске" }, { value: "fired", label: "Уволен" }
      ]},
      { key: "hireDate", label: "Дата приёма", type: "date", required: true },
    ],
    columns: [
      { key: "fullName", label: "ФИО", type: "text" },
      { key: "specialization", label: "Специализация", type: "text" },
      { key: "experienceYears", label: "Опыт (лет)", type: "number" },
      { key: "rating", label: "Рейтинг", type: "number" },
      { key: "status", label: "Статус", type: "badge", badgeColors: { active: "bg-emerald-100 text-emerald-700", on_leave: "bg-amber-100 text-amber-700", fired: "bg-red-100 text-red-700" } },
    ],
  },
  categories: {
    name: "categories",
    title: "Категории услуг",
    singular: "Категория",
    icon: FolderTree,
    fields: [
      { key: "name", label: "Название", type: "text", required: true },
      { key: "icon", label: "Иконка", type: "text", required: true },
      { key: "description", label: "Описание", type: "textarea", required: true },
      { key: "sortOrder", label: "Порядок сортировки", type: "number", required: true },
      { key: "active", label: "Активна", type: "boolean", required: true },
    ],
    columns: [
      { key: "name", label: "Название", type: "text" },
      { key: "sortOrder", label: "Сортировка", type: "number" },
      { key: "active", label: "Активна", type: "badge", badgeColors: { true: "bg-emerald-100 text-emerald-700", false: "bg-gray-100 text-gray-600" } },
    ],
  },
  services: {
    name: "services",
    title: "Услуги",
    singular: "Услуга",
    icon: Settings,
    fields: [
      { key: "categoryId", label: "Категория", type: "select", required: true, options: [
        { value: "ca-1", label: "Холодильники" }, { value: "ca-2", label: "Стиральные машины" },
        { value: "ca-3", label: "Посудомоечные машины" }, { value: "ca-4", label: "Микроволновые печи" },
        { value: "ca-5", label: "Духовые шкафы" },
      ]},
      { key: "name", label: "Название", type: "text", required: true },
      { key: "description", label: "Описание", type: "textarea", required: true },
      { key: "price", label: "Цена (руб)", type: "number", required: true },
      { key: "durationMinutes", label: "Длительность (мин)", type: "number", required: true },
      { key: "warrantyDays", label: "Гарантия (дней)", type: "number", required: true },
      { key: "active", label: "Активна", type: "boolean", required: true },
    ],
    columns: [
      { key: "name", label: "Название", type: "text" },
      { key: "price", label: "Цена", type: "currency" },
      { key: "durationMinutes", label: "Длительность (мин)", type: "number" },
      { key: "warrantyDays", label: "Гарантия (дней)", type: "number" },
      { key: "active", label: "Активна", type: "badge", badgeColors: { true: "bg-emerald-100 text-emerald-700", false: "bg-gray-100 text-gray-600" } },
    ],
  },
  appliances: {
    name: "appliances",
    title: "Бытовая техника",
    singular: "Техника",
    icon: Refrigerator,
    fields: [
      { key: "name", label: "Модель", type: "text", required: true },
      { key: "brand", label: "Бренд", type: "text", required: true },
      { key: "category", label: "Категория", type: "text", required: true },
      { key: "avgRepairCost", label: "Средняя стоимость ремонта", type: "number", required: true },
    ],
    columns: [
      { key: "name", label: "Модель", type: "text" },
      { key: "brand", label: "Бренд", type: "text" },
      { key: "category", label: "Категория", type: "text" },
      { key: "avgRepairCost", label: "Ср. ремонт", type: "currency" },
    ],
  },
  orders: {
    name: "orders",
    title: "Заявки на ремонт",
    singular: "Заявка",
    icon: ClipboardList,
    fields: [
      { key: "orderNumber", label: "Номер заявки", type: "text", required: true },
      { key: "clientId", label: "Клиент", type: "select", required: true, options: [
        { value: "cl-1", label: "Иванов И.И." }, { value: "cl-2", label: "Петрова М.С." },
        { value: "cl-3", label: "Сидоров А.П." }, { value: "cl-4", label: "Кузнецова Е.Д." },
        { value: "cl-5", label: "Смирнов Д.А." },
      ]},
      { key: "masterId", label: "Мастер", type: "select", required: true, options: [
        { value: "ma-1", label: "Волков А.И." }, { value: "ma-2", label: "Морозов С.Н." },
        { value: "ma-3", label: "Орлов П.В." }, { value: "ma-4", label: "Зайцев М.А." },
      ]},
      { key: "applianceTypeId", label: "Техника", type: "select", required: true, options: [
        { value: "ap-1", label: "Indesit DF 4180" }, { value: "ap-2", label: "Bosch WLG 24160" },
        { value: "ap-3", label: "Samsung RB30N5NSS" }, { value: "ap-4", label: "LG F1096ND3" },
        { value: "ap-5", label: "Panasonic NN-GD576M" }, { value: "ap-6", label: "Hansa ZWH611" },
      ]},
      { key: "serviceId", label: "Услуга", type: "select", required: true, options: [
        { value: "se-1", label: "Диагностика" }, { value: "se-2", label: "Заправка хладагентом" },
        { value: "se-3", label: "Замена подшипников" }, { value: "se-4", label: "Ремонт электроники" },
        { value: "se-5", label: "Замена магнетрона" },
      ]},
      { key: "status", label: "Статус", type: "select", required: true, options: [
        { value: "pending", label: "Ожидает" }, { value: "in_progress", label: "В работе" },
        { value: "completed", label: "Завершён" }, { value: "cancelled", label: "Отменён" },
      ]},
      { key: "priority", label: "Приоритет", type: "select", required: true, options: [
        { value: "low", label: "Низкий" }, { value: "medium", label: "Средний" },
        { value: "high", label: "Высокий" }, { value: "urgent", label: "Срочный" },
      ]},
      { key: "description", label: "Описание проблемы", type: "textarea", required: true },
      { key: "cost", label: "Стоимость (руб)", type: "number", required: true },
      { key: "address", label: "Адрес", type: "textarea", required: true },
      { key: "createdAt", label: "Создана", type: "datetime", required: true },
      { key: "completedAt", label: "Завершена", type: "datetime" },
    ],
    columns: [
      { key: "orderNumber", label: "Номер", type: "text" },
      { key: "status", label: "Статус", type: "badge", badgeColors: { pending: "bg-blue-100 text-blue-700", in_progress: "bg-amber-100 text-amber-700", completed: "bg-emerald-100 text-emerald-700", cancelled: "bg-red-100 text-red-700" } },
      { key: "priority", label: "Приоритет", type: "badge", badgeColors: { low: "bg-gray-100 text-gray-600", medium: "bg-blue-100 text-blue-700", high: "bg-orange-100 text-orange-700", urgent: "bg-red-100 text-red-700" } },
      { key: "cost", label: "Стоимость", type: "currency" },
      { key: "createdAt", label: "Создана", type: "datetime" },
    ],
  },
  parts: {
    name: "parts",
    title: "Запчасти",
    singular: "Запчасть",
    icon: Package,
    fields: [
      { key: "name", label: "Название", type: "text", required: true },
      { key: "partNumber", label: "Артикул", type: "text", required: true },
      { key: "stockQuantity", label: "На складе", type: "number", required: true },
      { key: "unitPrice", label: "Цена (руб)", type: "number", required: true },
      { key: "supplier", label: "Поставщик", type: "select", required: true, options: [
        { value: "sup-1", label: "ООО ТехноПартс" }, { value: "sup-2", label: "ЗаводЗапчасть" },
        { value: "sup-3", label: "ИП Громов В.Д." },
      ]},
      { key: "minStock", label: "Минимальный остаток", type: "number", required: true },
    ],
    columns: [
      { key: "name", label: "Название", type: "text" },
      { key: "partNumber", label: "Артикул", type: "text" },
      { key: "stockQuantity", label: "Остаток", type: "number" },
      { key: "unitPrice", label: "Цена", type: "currency" },
    ],
  },
  suppliers: {
    name: "suppliers",
    title: "Поставщики",
    singular: "Поставщик",
    icon: Truck,
    fields: [
      { key: "name", label: "Название", type: "text", required: true },
      { key: "contactPerson", label: "Контактное лицо", type: "text", required: true },
      { key: "phone", label: "Телефон", type: "text", required: true },
      { key: "email", label: "Email", type: "text", required: true },
      { key: "address", label: "Адрес", type: "textarea", required: true },
      { key: "contractDate", label: "Дата договора", type: "date", required: true },
      { key: "rating", label: "Рейтинг", type: "number", required: true },
    ],
    columns: [
      { key: "name", label: "Название", type: "text" },
      { key: "contactPerson", label: "Контакт", type: "text" },
      { key: "phone", label: "Телефон", type: "text" },
      { key: "rating", label: "Рейтинг", type: "number" },
    ],
  },
  warehouses: {
    name: "warehouses",
    title: "Склады",
    singular: "Склад",
    icon: Warehouse,
    fields: [
      { key: "name", label: "Название", type: "text", required: true },
      { key: "address", label: "Адрес", type: "textarea", required: true },
      { key: "managerId", label: "Заведующий", type: "select", required: true, options: [
        { value: "ma-1", label: "Волков А.И." }, { value: "ma-2", label: "Морозов С.Н." },
        { value: "ma-4", label: "Зайцев М.А." },
      ]},
      { key: "capacity", label: "Вместимость", type: "number", required: true },
      { key: "occupied", label: "Занято", type: "number", required: true },
    ],
    columns: [
      { key: "name", label: "Название", type: "text" },
      { key: "address", label: "Адрес", type: "text" },
      { key: "capacity", label: "Вместимость", type: "number" },
      { key: "occupied", label: "Занято", type: "number" },
    ],
  },
  payments: {
    name: "payments",
    title: "Платежи",
    singular: "Платёж",
    icon: CreditCard,
    fields: [
      { key: "orderId", label: "Заявка", type: "select", required: true, options: [
        { value: "or-1", label: "ORD-2024-001" }, { value: "or-2", label: "ORD-2024-002" },
        { value: "or-3", label: "ORD-2024-003" }, { value: "or-4", label: "ORD-2024-004" },
        { value: "or-5", label: "ORD-2024-005" },
      ]},
      { key: "amount", label: "Сумма (руб)", type: "number", required: true },
      { key: "method", label: "Способ оплаты", type: "select", required: true, options: [
        { value: "cash", label: "Наличные" }, { value: "card", label: "Карта" },
        { value: "transfer", label: "Перевод" },
      ]},
      { key: "status", label: "Статус", type: "select", required: true, options: [
        { value: "pending", label: "Ожидает" }, { value: "paid", label: "Оплачен" },
        { value: "refunded", label: "Возврат" },
      ]},
      { key: "transactionId", label: "ID транзакции", type: "text", required: true },
      { key: "paidAt", label: "Дата оплаты", type: "datetime" },
    ],
    columns: [
      { key: "transactionId", label: "Транзакция", type: "text" },
      { key: "amount", label: "Сумма", type: "currency" },
      { key: "method", label: "Способ", type: "text" },
      { key: "status", label: "Статус", type: "badge", badgeColors: { pending: "bg-amber-100 text-amber-700", paid: "bg-emerald-100 text-emerald-700", refunded: "bg-red-100 text-red-700" } },
    ],
  },
  reviews: {
    name: "reviews",
    title: "Отзывы",
    singular: "Отзыв",
    icon: Star,
    fields: [
      { key: "orderId", label: "Заявка", type: "select", required: true, options: [
        { value: "or-1", label: "ORD-2024-001" }, { value: "or-4", label: "ORD-2024-004" },
      ]},
      { key: "rating", label: "Оценка (1-5)", type: "number", required: true },
      { key: "comment", label: "Комментарий", type: "textarea", required: true },
      { key: "createdAt", label: "Дата", type: "date", required: true },
      { key: "published", label: "Опубликован", type: "boolean", required: true },
    ],
    columns: [
      { key: "rating", label: "Оценка", type: "number" },
      { key: "comment", label: "Комментарий", type: "text" },
      { key: "createdAt", label: "Дата", type: "date" },
      { key: "published", label: "Опубликован", type: "badge", badgeColors: { true: "bg-emerald-100 text-emerald-700", false: "bg-gray-100 text-gray-600" } },
    ],
  },
  promotions: {
    name: "promotions",
    title: "Акции",
    singular: "Акция",
    icon: Tag,
    fields: [
      { key: "title", label: "Название", type: "text", required: true },
      { key: "description", label: "Описание", type: "textarea", required: true },
      { key: "discountPercent", label: "Скидка (%)", type: "number", required: true },
      { key: "startDate", label: "Дата начала", type: "date", required: true },
      { key: "endDate", label: "Дата окончания", type: "date", required: true },
      { key: "active", label: "Активна", type: "boolean", required: true },
      { key: "promoCode", label: "Промокод", type: "text", required: true },
    ],
    columns: [
      { key: "title", label: "Название", type: "text" },
      { key: "discountPercent", label: "Скидка (%)", type: "number" },
      { key: "promoCode", label: "Промокод", type: "text" },
      { key: "active", label: "Активна", type: "badge", badgeColors: { true: "bg-emerald-100 text-emerald-700", false: "bg-gray-100 text-gray-600" } },
    ],
  },
};

export const sidebarItems: { name: EntityName; label: string; icon: LucideIcon }[] = [
  { name: "orders", label: "Заявки", icon: ClipboardList },
  { name: "clients", label: "Клиенты", icon: Users },
  { name: "masters", label: "Мастера", icon: GraduationCap },
  { name: "services", label: "Услуги", icon: Settings },
  { name: "categories", label: "Категории", icon: FolderTree },
  { name: "appliances", label: "Техника", icon: Refrigerator },
  { name: "parts", label: "Запчасти", icon: Package },
  { name: "suppliers", label: "Поставщики", icon: Truck },
  { name: "warehouses", label: "Склады", icon: Warehouse },
  { name: "payments", label: "Платежи", icon: CreditCard },
  { name: "reviews", label: "Отзывы", icon: Star },
  { name: "promotions", label: "Акции", icon: Tag },
];

export const dashboardIcon = LayoutDashboard;
export const mainIcon = Wrench;
