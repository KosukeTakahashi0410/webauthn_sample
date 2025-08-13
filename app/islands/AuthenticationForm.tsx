import { useState } from 'hono/jsx/dom'

export default function AuthenticationForm() {
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState<'success' | 'error' | 'info'>('info')
  const [isLoading, setIsLoading] = useState(false)

  const handleAuthentication = async () => {
    console.log('handleAuthentication')
    if (!username.trim()) {
      setStatus('ユーザー名を入力してよ〜💦')
      setStatusType('error')
      return
    }

    try {
      setIsLoading(true)
      setStatus('認証開始するよ〜✨')
      setStatusType('info')

      // Get authentication options from server
      const optionsResponse = await fetch('/api/webauthn/authenticate/begin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      })

      if (!optionsResponse.ok) {
        throw new Error('認証オプションの取得に失敗しちゃった💦')
      }

      const options = await optionsResponse.json()

      // Import browser WebAuthn functions
      const { startAuthentication } = await import('@simplewebauthn/browser')

      // Start authentication with the user's authenticator
      const credential = await startAuthentication(options)

      // Send credential to server for verification
      const verificationResponse = await fetch('/api/webauthn/authenticate/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, credential })
      })

      if (!verificationResponse.ok) {
        throw new Error('認証の確認に失敗しちゃった💦')
      }

      const verificationResult = await verificationResponse.json()

      if (verificationResult.verified) {
        setStatus('🎉 認証成功だよ〜！おかえり〜💕')
        setStatusType('success')
        setUsername('')
      } else {
        setStatus('認証に失敗しちゃった💦 もう一回やってみて〜')
        setStatusType('error')
      }
    } catch (error) {
      console.error('Authentication error:', error)
      setStatus(`認証エラーだよ〜💦: ${error instanceof Error ? error.message : '原因不明なの〜'}`)
      setStatusType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div class="card">
      <h2>🔓 ログインしちゃお</h2>
      <p>もう登録済み〜？生体認証でサクッとログイン💕:</p>
      <input
        type="text"
        class="input"
        placeholder="ユーザー名を入れてね〜💕"
        value={username}
        onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
      />
      <button
        class="btn"
        onClick={handleAuthentication}
        disabled={isLoading}
      >
        {isLoading ? '認証中だよ〜⏰' : '生体認証でログイン🔐'}
      </button>
      {status && (
        <div class={`status ${statusType}`}>
          {status}
        </div>
      )}
    </div>
  )
} 