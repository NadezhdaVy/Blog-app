import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import remarkGfm from 'remark-gfm'

import PostsItem from '../postsItem'

import styles from './postsDetails.module.scss'

function PostsDetails({ match }) {
  const text = ` # Est Ampyciden pater patent
 ## Amor saxa inpiger
  Lorem markdownum Stygias neque is referam fudi, breve per. Et Achaica tamen: nescia ista occupat, illum se ad potest humum et.
  
 ## Qua deos has fontibus
  Recens nec ferro responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo omnes ne pendentia citus pedum.
  
 ## Quamvis pronuba
  Ulli labore facta. Io cervis non nosterque nullae, vides: aethere Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus draconem, hic, Methymnaeae.
  
 1. Clamoribus haesit tenentem iube Haec munera
 2. Clamoribus haesit tenentem iube Haec munera
 3. Paris includere etiam tamen
 4. Superi te putria imagine Deianira
 5. Tremore hoste Esse sed perstat capillis siqua `

  const { articleId } = match.params
  const item = useSelector((state) => state.posts.find((post) => post.id === articleId))

  return (
    <div className={styles.postsDetails}>
      <PostsItem post={item} />
      <div className={styles['postsDetails-body']}>
        {' '}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
    </div>
  )
}

export default PostsDetails
