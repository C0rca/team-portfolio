import Providers from './Providers';
import '../src/index.css';
import '../src/App.css'; // if it contains global styles

export const metadata = {
  title: 'C0 Team Portfolio',
  description: 'Team portfolio and content management system.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
