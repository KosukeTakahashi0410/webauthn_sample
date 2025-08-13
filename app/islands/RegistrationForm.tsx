import { useState } from 'hono/jsx/dom'

export default function RegistrationForm() {
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState<'success' | 'error' | 'info'>('info')
  const [isLoading, setIsLoading] = useState(false)

  const handleRegistration = async () => {
    if (!username.trim()) {
      setStatus('ユーザー名を入力してよ〜💦')
      setStatusType('error')
      return
    }

    try {
      setIsLoading(true)
      setStatus('登録開始するよ〜✨')
      setStatusType('info')

      // Get registration options from server
      const optionsResponse = await fetch('/api/webauthn/register/begin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      })

      if (!optionsResponse.ok) {
        throw new Error('登録オプションの取得に失敗しちゃった💦')
      }

      const options = await optionsResponse.json()

      // Import browser WebAuthn functions
      const { startRegistration } = await import('@simplewebauthn/browser')

      // Start registration with the user's authenticator
      const credential = await startRegistration(options)

      // Send credential to server for verification
      const verificationResponse = await fetch('/api/webauthn/register/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, credential })
      })

      if (!verificationResponse.ok) {
        throw new Error('登録の確認に失敗しちゃった💦')
      }

      const verificationResult = await verificationResponse.json()

      if (verificationResult.verified) {
        setStatus('🎉 登録完了だよ〜！今度から生体認証でログインできるじゃん✨')
        setStatusType('success')
        setUsername('')
      } else {
        setStatus('登録に失敗しちゃった💦 もう一回やってみて〜')
        setStatusType('error')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setStatus(`登録エラーだよ〜💦: ${error instanceof Error ? error.message : '原因不明なの〜'}`)
      setStatusType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div class="card">
      <h2>📝 新規登録だよ〜</h2>
      <p>初めまして〜？生体認証で登録しちゃお✨:</p>
      <input
        type="text"
        class="input"
        placeholder="ユーザー名を入れてね〜💕"
        value={username}
        onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
      />
      <button
        class="btn"
        onClick={handleRegistration}
        disabled={isLoading}
      >
        {isLoading ? '登録中だよ〜⏰' : '生体認証で登録しちゃう🔐'}
      </button>
      {status && (
        <div class={`status ${statusType}`}>
          {status}
        </div>
      )}
    </div>
  )
} 