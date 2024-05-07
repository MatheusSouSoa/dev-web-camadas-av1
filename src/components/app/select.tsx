import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectProps {
  placeholder: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  name: string;
  defaultValue?: string;
}

export function Select({
  placeholder,
  options,
  name,
  defaultValue = "",
}: SelectProps) {
  return (
    <SelectRoot
      name={name}
      defaultValue={defaultValue}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
