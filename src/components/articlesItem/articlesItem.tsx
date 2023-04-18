import { Card, Avatar, Tag, Space, Button, Skeleton } from 'antd';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@/redux/store';
import { Article } from '@/ts/interfaces';
import Popconfirm from '@components/popconfirm';
import convertTime from '@/utils/formatDate';
import RateItem from '@components/rateItem';

import { articlesDetails, editArticle } from '../../router/routePaths';

import styles from './articlesItem.module.scss';

type Props = {
  article: Article;
};

function ArticlesItem({ article }: Props) {
  const renderTags = ({ tagList }: Article) => {
    let id = 1;
    const renderedTags = tagList.map((tag) => (
      <Tag key={(id += 1)} className={styles.tag}>
        <a href="#top">{tag}</a>
      </Tag>
    ));

    return (
      <Space size={1} className={styles.tags}>
        {renderedTags}
      </Space>
    );
  };

  const acountDescription = ({ author, updatedAt }: Article) => (
    <div className={styles.personInfo}>
      <div className={styles.description}>
        <div>{author.username}</div>
        <div>{convertTime(updatedAt)}</div>
      </div>

      <Avatar onError={() => false} className={styles.avatar} src={author.image} size={42} />
    </div>
  );

  const { status } = useAppSelector((state) => state.articles);
  if (status === 'loading') {
    return (
      <>
        <Space style={{ position: 'absolute', right: 0, top: 9 }}>
          <Skeleton.Input style={{ height: 20 }} />
          <Skeleton.Avatar />
        </Space>
        <Skeleton
          active
          paragraph={{
            rows: 3,
          }}
        />
      </>
    );
  }

  return (
    <Card
      bordered={false}
      className={styles.articlesItem}
      extra={acountDescription(article)}
      title={
        <Space size={4} direction="vertical">
          <Space size={10}>
            <Link className={styles.title} to={articlesDetails(article.slug)}>
              {article.title}
            </Link>
            <RateItem stars={article.favoritesCount} slug={article.slug} favorited={article.favorited} />
          </Space>
          {renderTags(article)}
        </Space>
      }
    >
      <div className={styles.container}>
        <p className={styles.content}>{article.description}</p>
        <Space className={styles.buttons}>
          <Popconfirm slug={article.slug}>
            <Button>Delete</Button>
          </Popconfirm>

          <Link to={editArticle(article.slug)}>
            <Button>Edit</Button>
          </Link>
        </Space>
      </div>
    </Card>
  );
}

export default ArticlesItem;
