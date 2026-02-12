import styles from './ProviderErrors.module.css';
import { ProviderError } from '../../shared/types';


type Props = {
  errors: ProviderError[] | null;
};

export default function ProviderErrors({ errors }: Props): JSX.Element | null {
  if (!errors || errors.length === 0) return null;

  return (
    <div className={styles.container}>
      {errors.map((err, i) => (
        <div key={i} className={styles.item}>
          {err.message}
        </div>
      ))}
    </div>
  );
}

