import Image from 'next/image' // 👈 Use Next.js Image
import DateComponent from '@/app/components/Date'
import { urlForImage } from '@/sanity/lib/utils'

type Props = {
  person: {
    firstName: string | null
    lastName: string | null
    picture?: any
  }
  date?: string
  small?: boolean
}

export default function Avatar({ person, date, small = false }: Props) {
  const { firstName, lastName, picture } = person

  return (
    <div className="flex items-center font-mono">
      {picture?.asset?._ref ? (
        <div className={`relative overflow-hidden rounded-full ${small ? 'h-6 w-6 mr-2' : 'h-9 w-9 mr-4'}`}>
          <Image
            src={urlForImage(picture).height(96).width(96).fit('crop').url()} // Optimized for small avatar
            alt={picture?.alt || 'Author Avatar'}
            fill
            className="object-cover rounded-full"
            sizes="48px"
          />
        </div>
      ) : (
        <div className="mr-1">By </div>
      )}
      <div className="flex flex-col">
        {firstName && lastName && (
          <div className={`${small ? 'text-sm' : ''}`}>
            {firstName} {lastName}
          </div>
        )}
        <div className={`text-gray-500 ${small ? 'text-xs' : 'text-sm'}`}>
          <DateComponent dateString={date} />
        </div>
      </div>
    </div>
  )
}