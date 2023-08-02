"use client"

export default function ErrorPage()
{
  return (
    <main className="w-full h-screen px-4 md:px-6 flex items-center">
      <div className="mx-auto max-w-7xl border-red-400 border flex flex-col justify-center p-4 md:p-6 rounded-xl space-y-2 shadow-xl shadow-red-300/20">
        <h1 className="text-red-400 font-semibold text-xl">
          Error
        </h1>
        <div className="text-custom-textSecondary">
          <p>Strange, it seems that something went wrong.</p>
          <p>Try again or come back later.</p>
          <p>We apologize for any inconvenience.</p>
        </div>
      </div>
    </main>
  )
}