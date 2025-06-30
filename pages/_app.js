import '../styles.css'; // This is the correct way!
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
