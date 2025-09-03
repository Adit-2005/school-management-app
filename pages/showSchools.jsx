import { useEffect, useState } from "react";
import Link from "next/link";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch("/api/getSchools")
      .then(res => res.json())
      .then(data => setSchools(data || []));
  }, []);

  const filtered = schools.filter(s =>
    [s.name, s.city, s.address].join(" ").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <main className="container py-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Schools</h1>
        <div className="flex gap-3">
          <input
            className="input w-72"
            placeholder="Search by name, city, address"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Link href="/addSchool" className="btn btn-primary">Add School</Link>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-6 text-slate-300">No schools found. Try adding one.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((school) => (
            <div key={school.id} className="card overflow-hidden">
              <img src={school.image} alt={school.name} className="h-40 w-full object-cover" />
              <div className="p-4 space-y-1">
                <h2 className="text-lg font-semibold">{school.name}</h2>
                <p className="text-slate-400 text-sm">{school.address}</p>
                <p className="text-slate-400 text-sm">{school.city}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
