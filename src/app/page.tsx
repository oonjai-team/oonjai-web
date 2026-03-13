import Navbar from "@/components/ui/landing/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex items-center justify-center">
        <h1 className="text-4xl font-semibold">Hello Oonjai hi!</h1>
        <h2 className="text-oonjai-blue-400 font-medium text-4xl">Text</h2>
      </div>
    </>
  );
}
