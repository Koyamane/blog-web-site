/*
 * @Author: dingyun
 * @Date: 2021-12-25 13:34:04
 * @LastEditors: dingyun
 * @Email: dingyun@zhuosoft.com
 * @LastEditTime: 2021-12-25 13:34:06
 * @Description:
 */

import { useCallback } from 'react'
import { FormattedMessage, useIntl } from 'umi'

const useFormItemFillHint = () => {
  const intl = useIntl()

  const fillHint = useCallback(
    (labelId: string) => {
      return (
        <>
          <FormattedMessage id={`pages.${labelId}`} />
          <FormattedMessage id='pages.form.hintSuffix' />
        </>
      )
    },
    [intl.locale]
  )

  return fillHint
}

export default useFormItemFillHint
