import { QuestionSearch } from '@/components/question-search';
import { getSearchIndex } from '@/lib/content';

export const metadata = { title: 'Search DSA Questions' };

export default async function SearchPage() {
  const index = await getSearchIndex();
  return <main><QuestionSearch index={index} /></main>;
}
