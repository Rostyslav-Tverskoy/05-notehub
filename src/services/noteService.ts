import axios from 'axios';
import { type Note } from '../types/note';

const API_BASE = 'https://notehub-public.goit.study/api/notes';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${token}`,
};

export interface FetchNotesParams {
  page?: number;
  search?: string;
  perPage?: number;
}


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  if (search.trim() !== '') {
    params.append('search', search.trim());
  }

  const res = await axios.get<FetchNotesResponse>(`${API_BASE}?${params.toString()}`, {
    headers,
  });

  return res.data;
};

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const res = await axios.post<Note>(API_BASE, note, { headers });
  return res.data;
};


export const deleteNote = async (id: number): Promise<Note> => {
  const res = await axios.delete<Note>(`${API_BASE}/${id}`, { headers });
  return res.data;
};
