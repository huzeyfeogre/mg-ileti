import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface ListEditorProps {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}

export const ListEditor = ({ label, values, onChange, placeholder, addLabel = "Ekle" }: ListEditorProps) => {
  const update = (i: number, v: string) => onChange(values.map((x, idx) => (idx === i ? v : x)));
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  const add = () => onChange([...values, ""]);
  return (
    <div>
      <Label>{label}</Label>
      <div className="space-y-2 mt-2">
        {values.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input value={v} onChange={(e) => update(i, e.target.value)} placeholder={placeholder} />
            <Button type="button" size="icon" variant="ghost" onClick={() => remove(i)}>
              <X className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        ))}
        <Button type="button" size="sm" variant="outline" onClick={add}>
          <Plus className="w-4 h-4 mr-1" /> {addLabel}
        </Button>
      </div>
    </div>
  );
};
