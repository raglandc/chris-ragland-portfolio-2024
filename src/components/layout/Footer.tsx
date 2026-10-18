import NetworkBackground from '@/components/animation/NetworkBackground'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative flex flex-col items-center justify-center order-last w-full overflow-hidden bg-custom-background h-80 text-custom-textPrimary">
      <NetworkBackground className="absolute inset-0 h-full w-full footer-network-mask" />
      <p className="relative mt-5"> Made with ❤️ by Chris Ragland </p>
      <p className="relative mt-5">&copy; {year} </p>
    </footer>
  )
}
