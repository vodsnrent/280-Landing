import { useQuery } from "@tanstack/react-query";
import { mockApi } from "@/lib/mockApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Users, GraduationCap, CreditCard, Wrench, TrendingUp, Clock, CircleCheck as CheckCircle2 } from "lucide-react";
import type { EntityName } from "@/types/entities";
import { sidebarItems } from "@/config/entityConfigs";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

function StatCard({ title, value, icon: Icon, color, onClick }: { title: string; value: string | number; icon: LucideIcon; color: string; onClick?: () => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  const { data: orders = [] } = useQuery({ queryKey: ["orders"], queryFn: () => mockApi.list("orders" as EntityName) });
  const { data: clients = [] } = useQuery({ queryKey: ["clients"], queryFn: () => mockApi.list("clients" as EntityName) });
  const { data: masters = [] } = useQuery({ queryKey: ["masters"], queryFn: () => mockApi.list("masters" as EntityName) });
  const { data: payments = [] } = useQuery({ queryKey: ["payments"], queryFn: () => mockApi.list("payments" as EntityName) });

  const activeOrders = orders.filter((o) => o.status === "in_progress" || o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const totalRevenue = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const activeClients = clients.filter((c) => c.status === "active").length;

  const recentOrders = orders.slice(0, 5);
  const statusLabels: Record<string, string> = { pending: "Ожидает", in_progress: "В работе", completed: "Завершён", cancelled: "Отменён" };
  const statusColors: Record<string, string> = { pending: "bg-blue-100 text-blue-700", in_progress: "bg-amber-100 text-amber-700", completed: "bg-emerald-100 text-emerald-700", cancelled: "bg-red-100 text-red-700" };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Дашборд</h1>
        <p className="text-sm text-muted-foreground mt-1">Обзор ключевых показателей системы</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard title="Активные заявки" value={activeOrders} icon={ClipboardList} color="bg-blue-100 text-blue-700" onClick={() => navigate("/admin/orders")} />
        <StatCard title="Завершённые" value={completedOrders} icon={CheckCircle2} color="bg-emerald-100 text-emerald-700" onClick={() => navigate("/admin/orders")} />
        <StatCard title="Активные клиенты" value={activeClients} icon={Users} color="bg-sky-100 text-sky-700" onClick={() => navigate("/admin/clients")} />
        <StatCard title="Выручка" value={`${totalRevenue.toLocaleString("ru-RU")} ₽`} icon={TrendingUp} color="bg-cyan-100 text-cyan-700" onClick={() => navigate("/admin/payments")} />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Последние заявки</CardTitle>
            <CardDescription>Недавно созданные заявки на ремонт</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Wrench className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.orderNumber}</p>
                      <p className="text-xs text-muted-foreground">{order.description}</p>
                    </div>
                  </div>
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[order.status]}`}>{statusLabels[order.status]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Быстрый доступ</CardTitle>
            <CardDescription>Разделы системы</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {sidebarItems.slice(0, 6).map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.name} onClick={() => navigate(`/admin/${item.name}`)}
                    className="flex flex-col items-center gap-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors text-center">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard title="Всего мастеров" value={masters.length} icon={GraduationCap} color="bg-indigo-100 text-indigo-700" onClick={() => navigate("/admin/masters")} />
        <StatCard title="Всего клиентов" value={clients.length} icon={Users} color="bg-teal-100 text-teal-700" onClick={() => navigate("/admin/clients")} />
        <StatCard title="Платежей" value={payments.length} icon={CreditCard} color="bg-orange-100 text-orange-700" onClick={() => navigate("/admin/payments")} />
        <StatCard title="Заявок всего" value={orders.length} icon={Clock} color="bg-purple-100 text-purple-700" onClick={() => navigate("/admin/orders")} />
      </div>
    </div>
  );
}
