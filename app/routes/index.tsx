import { createRoute } from 'honox/factory'
import RegistrationForm from '../islands/RegistrationForm'
import AuthenticationForm from '../islands/AuthenticationForm'
import BrowserSupport from '../islands/BrowserSupport'

export default createRoute((c) => {
  return c.render(
    <div>
      <div class="header">
        <span class="emoji">🔐</span>
        <h1>HonoX WebAuthn App</h1>
        <p>
          生体認証でセキュアなログインを体験してみよう〜✨<br />
          指紋・顔認証・セキュリティキーが使えるよ〜💕
        </p>
      </div>

      <RegistrationForm />
      <AuthenticationForm />
      <BrowserSupport />
    </div>
  )
}) 