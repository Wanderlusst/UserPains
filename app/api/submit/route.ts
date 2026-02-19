import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get Google Apps Script URL from environment variable
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL
    
    if (!scriptUrl || scriptUrl === 'YOUR_WEB_APP_URL_HERE') {
      console.warn('Google Apps Script URL not configured')
      return NextResponse.json(
        { success: false, error: 'Server configuration missing. Please set GOOGLE_SCRIPT_URL in your environment variables.' },
        { status: 500 }
      )
    }

    console.log('Forwarding request to Google Apps Script:', scriptUrl)
    console.log('Request body:', JSON.stringify(body))

    // Send JSON directly - Google Apps Script expects it in e.postData.contents
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      redirect: 'follow',
    })

    console.log('Google Apps Script response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    // Check if the response is ok
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Apps Script error:', response.status, errorText)
      
      // Check if it's an HTML redirect page (common with Google Apps Script auth issues)
      if (errorText.includes('<HTML>') || errorText.includes('Moved Temporarily')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Authorization required: Please visit the Google Apps Script URL in a browser first to authorize it, then redeploy as a new version.',
            details: 'Go to: ' + scriptUrl + ' and authorize the script, then redeploy it.'
          },
          { status: 401 }
        )
      }
      
      // Provide helpful error message for 401
      if (response.status === 401) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Unauthorized: The script may need to be authorized. Try: 1) Visit the GET endpoint in a browser to authorize, 2) Redeploy as a new version with "Anyone" access.',
            details: errorText.substring(0, 200) // First 200 chars of error
          },
          { status: 401 }
        )
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: `Failed to submit to Google Sheets (Status: ${response.status})`,
          details: errorText || 'Unknown error from Google Apps Script'
        },
        { status: response.status }
      )
    }

    const result = await response.json()
    console.log('✅ Successfully submitted to Google Apps Script')
    console.log('Google Apps Script response:', JSON.stringify(result))
    
    // Check if Google Apps Script returned an error
    if (result.success === false) {
      console.error('❌ Google Apps Script error:', result.error)
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || 'Failed to save to Google Sheets',
          details: result
        },
        { status: 200 } // Still 200 because the request succeeded, but the script had an error
      )
    }
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Error submitting form:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}
