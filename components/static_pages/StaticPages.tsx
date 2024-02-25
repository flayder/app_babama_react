import parse from 'html-react-parser';
import type { TStaticPagesAPI } from '@/types/api/static-pages';
import styles from './StaticPages.module.scss';

type StaticPageProps = TStaticPagesAPI

export function StaticPages({ data }: StaticPageProps) {
  return (
    <div className={`${styles.container}`}>
      <h1>{data.title}</h1>
      <br />
      <br />
      <div>{parse(data.content)}</div>
      <br />
    </div>
  );
}
