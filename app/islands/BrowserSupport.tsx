import { useState, useEffect } from 'hono/jsx/dom'

export default function BrowserSupport() {
  const [supportStatus, setSupportStatus] = useState('WebAuthnのサポート状況をチェック中だよ〜⏰')
  const [statusType, setStatusType] = useState<'success' | 'error' | 'info'>('info')

  useEffect(() => {
    // Check WebAuthn support when component mounts
    if (typeof window !== 'undefined' && window.PublicKeyCredential) {
      setSupportStatus('✅ このブラウザはWebAuthnに対応してるよ〜！やったじゃん💕')
      setStatusType('success')
    } else {
      setSupportStatus('❌ このブラウザはWebAuthnに対応してないの〜💦')
      setStatusType('error')
    }
  }, [])

  return (
    <div class="card">
      <h2>ℹ️ ブラウザ対応状況</h2>
      <div class={`status ${statusType}`}>
        {supportStatus}
      </div>
    </div>
  )
} 