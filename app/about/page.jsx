export default function AboutPage() {
  return (
    <main className="mx-auto w-[min(1000px,calc(100%-32px))] py-20">
      <p className="text-xs font-bold tracking-[.14em] text-[#7785FF]">ABOUT</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight">I learn by building.</h1>

      <div className="mt-10 grid gap-7 md:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-[#101B2E] p-7">
          <h2 className="text-2xl font-bold">About me</h2>
          <p className="mt-4 leading-8 text-[#9EACC0]">
            I’m a Computer Science student who enjoys working across software development,
            testing, games, AI, and technical systems. I like understanding a problem by
            building it and learning from what breaks.
          </p>
        </section>
        <section className="rounded-3xl border border-white/10 bg-[#101B2E] p-7">
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="mt-4 leading-8 text-[#9EACC0]">
            React · JavaScript · C++ · C# · Python · Java · SQL · Selenium · TestNG · Maven · Unity · Git · GitHub
          </p>
        </section>
      </div>
    </main>
  );
}
