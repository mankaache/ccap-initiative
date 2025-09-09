// app/api/pdf/[file]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'

export async function GET(
  _req: NextRequest,
  context: any // 🔑 avoid Next.js broken ParamCheck typing
) {
  try {
    const file: string = context.params.file
    const filePath = path.join(process.cwd(), 'public/documents', file)
    const fileBuffer = await fs.readFile(filePath)
//@ts-ignore

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${file}"`,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'File not found or cannot be read' },
      { status: 404 }
    )
  }
}
