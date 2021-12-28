import React from 'react'
import { SelectLang } from 'umi'
import Footer from '@/components/Footer'
import styles from './index.less'

const User: React.FC = props => {
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang reload={false} />}
      </div>

      <div className={styles.content}>{props.children}</div>
      <Footer />
    </div>
  )
}

export default User
