export interface ColumnProps {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'boolean';
  sortable?: boolean;
  filterable?: boolean;
}

export interface ListItem {
  id: string;
  pk?: string;
  data: { [key: string]: any };
}

export interface ListViewProps {
  items: ListItem[];
  columnProps: ColumnProps[];
  onItemClick?: (item: ListItem) => void;
}