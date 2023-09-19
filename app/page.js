import { connectDB } from '@/utill/database'
import Link from 'next/link';

export default function Home() {
  // let client = await connectDB;
  // const db = client.db('forum');
  // let result = await db.collection('post').find().toArray();
  return (
    <main>
      <div className="wrapper">
        <Link href="/upload">테스트</Link>
      </div>
    </main>
  )
}
