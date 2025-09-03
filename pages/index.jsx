import Link from "next/link";

export default function Home() {
  return (
    <main className="container py-12 space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold">School Directory</h1>
      <p className="text-slate-300 max-w-2xl">
        A mini project built with Next.js, MySQL (PlanetScale) and Cloudinary for image uploads.
      </p>
      <div className="flex gap-3">
        <Link href="/addSchool" className="btn btn-primary">Add a School</Link>
        <Link href="/showSchools" className="btn bg-slate-800 hover:bg-slate-700">View Schools</Link>
      </div>
      <div className="card p-6">
        <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
        <ol className="list-decimal pl-5 space-y-1 text-slate-300">
          <li>Create your database on PlanetScale and set env vars in Vercel.</li>
          <li>Create an unsigned upload preset in Cloudinary and set env vars.</li>
          <li>Use the <b>Add a School</b> page to insert data, and <b>View Schools</b> to browse.</li>
        </ol>
      </div>
    </main>
  );
}
