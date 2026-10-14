import type {
  Client,
  Master,
  ServiceCategory,
  Service,
  ApplianceType,
  RepairOrder,
  SparePart,
  Supplier,
  Warehouse,
  Payment,
  Review,
  Promotion,
} from "@/types/entities";

export const mockClients: Client[] = [
  { id: "cl-1", fullName: "Иванов Иван Иванович", phone: "+7 900 100-20-30", email: "ivanov@mail.ru", address: "г. Москва, ул. Ленина, д. 10, кв. 25", registeredAt: "2024-01-15", totalOrders: 5, status: "active" },
  { id: "cl-2", fullName: "Петрова Мария Сергеевна", phone: "+7 901 200-30-40", email: "petrova@gmail.com", address: "г. Москва, ул. Пушкина, д. 5, кв. 12", registeredAt: "2024-02-20", totalOrders: 3, status: "active" },
  { id: "cl-3", fullName: "Сидоров Алексей Петрович", phone: "+7 902 300-40-50", email: "sidorov@yandex.ru", address: "г. Санкт-Петербург, пр. Невский, д. 100, кв. 55", registeredAt: "2024-03-10", totalOrders: 8, status: "active" },
  { id: "cl-4", fullName: "Кузнецова Елена Дмитриевна", phone: "+7 903 400-50-60", email: "kuznetsova@mail.ru", address: "г. Екатеринбург, ул. Малышева, д. 28, кв. 7", registeredAt: "2024-04-05", totalOrders: 1, status: "blocked" },
  { id: "cl-5", fullName: "Смирнов Дмитрий Александрович", phone: "+7 904 500-60-70", email: "smirnov@gmail.com", address: "г. Новосибирск, ул. Гоголя, д. 15, кв. 3", registeredAt: "2024-05-12", totalOrders: 12, status: "active" },
];

export const mockMasters: Master[] = [
  { id: "ma-1", fullName: "Волков Андрей Игоревич", phone: "+7 910 111-22-33", email: "volkov@repair.ru", specialization: "Холодильники", experienceYears: 12, rating: 4.8, status: "active", hireDate: "2018-03-01" },
  { id: "ma-2", fullName: "Морозов Сергей Николаевич", phone: "+7 911 222-33-44", email: "morozov@repair.ru", specialization: "Стиральные машины", experienceYears: 8, rating: 4.6, status: "active", hireDate: "2020-06-15" },
  { id: "ma-3", fullName: "Орлов Павел Викторович", phone: "+7 912 333-44-55", email: "orlov@repair.ru", specialization: "Посудомоечные машины", experienceYears: 5, rating: 4.4, status: "on_leave", hireDate: "2022-01-10" },
  { id: "ma-4", fullName: "Зайцев Михаил Андреевич", phone: "+7 913 444-55-66", email: "zaytsev@repair.ru", specialization: "Микроволновые печи", experienceYears: 15, rating: 4.9, status: "active", hireDate: "2016-09-20" },
];

export const mockCategories: ServiceCategory[] = [
  { id: "ca-1", name: "Холодильники", icon: "Refrigerator", description: "Ремонт и обслуживание холодильников всех типов", sortOrder: 1, active: true },
  { id: "ca-2", name: "Стиральные машины", icon: "WashingMachine", description: "Ремонт стиральных и сушильных машин", sortOrder: 2, active: true },
  { id: "ca-3", name: "Посудомоечные машины", icon: "Dishwasher", description: "Ремонт посудомоечных машин", sortOrder: 3, active: true },
  { id: "ca-4", name: "Микроволновые печи", icon: "Microwave", description: "Ремонт микроволновых печей", sortOrder: 4, active: true },
  { id: "ca-5", name: "Духовые шкафы", icon: "CookingPot", description: "Ремонт духовых шкафов и плит", sortOrder: 5, active: true },
];

