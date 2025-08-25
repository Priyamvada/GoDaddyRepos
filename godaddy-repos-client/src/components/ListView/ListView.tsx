import * as React from 'react';
import { ListItem, ListViewProps } from './listView.types';
import { emptyCellStyle, headerRowStyle, listViewTableStyle, numberCellStyle, rowStyle, selectedRowStyle, tableCellStyle, tableHeaderStyle } from './listView.styles';

export const ListView: React.FC<ListViewProps> = (props) => {
  const { items, columnProps, onItemClick } = props;

  const [selectedItem, setSelectedItem] = React.useState<ListItem | undefined>();

  return (
    <table style={listViewTableStyle}>
      <thead>
        <tr style={{...rowStyle, ...headerRowStyle}}>
          {columnProps.map((col) => (
            <th key={col.key} style={{ ...tableHeaderStyle, ...col.style }}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr
            key={item.id || idx}
            onClick={() => {
              if (selectedItem?.id === item.id) {
                setSelectedItem(undefined);
                return;
              }
              setSelectedItem(item);
              onItemClick?.(item);
            }}
            style={{ ...rowStyle, ...(selectedItem?.id === item.id ? selectedRowStyle : {}) }}
          >
            {columnProps.map((col) => {
              const cellContent = col.render?.(item) ?? item.data?.[col.key];
              let cellStyles = { ...tableCellStyle, ...col.style };
              if (!cellContent) cellStyles = { ...cellStyles, ...emptyCellStyle };
              if (col.type === 'number') cellStyles = { ...cellStyles, ...numberCellStyle };
              return <td key={col.key} style={cellStyles}>{cellContent ?? col.placeholder ?? ''}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}