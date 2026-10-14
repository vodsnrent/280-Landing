import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/lib/mockApi";
import { entityConfigs, type EntityConfig, type ColumnConfig } from "@/config/entityConfigs";
import type { EntityName, EntityMap } from "@/types/entities";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Search, Pencil, Trash2, Loader as Loader2 } from "lucide-react";
import { toast } from "sonner";

function formatValue(value: unknown, column: ColumnConfig): React.ReactNode {
  if (value === null || value === undefined) return "—";
  switch (column.type) {
    case "currency":
      return `${Number(value).toLocaleString("ru-RU")} ₽`;
    case "number":
      return Number(value).toLocaleString("ru-RU");
    case "date":
      return new Date(value as string).toLocaleDateString("ru-RU");
    case "datetime":
      return new Date(value as string).toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" });
    case "badge": {
      const strVal = String(value);
      const colorClass = column.badgeColors?.[strVal] ?? "bg-gray-100 text-gray-600";
      return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClass}`}>{strVal === "true" ? "Да" : strVal === "false" ? "Нет" : strVal}</span>;
    }
    default:
      return String(value);
  }
}

function FormField({ field, value, onChange }: { field: EntityConfig["fields"][0]; value: unknown; onChange: (v: unknown) => void }) {
  const baseInput = "w-full";
  switch (field.type) {
    case "textarea":
      return <Textarea className={baseInput} value={value as string ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.label} />;
    case "select":
      return (
        <Select value={value as string ?? ""} onValueChange={onChange}>
          <SelectTrigger className={baseInput}><SelectValue placeholder={field.label} /></SelectTrigger>
          <SelectContent>{field.options?.map((opt) => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
        </Select>
      );
    case "boolean":
      return <Switch checked={!!value} onCheckedChange={onChange} />;
    case "number":
      return <Input className={baseInput} type="number" value={value as number ?? ""} onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))} />;
    case "date":
      return <Input className={baseInput} type="date" value={value as string ?? ""} onChange={(e) => onChange(e.target.value)} />;
    case "datetime":
      return <Input className={baseInput} type="datetime-local" value={value as string ?? ""} onChange={(e) => onChange(e.target.value)} />;
    default:
      return <Input className={baseInput} value={value as string ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.label} />;
  }
}

export default function CrudPage({ entity }: { entity: EntityName }) {
  const config = entityConfigs[entity];
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const { data: items = [], isLoading } = useQuery({
    queryKey: [entity],
    queryFn: () => mockApi.list(entity),
  });

  const createMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => mockApi.create(entity, data as Omit<EntityMap[typeof entity], "id">),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: [entity] }); toast.success("Запись создана"); setDialogOpen(false); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => mockApi.update(entity, id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: [entity] }); toast.success("Запись обновлена"); setDialogOpen(false); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => mockApi.delete(entity, id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: [entity] }); toast.success("Запись удалена"); setDeleteId(null); },
  });

  const openCreate = useCallback(() => {
    setEditingId(null);
    const empty: Record<string, unknown> = {};
    config.fields.forEach((f) => { empty[f.key] = f.type === "boolean" ? false : f.type === "number" ? 0 : ""; });
    setFormData(empty);
    setDialogOpen(true);
  }, [config]);

  const openEdit = useCallback((item: Record<string, unknown>) => {
    setEditingId(item.id as string);
    setFormData({ ...item });
    setDialogOpen(true);
  }, []);

  const handleSubmit = () => {
    const errors: string[] = [];
    config.fields.forEach((f) => { if (f.required && (formData[f.key] === "" || formData[f.key] === undefined)) errors.push(f.label); });
    if (errors.length > 0) { toast.error(`Заполните: ${errors.join(", ")}`); return; }
    if (editingId) { updateMutation.mutate({ id: editingId, data: formData }); }
    else { createMutation.mutate(formData); }
  };

  const filtered = items.filter((item) => {
    if (!search) return true;
    return Object.values(item).some((v) => String(v).toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{config.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">Управление: {config.singular}</p>
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4" /> Добавить</Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-10" placeholder="Поиск..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {config.columns.map((col) => <TableHead key={col.key}>{col.label}</TableHead>)}
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={config.columns.length + 1} className="text-center py-12"><Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" /></TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={config.columns.length + 1} className="text-center py-12 text-muted-foreground">Записей не найдено</TableCell></TableRow>
            ) : (
              filtered.map((item) => (
                <TableRow key={item.id}>
                  {config.columns.map((col) => (
                    <TableCell key={col.key}>{formatValue(item[col.key as keyof typeof item], col)}</TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(item as Record<string, unknown>)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(item.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? `Редактировать: ${config.singular}` : `Создать: ${config.singular}`}</DialogTitle>
            <DialogDescription>Заполните все обязательные поля</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            {config.fields.map((field) => (
              <div key={field.key} className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor={field.key}>{field.label}{field.required && <span className="text-destructive"> *</span>}</Label>
                </div>
                <FormField field={field} value={formData[field.key]} onChange={(v) => setFormData((prev) => ({ ...prev, [field.key]: v }))} />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Отмена</Button>
            <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
              {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="h-4 w-4 animate-spin" />}
              {editingId ? "Сохранить" : "Создать"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить запись?</AlertDialogTitle>
            <AlertDialogDescription>Действие нельзя отменить. Запись будет удалена навсегда.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && deleteMutation.mutate(deleteId)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
