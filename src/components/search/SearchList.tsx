import { useContext } from 'react';
import SearchContext from '../context/SearchContext';
import styles from './SearchList.module.scss';

export default function SearchList() {
  const { tags, setTags } = useContext(SearchContext);

  const removeTag = (tag: string) => {
    setTags(tags?.filter((value) => value !== tag));
  };
  return (
    <div className={styles.tag}>
      <div className={styles.tag__title}>최근 검색어</div>
      {tags.map((tag, index) => (
        <div key={index} className={styles.tag__box}>
          <div>{tag}</div>
          <button className={styles.tag__btn} onClick={() => removeTag(tag)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}
