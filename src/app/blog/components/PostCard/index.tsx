'use client'

const PostCard = ({ title, summary, category, author, postDate }: Props) => {
  return (
    <div className="items-stretch">
      <p className="text-[12px] leading-4 text-neutral-600 gap-8 mb-1">{category}</p>
      <h2 className="p-0 text-[24px] font-bold tracking-tight leading-8">{title}</h2>
      <div className="flex flex-row-reverse justify-end items-center gap-3 pt-3">
        <div>
          <p className="m-0 text-[14px] text-neutral-600">{postDate}</p>
        </div>
        <div className="h-[25px] w-[25px]">
          <img className="w-6 h-6 rounded-full" src={author.image} alt={author.name} />
        </div>
      </div>
    </div>
  )
}

interface Props {
  title: string
  postDate: string
  summary: string
  category: string
  author: { link: string; role: string; name: string; image: string }
}

export default PostCard
