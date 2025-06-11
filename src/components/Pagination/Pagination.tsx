import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';

interface PaginationProps {
  page: number;
  onChange: (page: number) => void;
  search: string;
}

const Pagination = ({ page, onChange, search }: PaginationProps) => {
  const { data } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, search }),
  });

  if (!data || data.totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={data.totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={page - 1}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;
