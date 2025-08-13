import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from 'honox/server'

export default jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HonoX WebAuthn App 〜生体認証でセキュアログイン💕〜</title>
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
          }
          .header {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 3rem;
            border-radius: 16px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
          }
          .card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
            color: #333;
          }
          .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.2s;
            margin: 8px 0;
            width: 100%;
          }
          .btn:hover {
            transform: translateY(-2px);
          }
          .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
          }
          .input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e1e5e9;
            border-radius: 8px;
            font-size: 16px;
            margin-bottom: 1rem;
            box-sizing: border-box;
          }
          .input:focus {
            outline: none;
            border-color: #667eea;
          }
          .status {
            padding: 12px;
            border-radius: 8px;
            margin-top: 1rem;
          }
          .status.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
          }
          .status.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
          }
          .status.info {
            background: #cce7ff;
            color: #004085;
            border: 1px solid #b3d9ff;
          }
          h1 {
            margin-bottom: 1rem;
            font-size: 2.5rem;
            font-weight: 700;
          }
          h2 {
            margin-bottom: 1rem;
            color: #333;
          }
          p {
            font-size: 1.1rem;
            opacity: 0.9;
            line-height: 1.6;
            margin-bottom: 1rem;
          }
          .emoji {
            font-size: 4rem;
            margin-bottom: 1rem;
            display: block;
          }
        `}</style>
      </head>
      <body>
        <div class="container">
          {children}
        </div>
        <Script src="/app/client.ts" />
      </body>
    </html>
  )
}) 