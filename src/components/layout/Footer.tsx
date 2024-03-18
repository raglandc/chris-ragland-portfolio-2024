"use client"
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="flex flex-col items-center justify-center order-last w-full bg-custom-background h-80 text-custom-textPrimary">
      <p className="mt-5"> Made With ❤️ by Chris Ragland </p>
      <p className="mt-5">&copy; {year} </p>
    </footer>
  )
}
