export interface ColumnProps {
  key: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'icon';
  render?: (item?: ListItem) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
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