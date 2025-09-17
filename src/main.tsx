import "@radix-ui/themes/styles.css";

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme } from "@radix-ui/themes";
import { Analytics } from "@vercel/analytics/react"

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Theme>
        <App />
        <Analytics />
      </Theme>
  </StrictMode>,
)
