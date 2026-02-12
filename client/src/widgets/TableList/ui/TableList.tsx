import styles from "./TableList.module.css";
import { ArrayTableType } from "../../../entities/table/model";
import TableCard from "../../../entities/table/ui/TableCard";

type Props = {
  tables: ArrayTableType;
  partySize?: number | string;
};

export default function TableList({ tables, partySize }: Props): JSX.Element {
  const filtered = partySize
    && tables.filter((t) => t.seats >= Number(partySize))
    || tables;

  const sortedTables = [...filtered].sort((a, b) => a.seats - b.seats);

  if (sortedTables.length === 0) {
    return <div className={styles.noResults}>Столы не найдены</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Найдено столов: {sortedTables.length}</h2>
      <div className={styles.list}>
        {sortedTables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>
    </div>
  );
}
