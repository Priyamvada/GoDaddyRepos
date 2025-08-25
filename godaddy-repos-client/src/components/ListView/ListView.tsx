import * as React from 'react';
import { ListViewProps } from './listView.types';

const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export const ListView: React.FC<ListViewProps> = (props) => {
  const { items, columnProps, onItemClick } = props;

  const [selectedItem, setSelectedItem] = React.useState<any>(null);

  return (
    <table>
      <thead>
        <tr>
          {columnProps.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr
            key={item.id || idx}
            onClick={() => {
              setSelectedItem(item);
              onItemClick?.(item);
            }}
            style={{
              cursor: 'pointer',
              background: selectedItem === item ? '#f0f0f0' : undefined,
            }}
          >
            {columnProps.map((col) => (
              <td key={col.key}>{(item as any)[col.key] ?? ''}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
/*
For each row display: Repo name, description, language, forks, stars, last updated date, owner
Actions:
- On click launch detail panel
- On detail panel provide option to view details in full page mode
*/