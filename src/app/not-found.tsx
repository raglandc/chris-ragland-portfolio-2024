import Link from "next/link"

export default function NotFound()
{
  return (
    <main className="w-full h-screen px-4 md:px-6">
      <div className="h-96 mx-auto max-w-7xl">
        <h1 className="text-red-400">
          Page Not Found
        </h1>
        <p>
          It seems that this page is under construction or cannot be found.
        </p>
        <p>
          Try coming back later.
        </p>
        <Link href="/">Home</Link>
      </div>
    </main>
  )
}