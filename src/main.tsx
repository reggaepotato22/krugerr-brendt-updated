import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'
import { CurrencyProvider } from './context/CurrencyContext'
import { ThemeProvider } from './context/ThemeContext'
import { PropertyProvider } from './context/PropertyContext'
import { InquiryProvider } from './context/InquiryContext.tsx'
import { ChatProvider } from './context/ChatContext.tsx'
import { VisitProvider } from './context/VisitContext.tsx'
import './index.css'
import 'leaflet/dist/leaflet.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <CurrencyProvider>
          <PropertyProvider>
            <InquiryProvider>
              <ChatProvider>
                <VisitProvider>
                  <App />
                </VisitProvider>
              </ChatProvider>
            </InquiryProvider>
          </PropertyProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