export const mockServices: Service[] = [
  { id: "se-1", categoryId: "ca-1", name: "Диагностика холодильника", description: "Полная диагностика и выявление неисправностей", price: 800, durationMinutes: 60, warrantyDays: 30, active: true },
  { id: "se-2", categoryId: "ca-1", name: "Заправка хладагентом", description: "Заправка системы хладагентом R600a/R134a", price: 2500, durationMinutes: 90, warrantyDays: 90, active: true },
  { id: "se-3", categoryId: "ca-2", name: "Замена подшипников барабана", description: "Замена подшипников и сальников барабана стиральной машины", price: 3500, durationMinutes: 120, warrantyDays: 180, active: true },
  { id: "se-4", categoryId: "ca-2", name: "Ремонт электроники", description: "Ремонт или замена модуля управления", price: 4000, durationMinutes: 150, warrantyDays: 120, active: true },
  { id: "se-5", categoryId: "ca-4", name: "Замена магнетрона", description: "Замена магнетрона микроволновой печи", price: 2200, durationMinutes: 45, warrantyDays: 90, active: true },
];

export const mockAppliances: ApplianceType[] = [
  { id: "ap-1", name: "Indesit DF 4180", brand: "Indesit", category: "Холодильники", avgRepairCost: 2800 },
  { id: "ap-2", name: "Bosch WLG 24160", brand: "Bosch", category: "Стиральные машины", avgRepairCost: 3200 },
  { id: "ap-3", name: "Samsung RB30N5NSS", brand: "Samsung", category: "Холодильники", avgRepairCost: 3500 },
  { id: "ap-4", name: "LG F1096ND3", brand: "LG", category: "Стиральные машины", avgRepairCost: 2900 },
  { id: "ap-5", name: "Panasonic NN-GD576M", brand: "Panasonic", category: "Микроволновые печи", avgRepairCost: 1800 },
  { id: "ap-6", name: "Hansa ZWH611", brand: "Hansa", category: "Стиральные машины", avgRepairCost: 2400 },
];

export const mockOrders: RepairOrder[] = [
  { id: "or-1", orderNumber: "ORD-2024-001", clientId: "cl-1", masterId: "ma-1", applianceTypeId: "ap-1", serviceId: "se-1", status: "completed", priority: "medium", description: "Не морозит верхняя камера", cost: 3500, createdAt: "2024-06-10T09:00:00", completedAt: "2024-06-10T12:00:00", address: "г. Москва, ул. Ленина, д. 10, кв. 25" },
  { id: "or-2", orderNumber: "ORD-2024-002", clientId: "cl-2", masterId: "ma-2", applianceTypeId: "ap-2", serviceId: "se-3", status: "in_progress", priority: "high", description: "Громкий шум при отжиме", cost: 3500, createdAt: "2024-06-15T10:00:00", completedAt: null, address: "г. Москва, ул. Пушкина, д. 5, кв. 12" },
  { id: "or-3", orderNumber: "ORD-2024-003", clientId: "cl-3", masterId: "ma-4", applianceTypeId: "ap-5", serviceId: "se-5", status: "pending", priority: "low", description: "Не греет еду", cost: 2200, createdAt: "2024-06-20T14:00:00", completedAt: null, address: "г. Санкт-Петербург, пр. Невский, д. 100, кв. 55" },
  { id: "or-4", orderNumber: "ORD-2024-004", clientId: "cl-5", masterId: "ma-1", applianceTypeId: "ap-3", serviceId: "se-2", status: "completed", priority: "urgent", description: "Полная утечка хладагента", cost: 3300, createdAt: "2024-06-25T08:00:00", completedAt: "2024-06-25T11:00:00", address: "г. Новосибирск, ул. Гоголя, д. 15, кв. 3" },
  { id: "or-5", orderNumber: "ORD-2024-005", clientId: "cl-2", masterId: "ma-2", applianceTypeId: "ap-6", serviceId: "se-4", status: "cancelled", priority: "medium", description: "Не включается", cost: 4000, createdAt: "2024-07-01T11:00:00", completedAt: null, address: "г. Москва, ул. Пушкина, д. 5, кв. 12" },
];

export const mockParts: SparePart[] = [
  { id: "sp-1", name: "Компрессор Embraco EMX70CLP", partNumber: "EMX70CLP", applianceTypeIds: ["ap-1", "ap-3"], stockQuantity: 8, unitPrice: 4500, supplier: "sup-1", minStock: 3 },
  { id: "sp-2", name: "Подшипник 6204-2RS", partNumber: "6204-2RS", applianceTypeIds: ["ap-2", "ap-4", "ap-6"], stockQuantity: 25, unitPrice: 350, supplier: "sup-2", minStock: 10 },
  { id: "sp-3", name: "Магнетрон Panasonic 2M210-M1", partNumber: "2M210M1", applianceTypeIds: ["ap-5"], stockQuantity: 4, unitPrice: 1800, supplier: "sup-1", minStock: 2 },
  { id: "sp-4", name: "ТЭН стиральной машины 2000W", partNumber: "TEN2000W", applianceTypeIds: ["ap-2", "ap-4", "ap-6"], stockQuantity: 15, unitPrice: 1200, supplier: "sup-3", minStock: 5 },
  { id: "sp-5", name: "Термостат K59-L1954", partNumber: "K59L1954", applianceTypeIds: ["ap-1", "ap-3"], stockQuantity: 2, unitPrice: 450, supplier: "sup-2", minStock: 5 },
];

