export default function ContactPage() {
  return (
    <main className="mx-auto w-[min(820px,calc(100%-32px))] py-20">
      <p className="text-xs font-bold tracking-[.14em] text-[#AAB2FF]">CONTACT</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight">Let’s talk.</h1>
      <p className="mt-4 leading-7 text-[#9EACC0]">
        Have a project, opportunity, or question? Send me a message.
      </p>

      <form className="mt-9 rounded-3xl border border-white/10 bg-[#101B2E] p-7">
        <div className="grid gap-5">
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Name</span>
            <input required name="name" className="rounded-xl border border-white/10 bg-[#0B1424] px-4 py-3 outline-none focus:border-[#4F5FCF]" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Email</span>
            <input required type="email" name="email" className="rounded-xl border border-white/10 bg-[#0B1424] px-4 py-3 outline-none focus:border-[#4F5FCF]" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-semibold">Message</span>
            <textarea required name="message" rows="6" className="rounded-xl border border-white/10 bg-[#0B1424] px-4 py-3 outline-none focus:border-[#4F5FCF]" />
          </label>
          <button type="button" className="rounded-xl bg-[#4F5FCF] px-5 py-3 font-bold">Send message</button>
        </div>
      </form>
    </main>
  );
}
