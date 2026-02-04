export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import {NextResponse} from 'next/server'
import nodemailer from 'nodemailer'
import {createClient} from 'next-sanity'
import path from 'path'

// 1. Initialize the Sanity Write Client
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    // Extract Text Fields
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const targetMarket = formData.get('targetMarket') as string
    const productCategory = formData.get('productCategory') as string
    const quantity = formData.get('quantity') as string
    const timeline = formData.get('timeline') as string
    const priceRange = formData.get('priceRange') as string
    const details = formData.get('details') as string

    const fileEntries = formData.getAll('attachments') as File[]
    const assetRefs = []
    const emailAttachments: any[] = []

    // 2. Define Logo Attachment (Located in public/images/logo.png)
    const logoAttachment = {
      filename: 'logo.png',
      path: path.join(process.cwd(), 'public', 'images', 'logo.png'),
      cid: 'company_logo',
    }

    // 3. Process Uploaded Files for Sanity and Email
    for (const [index, file] of fileEntries.entries()) {
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const isImage = file.type.startsWith('image/')
        const assetType = isImage ? 'image' : 'file'

        // Upload to Sanity
        const asset = await writeClient.assets.upload(assetType, buffer, {
          filename: file.name,
        })

        assetRefs.push({
          _key: Math.random().toString(36).substring(2, 9),
          _type: assetType,
          asset: {_type: 'reference', _ref: asset._id},
        })

        // Prepare for Email with CID for inline previews
        emailAttachments.push({
          filename: file.name,
          content: buffer,
          cid: isImage ? `attachment_${index}` : undefined,
        })
      }
    }

    // 4. Create Inquiry Document in Sanity Studio (Crucial Step)
    await writeClient.create({
      _type: 'inquiry',
      fullName,
      email,
      company,
      targetMarket,
      productCategory,
      quantity,
      timeline,
      priceRange,
      details,
      techPacks: assetRefs.length > 0 ? assetRefs : undefined,
      submittedAt: new Date().toISOString(),
    })

    // 5. Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    // 6. Generate Inline Image Previews for the Owner's Email
    const inlineImagesHtml = emailAttachments
      .filter((att) => att.cid)
      .map(
        (att) => `
        <div style="margin-top: 15px; border: 1px solid #eee; padding: 10px; background: white;">
          <p style="font-size: 10px; color: #999; margin: 0 0 5px 0;">Preview: ${att.filename}</p>
          <img src="cid:${att.cid}" style="max-width: 100%; height: auto; display: block; border-radius: 2px;" />
        </div>
      `,
      )
      .join('')

    // 7. BUSINESS NOTIFICATION EMAIL
    const businessMailOptions = {
      from: `"Akaame Website" <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_TO_RECIPIENT || process.env.EMAIL_SERVER_USER,
      replyTo: email,
      subject: `🚀 RFQ: ${productCategory} from ${company}`,
      attachments: [logoAttachment, ...emailAttachments],
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: sans-serif; color: #14253f; border: 1px solid #f0f0f0;">
          <div style="background-color: #14253f; padding: 30px; text-align: center;">
            <img src="cid:company_logo" width="120" alt="Akaame Export Pvt Ltd" />
          </div>
          <div style="padding: 30px;">
            <h2 style="font-size: 16px; border-bottom: 2px solid #cd7d51; padding-bottom: 10px; margin-bottom: 20px;">Client Information</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 8px 0; color: #666; width: 40%;">Full Name</td><td style="font-weight: bold;">${fullName}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="font-weight: bold;"><a href="mailto:${email}" style="color: #cd7d51; text-decoration: none;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Company</td><td style="font-weight: bold;">${company}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Target Markets</td><td style="font-weight: bold;">${targetMarket}</td></tr>
            </table>
            <h2 style="font-size: 16px; border-bottom: 2px solid #cd7d51; padding-bottom: 10px; margin-top: 40px; margin-bottom: 20px;">Project Specifications</h2>
            <div style="background-color: #fafafa; padding: 20px; border-radius: 4px;">
              <table style="width: 100%; font-size: 14px;">
                <tr><td style="padding: 5px 0; color: #666; width: 40%;">Category</td><td style="font-weight: bold;">${productCategory}</td></tr>
                <tr><td style="padding: 5px 0; color: #666;">Quantity</td><td style="font-weight: bold;">${quantity} units</td></tr>
                <tr><td style="padding: 5px 0; color: #666;">Timeline</td><td style="font-weight: bold;">${timeline}</td></tr>
                <tr><td style="padding: 5px 0; color: #666;">Target Price</td><td style="font-weight: bold;">${priceRange}</td></tr>
              </table>
            </div>
            <div style="margin-top: 30px;">
              <p style="color: #666; font-size: 11px; margin-bottom: 5px; font-weight: bold; text-transform: uppercase;">Technical Drawings / Images:</p>
              ${inlineImagesHtml || '<p style="font-size: 12px; color: #999; font-style: italic;">No images provided</p>'}
            </div>
            <div style="margin-top: 30px;">
              <p style="color: #666; font-size: 11px; margin-bottom: 5px; font-weight: bold; text-transform: uppercase;">Additional Details:</p>
              <div style="background-color: #ffffff; border: 1px solid #eeeeee; padding: 15px; font-size: 14px; line-height: 1.6; color: #444;">
                ${details || 'No additional details provided.'}
              </div>
            </div>
          </div>
          <div style="background-color: #fafafa; padding: 20px; text-align: center; font-size: 11px; color: #999;">
            Sent via akaame.com | © 2026 Akaame Export Pvt. Ltd.
          </div>
        </div>
      `,
    }

    // 8. VISITOR CONFIRMATION EMAIL
    const visitorMailOptions = {
      from: `"Akaame Export Pvt Ltd" <${process.env.EMAIL_SERVER_USER}>`,
      to: email,
      subject: `Confirmation: Inquiry Received`,
      attachments: [logoAttachment],
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: sans-serif; color: #14253f; border: 1px solid #f0f0f0; padding: 40px; text-align: center;">
          <h1 style="color: #14253f; font-size: 22px; margin-bottom: 10px;">Hello ${fullName.split(' ')[0]},</h1>
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Thank you for reaching out. We have received your request regarding <strong>${productCategory}</strong>.</p>
          <p style="font-size: 14px; color: #666; margin-bottom: 30px;">Our merchandising team is reviewing your specifications and will provide a preliminary quote to <strong>${company}</strong> within 2 business days.</p>
          
          <div style="border-top: 1px solid #eee; padding-top: 30px; margin-top: 20px;">
            <img src="cid:company_logo" width="180" alt="Akaame Export Pvt. Ltd." style="display: block; margin: 0 auto;" />
            <p style="font-size: 11px; color: #999; margin-top: 10px;">Export Division | Quality & Innovation</p>
          </div>
        </div>
      `,
    }

    // 9. Execute emails with "Soft Fail" handling
    try {
      // Promise.allSettled waits for all emails to attempt delivery
      // regardless of whether they succeed or fail.
      await Promise.allSettled([
        transporter.sendMail(businessMailOptions),
        transporter.sendMail(visitorMailOptions),
      ])

      // Always return Success if Sanity creation (Step 4) succeeded.
      return NextResponse.json({message: 'Success'}, {status: 200})
    } catch (mailError) {
      console.error('Email Delivery Error (likely Gmail limit):', mailError)
      // Return success because the data is saved in Sanity.
      return NextResponse.json({message: 'Success'}, {status: 200})
    }
  } catch (error) {
    console.error('Critical API Error:', error)
    // Return 500 only if Sanity or data processing failed.
    return NextResponse.json({message: 'Error'}, {status: 500})
  }
}
