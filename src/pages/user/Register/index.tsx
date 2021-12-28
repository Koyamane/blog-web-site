import type { FC } from 'react'
import { Button } from 'antd'
import { Link } from 'umi'

import styles from './index.less'
import ProForm from '@ant-design/pro-form'

// const FormItem = Form.Item

// const passwordStatusMap = {
//   ok: (
//     <div className={styles.success}>
//       <span>强度：强</span>
//     </div>
//   ),
//   pass: (
//     <div className={styles.warning}>
//       <span>强度：中</span>
//     </div>
//   ),
//   poor: (
//     <div className={styles.error}>
//       <span>强度：太短</span>
//     </div>
//   )
// }

// const passwordProgressMap: {
//   ok: 'success';
//   pass: 'normal';
//   poor: 'exception';
// } = {
//   ok: 'success',
//   pass: 'normal',
//   poor: 'exception'
// }

const Register: FC = () => {
  // const [count, setCount]: [number, any] = useState(0)
  // const [visible, setVisible]: [boolean, any] = useState(false)
  // const [prefix, setPrefix]: [string, any] = useState('86')
  // const [popover, setPopover]: [boolean, any] = useState(false)
  // const confirmDirty = false
  // let interval: number | undefined
  // const [form] = Form.useForm()

  // useEffect(
  //   () => () => {
  //     clearInterval(interval)
  //   },
  //   [interval],
  // )

  // const onGetCaptcha = () => {
  //   let counts = 59
  //   setCount(counts)
  //   interval = window.setInterval(() => {
  //     counts -= 1
  //     setCount(counts)
  //     if (counts === 0) {
  //       clearInterval(interval)
  //     }
  //   }, 1000)
  // }

  // const getPasswordStatus = () => {
  //   const value = form.getFieldValue('password')
  //   if (value && value.length > 9) {
  //     return 'ok'
  //   }
  //   if (value && value.length > 5) {
  //     return 'pass'
  //   }
  //   return 'poor'
  // }

  // const { loading: submitting, run: register } = useRequest<{ data: StateType }>(fakeRegister, {
  //   manual: true,
  //   onSuccess: (data, params) => {
  //     if (data.status === 'ok') {
  //       message.success('注册成功！')
  //       history.push({
  //         pathname: '/user/register-result',
  //         state: {
  //           account: params.email
  //         }
  //       })
  //     }
  //   }
  // })

  // const checkConfirm = (_: any, value: string) => {
  //   const promise = Promise
  //   if (value && value !== form.getFieldValue('password')) {
  //     return promise.reject('两次输入的密码不匹配!')
  //   }
  //   return promise.resolve()
  // }

  // const checkPassword = (_: any, value: string) => {
  //   const promise = Promise
  //   // 没有值的情况
  //   if (!value) {
  //     setVisible(!!value)
  //     return promise.reject('请输入密码!')
  //   }
  //   // 有值的情况
  //   if (!visible) {
  //     setVisible(!!value)
  //   }
  //   setPopover(!popover)
  //   if (value.length < 6) {
  //     return promise.reject('')
  //   }
  //   if (value && confirmDirty) {
  //     form.validateFields(['confirm'])
  //   }
  //   return promise.resolve()
  // }

  // const renderPasswordProgress = () => {
  //   const value = form.getFieldValue('password')
  //   const passwordStatus = getPasswordStatus()
  //   return value && value.length ? (
  //     <div className={styles[`progress-${passwordStatus}`]}>
  //       <Progress
  //         status={passwordProgressMap[passwordStatus]}
  //         className={styles.progress}
  //         strokeWidth={6}
  //         percent={value.length * 10 > 100 ? 100 : value.length * 10}
  //         showInfo={false}
  //       />
  //     </div>
  //   ) : null
  // }

  const submitBox = (props: any) => {
    return [
      <Button
        type='primary'
        key='register'
        // loading={submitting}
        className={styles.submitButton}
        onClick={() => props.form?.submit?.()}
      >
        <span>注册</span>
      </Button>,
      <Link key='goLogin' to='/user/login'>
        使用已有账户登录
      </Link>
    ]
  }

  return (
    <div className='ant-pro-form-login-container'>
      <div className='ant-pro-form-login-top'>
        <div className='ant-pro-form-login-header'>
          <span className='ant-pro-form-login-logo'>
            <img alt='logo' src='/logo.svg' />
          </span>
          <span className='ant-pro-form-login-title'>山音曦</span>
        </div>
        <div className='ant-pro-form-login-desc'>注册属于你的专属账号</div>
      </div>

      <div className='ant-pro-form-login-main'>
        <ProForm
          className={styles.form}
          layout='vertical'
          submitter={{
            render: submitBox
          }}
        >
          {/* <Popover
            getPopupContainer={(node) => {
              if (node && node.parentNode) {
                return node.parentNode as HTMLElement
              }
              return node
            }}
            content={
              visible && (
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[getPasswordStatus()]}
                  {renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                  </div>
                </div>
              )
            }
            overlayStyle={{ width: 240 }}
            placement="right"
            visible={visible}
          >
            <FormItem
              name="password"
              className={
                form.getFieldValue('password') &&
                form.getFieldValue('password').length > 0 &&
                styles.password
              }
              rules={[
                {
                  validator: checkPassword
                }
              ]}
            >
              <Input size="large" type="password" placeholder="至少6位密码，区分大小写" />
            </FormItem>
          </Popover>
          <FormItem
            name="confirm"
            rules={[
              {
                required: true,
                message: '确认密码'
              },
              {
                validator: checkConfirm
              }
            ]}
          >
            <Input size="large" type="password" placeholder="确认密码" />
          </FormItem>

          <Row gutter={8}>
            <Col span={16}>
              <FormItem
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码!'
                  }
                ]}
              >
                <Input size="large" placeholder="验证码" />
              </FormItem>
            </Col>
            <Col span={8}>
              <Button
                size="large"
                disabled={!!count}
                onClick={onGetCaptcha}
              >
                {count ? `${count} s` : '获取验证码'}
              </Button>
            </Col>
          </Row> */}
        </ProForm>
      </div>
    </div>
  )
}
export default Register
