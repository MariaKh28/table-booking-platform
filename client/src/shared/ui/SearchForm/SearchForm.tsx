import styles from "./SearchForm.module.css";
import { FormEvent } from "react";

type Props = {
  onSearch: (date: string, partySize?: number) => void;
  loading: boolean;
  date: string;
  setDate: (value: string) => void;
  partySize: number | "";
  setPartySize: (value: number | "") => void;
};

export default function SearchForm({
  onSearch,
  loading,
  date,
  setDate,
  partySize,
  setPartySize,
}: Props): JSX.Element {
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(date, partySize || undefined);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="date">Дата:</label>
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="partySize">Количество гостей:</label>
        <input
          type="number"
          value={partySize}
          onChange={(e) =>
            setPartySize(e.target.value === "" ? "" : Number(e.target.value))
          }
          min="1"
          placeholder="До 6 человек"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !date || !partySize || Number(partySize) > 6}
      >
        {loading ? "Поиск..." : "Найти столы"}
      </button>
    </form>
  );
}
