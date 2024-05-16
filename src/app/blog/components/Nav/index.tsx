import Link from 'next/link'

const Nav = () => {
  return (
    <div className="bg-gray-100 pt-12 px-4">
      <ul className="flex gap-4">
        <li>
          <Link href="/blog/[category]" as="/blog">
            All posts
          </Link>
        </li>
        <li>
          <Link href="/blog/[category]" as="/blog/A">
            Engineering
          </Link>
        </li>
        <li>
          <Link href="/blog/[category]" as="/blog/B">
            Community
          </Link>
        </li>
        <li>
          <Link href="/blog/[category]" as="/blog/C">
            Company news
          </Link>
        </li>
        <input type="search" placeholder="Search posts..." className="ml-auto" />
      </ul>
    </div>
  )
}

export default Nav
