import { FC } from 'react'
import { Redirect, useModel } from 'umi'

const Auth: FC = props => {
  const { initialState } = useModel('@@initialState')

  if (initialState?.currentUser?.userId) {
    return <div>{props.children}</div>
  }

  return <Redirect to='/user/login' />
}

export default Auth
