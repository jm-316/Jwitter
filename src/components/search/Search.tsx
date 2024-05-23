import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { IoSearchSharp } from 'react-icons/io5';
import React, { useContext, useEffect, useState } from 'react';
import { PostProps, SearchProps } from '../../type';
import { searchHashTags } from '../../api/firebase';
import PostList from '../posts/PostList';
import SearchContext from '../context/SearchContext';
import SearchList from './SearchList';
import styles from './Search.module.scss';

export default function Search({ isHome }: SearchProps) {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [tagQuery, setTagQuery] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const { tags, setTags } = useContext(SearchContext);

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagQuery(e?.target.value?.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagQuery.trim() !== '') {
      setTags((prev) => (prev.length > 0 ? [...prev, tagQuery] : [tagQuery]));
      setSearchParams({ query: tagQuery });
      if (isHome) {
        navigate(`/search?query=${tagQuery}`);
      }
    }
  };

  useEffect(() => {
    if (searchParams) {
      const currentQuery = searchParams.get('query') || '';
      searchHashTags(currentQuery, setPosts);
    }
  }, [searchParams]);

  return (
    <div className={`${isHome ? styles.search : styles.searchLg}`}>
      <div className={styles.search__div}>
        <div className={styles.search__iconBox}>
          <IoSearchSharp className={styles.search__icon} />
        </div>
        <input
          placeholder="해시태그 검색"
          className={styles.search__input}
          onChange={onChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        {posts?.length > 0 ? (
          posts.map((post) => <PostList post={post} key={post.id} />)
        ) : (
          <div className={`${isHome ? styles.hidden : styles.search__post}`}>
            게시글이 없습니다.
          </div>
        )}
        {isHome && tags && <SearchList />}
      </div>
    </div>
  );
}
