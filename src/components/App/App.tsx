import { useState, useEffect } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import NoteModal from '../NoteModal/NoteModal';
import styles from './App.module.css';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import type { Note } from '../../services/noteService';

const App = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, isError, isSuccess } = useQuery<{
    notes: Note[];
    totalPages: number;
  }>({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes({ search: debouncedSearch, page }),
    enabled: debouncedSearch.length >= 0, 
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <Pagination
          page={page}
          pageCount={data?.totalPages ?? 0}
          onChange={handlePageChange}
        />
        <button className={styles.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <NoteList
        notes={data?.notes ?? []}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
      />

      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default App;
