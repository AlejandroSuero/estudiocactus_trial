export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-6xl font-bold uppercase tracking-tight">
        Welcome to <span className="text-green-400">Estudio Cactus</span>
      </h1>
      <h2 className="text-2xl text-white/80">
        a{" "}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:text-green-500 hover:underline hover:underline-offset-4"
        >
          Next.js
        </a>{" "}
        3D visualizer trial
      </h2>
    </main>
  );
}
