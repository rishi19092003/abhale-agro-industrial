import dynamic from 'next/dynamic';
const ScrollSite = dynamic(() => import('../ScrollSite'), { ssr: false });
export default function Home() {
  return <ScrollSite />;
}
