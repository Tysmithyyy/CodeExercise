import '../styles/index.css';
import { createRoot } from 'react-dom/client';
import MediaPage from './mediaPage';

function MediaPage() {
    return <MediaPage />
}

const domNode = document.getElementById('media-page');
const root = createRoot(domNode);
root.render(<MediaPage />);

console.log('App Started');
