import { useState, useEffect } from 'react';
import { List } from 'antd';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchArticles } from '@/redux/slices/articlesSlice';
import PostsItem from '@components/articlesItem';
import ErrorIndicator from '@components/errorIndicator';

import styles from './articlesList.module.scss';

function ArticlesList() {
  const dispath = useAppDispatch();
  const { articles, error } = useAppSelector((state) => state.articles);

  const totalPages = useAppSelector((state) => state.articles.totalPages);

  const [currentPage, setCurrentPage] = useState(0);

  const onChangePage = (page: number): void => {
    setCurrentPage((page - 1) * 10);
  };

  useEffect(() => {
    dispath(fetchArticles(currentPage));
  }, []);

  useEffect(() => {
    dispath(fetchArticles(currentPage));
  }, [currentPage]);

  if (error) return <ErrorIndicator error="something went wrong" />;

  return (
    <List
      pagination={{
        onChange: (page) => onChangePage(page),
        align: 'center',
        total: totalPages,
        showSizeChanger: false,
      }}
      className={styles.articlesList}
      grid={{ column: 1 }}
      dataSource={articles}
      renderItem={(article) => (
        <List.Item key={article.slug}>
          <PostsItem article={article} />
        </List.Item>
      )}
    />
  );
}

export default ArticlesList;
