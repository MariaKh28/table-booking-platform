import styles from './TableCard.module.css';
import { Table } from '../model';


type Props  = {
  table: Table;
}

export default function TableCard({ table }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p className={styles.title}>Стол {table.id}</p>
        <p className={styles.text}>
          <span className={styles.label}>Мест:</span> {table.seats}
        </p>
        <p className={styles.text}>
          <span className={styles.label}>Статус:</span>
          <span className={table.available && styles.available || styles.unavailable}>
            {table.available && 'Доступен' || 'Занят'}
          </span>
        </p>
        <p className={styles.provider}>
          <span className={styles.label}>Источник:</span> {table.provider}
        </p>
      </div>
    </div>
  );
}



