import styles from "./SearchPage.module.css";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import TableList from "../../widgets/TableList/ui/TableList";
import ProviderErrors from "../../widgets/ProviderErrors/ProviderErrors";
import { ArrayTableType } from "../../entities/table/model";
import TableApi from "../../entities/table/api/TableApi";
import { ProviderError } from "../../shared/types";
import SearchForm from "../../shared/ui/SearchForm/SearchForm";

export default function SearchPage(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(searchParams.get("date") || today);
  const [partySize, setPartySize] = useState<number | "">(
    (searchParams.get("partySize") && Number(searchParams.get("partySize"))) ||
      "",
  );
  const [tables, setTables] = useState<ArrayTableType>([]);
  const [submittedPartySize, setSubmittedPartySize] = useState<number | "">("");
  const [providerErrors, setProviderErrors] = useState<ProviderError[] | null>(
    null,
  );
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(
    async (searchDate: string, searchPartySize?: number) => {
      setLoading(true);
      setTables([]);
      setProviderErrors(null);
      setSubmittedPartySize(searchPartySize || "");

      const params: Record<string, string> = { date: searchDate };
      if (searchPartySize) params.partySize = String(searchPartySize);
      setSearchParams(params, { replace: true });

      try {
        const { data, error, statusCode } = await TableApi.getTables({
          date: searchDate,
          partySize: searchPartySize,
        });

        if (statusCode === 200 && data) {
          setTables(data);
        }
        if (error && Array.isArray(error)) {
          setProviderErrors(error);
        }
      } catch (error: unknown) {
        console.error("Ошибка поиска:", error);
      } finally {
        setLoading(false);
        setSearched(true);
      }
    },
    [setSearchParams],
  );

  useEffect(() => {
    const paramDate = searchParams.get("date");
    const paramPartySize = searchParams.get("partySize");

    if (paramDate) {
      handleSearch(
        paramDate,
        (paramPartySize && Number(paramPartySize)) || undefined,
      );
    }
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Поиск столов для бронирования</h1>

      <SearchForm
        onSearch={handleSearch}
        loading={loading}
        date={date}
        setDate={setDate}
        partySize={partySize}
        setPartySize={setPartySize}
      />

      {loading && <div className={styles.loading}>Загрузка...</div>}

      <ProviderErrors errors={providerErrors} />

      {!loading && searched && (
        <TableList tables={tables} partySize={submittedPartySize || ""} />
      )}
    </div>
  );
}
