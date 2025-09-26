import Link from "next/link"


export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              My Starter Template 
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}