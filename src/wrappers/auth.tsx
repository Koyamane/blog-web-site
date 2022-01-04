import { FC } from 'react'
import { RouteChildrenProps } from 'react-router'
import { Redirect, useModel } from 'umi'

const Auth: FC<RouteChildrenProps> = ({ children, location }) => {
  const { initialState } = useModel('@@initialState')

  if (initialState?.currentUser?.userId) {
    return <div>{children}</div>
  }

  return <Redirect to={`/user/login?redirect=${location?.pathname}`} />
}

export default Auth
