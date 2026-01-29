import {NextResponse} from 'next/server'
import {PDFDocument, StandardFonts, rgb} from 'pdf-lib'
import {client} from '@/sanity/lib/client'

export const runtime = 'nodejs'

const portableTextToString = (blocks: any[] = []) =>
  blocks
    .map((block) => {
      if (block._type !== 'block') return ''
      return block.children?.map((child: any) => child.text).join('')
    })
    .join('\n\n')

const wrapText = (text: string, font: any, fontSize: number, maxWidth: number) => {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const width = font.widthOfTextAtSize(testLine, fontSize)

    if (width <= maxWidth) {
      currentLine = testLine
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }

  if (currentLine) lines.push(currentLine)
  return lines
}

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url)
  const type = searchParams.get('type')

  if (type !== 'privacy' && type !== 'terms') {
    return new NextResponse('Invalid document type', {status: 400})
  }

  const pageData = await client.fetch(
    `
    *[_type == "page" && legalType == $type][0]{
      pageBuilder[_type == "richTextSection"][0]{
        title,
        lastUpdated,
        legalSections[]{
          heading,
          content
        }
      }
    }
    `,
    {type},
  )

  if (!pageData?.pageBuilder) {
    return new NextResponse('Legal content not found', {status: 404})
  }

  const {title, lastUpdated, legalSections} = pageData.pageBuilder

  const filename = type === 'privacy' ? 'privacy-policy.pdf' : 'terms-of-service.pdf'

  const pdfDoc = await PDFDocument.create()
  let page = pdfDoc.addPage([595, 842])

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const {height, width} = page.getSize()
  let y = height - 60

  const ensureSpace = () => {
    if (y < 80) {
      page = pdfDoc.addPage([595, 842])
      y = height - 60
    }
  }

  // Title
  page.drawText(title, {
    x: 50,
    y,
    size: 22,
    font: boldFont,
  })

  y -= 24

  // Last updated
  if (lastUpdated) {
    page.drawText(`Last updated: ${lastUpdated}`, {
      x: 50,
      y,
      size: 10,
      font,
    })
    y -= 30
  }

  // Sections
  legalSections.forEach((section: any, index: number) => {
    ensureSpace()

    page.drawText(`${index + 1}. ${section.heading}`, {
      x: 50,
      y,
      size: 14,
      font: boldFont,
    })

    y -= 22

    const text = portableTextToString(section.content)

    text.split('\n\n').forEach((paragraph) => {
      const lines = wrapText(paragraph, font, 12, width - 100)

      lines.forEach((line) => {
        ensureSpace()
        page.drawText(line, {
          x: 50,
          y,
          size: 12,
          font,
          color: rgb(0.35, 0.35, 0.35),
        })
        y -= 16
      })

      y -= 10
    })
  })

  const pdfBytes = await pdfDoc.save()
  const buffer = Buffer.from(pdfBytes)

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
