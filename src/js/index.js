import '../styles/index.css';
import { createRoot } from 'react-dom/client';
import MediaPage from './mediaPage';

function Test() {
  return <h1>Hello from React!</h1>;
}

function MediaPage() {
    return <MediaPage />
}

const domNode = document.getElementById('movie-page');
const root = createRoot(domNode);
root.render(<MediaPage />);

console.log('App Ready');
