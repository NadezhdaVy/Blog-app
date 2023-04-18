import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getResource } from '@/api/api';
import { clearArticlesState } from '@/redux/slices/articlesSlice';
import { Article } from '@/ts/interfaces';
import ErrorIndicator from '@/components/errorIndicator';
import ArticlesItem from '@/components/articlesItem';

import styles from './articleDetails.module.scss';

function ArticleDetails() {
  const params = useParams();
  const { slug } = params;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentArticle, setCurrentArticle] = useState<null | Article>(null);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState(true);
  const { status } = useAppSelector((state) => state.articles);
  const { userInfo } = useAppSelector((state) => state.auth);

  async function getCurrentArticle() {
    if (!slug) {
      throw new Error('no slug');
    }
    try {
      setLoading(true);
      const response = await getResource(slug);
      setCurrentArticle(response);
    } catch (e) {
      const err = e as Error;
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCurrentArticle();
  }, []);

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(clearArticlesState());
      navigate('/');
    }
  }, [status]);

  if (loading) {
    return <Spin size="large" className={styles.spinner} />;
  }

  const err = () => {
    setTimeout(() => navigate('/'), 1000);
  };

  if (error || !currentArticle) {
    err();
    return <ErrorIndicator error="The Article was not found" />;
  }

  return (
    <div
      className={
        userInfo.username === currentArticle.author.username ? styles.articleDetails : styles.articleDetailsHidden
      }
    >
      <ArticlesItem article={currentArticle} />
      <div className={styles.articleDetailsBody}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentArticle.body}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ArticleDetails;
