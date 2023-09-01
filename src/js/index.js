import '../styles/index.css';
import { createRoot } from 'react-dom/client';
import MediaPage from './mediaPage';

function MediaPageComponent() {
    return <MediaPage />
}

// Renders mediaPage.js to index.html
const domNode = document.getElementById('media-page');
const root = createRoot(domNode);
root.render(<MediaPageComponent />);

console.log('App Started');
