import { createRoot } from 'react-dom/client';
import { setBaseUrl } from '@workspace/api-client-react';

import App from './App';
import './index.css';

// Set API base URL
setBaseUrl('http://localhost:3001');

createRoot(document.getElementById('root')!).render(<App />);