export const mockSuppliers: Supplier[] = [
  { id: "sup-1", name: "ООО ТехноПартс", contactPerson: "Николаев Николай", phone: "+7 495 123-45-67", email: "sales@technoparts.ru", address: "г. Москва, ул. Промышленная, д. 8", contractDate: "2022-03-15", rating: 4.7 },
  { id: "sup-2", name: "ЗаводЗапчасть", contactPerson: "Фёдорова Анна", phone: "+7 812 765-43-21", email: "order@zavzap.ru", address: "г. Санкт-Петербург, пр. Обуховской обороны, д. 120", contractDate: "2021-11-20", rating: 4.5 },
  { id: "sup-3", name: "ИП Громов В.Д.", contactPerson: "Громов Виктор", phone: "+7 343 555-12-34", email: "gromov@parts.ru", address: "г. Екатеринбург, ул. Ленина, д. 50", contractDate: "2023-06-01", rating: 4.2 },
];

export const mockWarehouses: Warehouse[] = [
  { id: "wh-1", name: "Центральный склад", address: "г. Москва, ул. Складская, д. 1", managerId: "ma-1", capacity: 5000, occupied: 3200 },
  { id: "wh-2", name: "Северный склад", address: "г. Санкт-Петербург, ул. Промышленная, д. 15", managerId: "ma-2", capacity: 3000, occupied: 1800 },
  { id: "wh-3", name: "Уральский склад", address: "г. Екатеринбург, ул. Заводская, д. 3", managerId: "ma-4", capacity: 2000, occupied: 1200 },
];

export const mockPayments: Payment[] = [
  { id: "pa-1", orderId: "or-1", amount: 3500, method: "card", status: "paid", paidAt: "2024-06-10T12:30:00", transactionId: "TXN-000001" },
  { id: "pa-2", orderId: "or-2", amount: 3500, method: "cash", status: "pending", paidAt: null, transactionId: "TXN-000002" },
  { id: "pa-3", orderId: "or-4", amount: 3300, method: "transfer", status: "paid", paidAt: "2024-06-25T11:15:00", transactionId: "TXN-000003" },
  { id: "pa-4", orderId: "or-5", amount: 4000, method: "card", status: "refunded", paidAt: "2024-07-02T09:00:00", transactionId: "TXN-000004" },
];

export const mockReviews: Review[] = [
  { id: "rv-1", orderId: "or-1", clientId: "cl-1", masterId: "ma-1", rating: 5, comment: "Отличная работа, быстро починили холодильник!", createdAt: "2024-06-11", published: true },
  { id: "rv-2", orderId: "or-4", clientId: "cl-5", masterId: "ma-1", rating: 4, comment: "Хорошо справились, но пришлось подождать запчасть", createdAt: "2024-06-26", published: true },
  { id: "rv-3", orderId: "or-1", clientId: "cl-1", masterId: "ma-1", rating: 5, comment: "Мастер очень вежливый и профессиональный", createdAt: "2024-06-12", published: false },
];

export const mockPromotions: Promotion[] = [
  { id: "pr-1", title: "Скидка на ремонт холодильников", description: "15% скидка на все услуги по ремонту холодильников до конца месяца", discountPercent: 15, startDate: "2024-06-01", endDate: "2024-06-30", active: true, promoCode: "COLD15" },
  { id: "pr-2", title: "Акция для новых клиентов", description: "500 рублей скидки при первом обращении", discountPercent: 10, startDate: "2024-01-01", endDate: "2024-12-31", active: true, promoCode: "NEW500" },
  { id: "pr-3", title: "Сезонная скидка на ремонт стиральных машин", description: "20% скидка на замену подшипников", discountPercent: 20, startDate: "2024-07-01", endDate: "2024-08-31", active: false, promoCode: "WASH20" },
];
