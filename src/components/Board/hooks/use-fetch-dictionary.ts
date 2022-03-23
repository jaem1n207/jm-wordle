import { useFetch } from '@/hooks';

const baseUrl = `https://api.dictionaryapi.dev/api/v2/entries/en`;

interface IProps {
  target: string;
}

export interface IWordDefinitions {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: Meaning[];
}

interface Phonetic {
  text: string;
  audio?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface Definition {
  definition: string;
  example: string;
  synonyms: any[];
  antonyms: any[];
}

export function useFetchDictionary({ target }: IProps) {
  const url = `${baseUrl}/${target}`;
  const { data, error } = useFetch<IWordDefinitions>(url);

  return { data, error };
}
