import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DIGITAL_FILE = path.join(process.cwd(), 'data', 'digital-orders.json')

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (!token) return NextResponse.json({ success: false, error: 'Token missing' }, { status: 400 })
  try {
    const data = JSON.parse(await fs.readFile(DIGITAL_FILE, 'utf8'))
    const order = data.orders.find(o => o.accessToken === token)
    if (!order) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true, order })
  } catch {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }
}
