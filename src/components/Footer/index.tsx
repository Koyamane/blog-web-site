import { useIntl } from 'umi'
import { GithubOutlined } from '@ant-design/icons'
import { DefaultFooter } from '@ant-design/pro-layout'

const Footer: React.FC = () => {
  const intl = useIntl()
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '小山音出品'
  })

  const currentYear = new Date().getFullYear()

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Koyamane',
          title: 'Koyamane',
          href: 'https://github.com/Koyamane',
          blankTarget: true
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Koyamane/blog-web-site',
          blankTarget: true
        }
      ]}
    />
  )
}

export default Footer
