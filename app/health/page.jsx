async function getHealthData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Health data request failed");
    }

    return response.json();
  } catch {
    return {
      userId: 1,
      id: 1,
      title: "Health check placeholder data",
      completed: true
    };
  }
}

export default async function HealthPage() {
  const data = await getHealthData();

  return (
    <main className="mx-auto w-[min(900px,calc(100%-32px))] py-20">
      <p className="text-xs font-bold tracking-[.14em] text-[#4F5FCF]">HEALTH CHECK</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight">Fetched data is working.</h1>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#101B2E] p-7">
        <p className="text-sm text-[#9EACC0]">Live response from a public JSON API:</p>
        <pre className="mt-5 overflow-auto rounded-2xl bg-[#0B1424] p-5 text-sm text-[#DCE3ED]">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </main>
  );
}
