import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get Google Apps Script URL from environment variable
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
    
    if (!scriptUrl || scriptUrl === 'YOUR_WEB_APP_URL_HERE') {
      console.warn('Google Apps Script URL not configured')
      return NextResponse.json(
        { success: false, error: 'Server configuration missing' },
        { status: 500 }
      )
    }

    // Forward the request to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    // Check if the response is ok
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Apps Script error:', errorText)
      return NextResponse.json(
        { success: false, error: 'Failed to submit to Google Sheets' },
        { status: response.status }
      )
    }

    const result = await response.json()
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error submitting form:', error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
