import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, organisation, email, subject, message } = body;

    // 1. Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Required fields are missing (Name, Email, Subject, Message).' },
        { status: 400 }
      );
    }

    // 2. Resolve Resend configuration from environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || 'info@iveomadevelopmentnetwork.org';

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY environment variable is not defined.');
      // If API key is missing during local development, log to console and simulate success
      if (process.env.NODE_ENV === 'development') {
        console.log('Simulated email payload (Local Dev):', body);
        return NextResponse.json({ 
          success: true, 
          message: 'Development Mode: Form received successfully (Simulated Email).' 
        });
      }
      return NextResponse.json(
        { error: 'Mail portal configuration error. Please contact administrators.' },
        { status: 500 }
      );
    }

    // 3. Build a highly styled premium email HTML template matching Iveoma's brand system
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Inquiry | Iveoma Development Network</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #0F2A44;
            background-color: #F8FAFC;
            margin: 0;
            padding: 40px 20px;
          }
          .email-card {
            max-width: 600px;
            margin: 0 auto;
            background-color: #FFFFFF;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
            border: 1px solid #E2E8F0;
          }
          .brand-header {
            background-color: #0A2237;
            padding: 32px;
            text-align: center;
          }
          .brand-header h2 {
            margin: 0;
            color: #FFFFFF;
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          .brand-accent-bar {
            height: 4px;
            background-color: #B8543B;
          }
          .email-body {
            padding: 40px 32px;
          }
          .inquiry-meta {
            margin-bottom: 32px;
            border-bottom: 1px solid #F1F5F9;
            padding-bottom: 24px;
          }
          .meta-item {
            margin-bottom: 12px;
          }
          .meta-label {
            font-size: 11px;
            text-transform: uppercase;
            font-weight: 700;
            color: #7AA3BE;
            letter-spacing: 0.08em;
            margin: 0 0 4px 0;
          }
          .meta-val {
            font-size: 16px;
            font-weight: 500;
            color: #0F2A44;
            margin: 0;
          }
          .message-container {
            background-color: #F8FAFC;
            border-left: 4px solid #B8543B;
            padding: 24px;
            border-radius: 0 8px 8px 0;
            font-size: 15px;
            line-height: 1.6;
            color: #1E293B;
            white-space: pre-wrap;
          }
          .email-footer {
            background-color: #F8FAFC;
            padding: 24px 32px;
            border-top: 1px solid #F1F5F9;
            text-align: center;
            font-size: 12px;
            color: #64748B;
          }
        </style>
      </head>
      <body>
        <div class="email-card">
          <div class="brand-header">
            <h2>Iveoma Development Network</h2>
          </div>
          <div class="brand-accent-bar"></div>
          <div class="email-body">
            <div class="inquiry-meta">
              <div class="meta-item">
                <p class="meta-label">Subject Category</p>
                <p class="meta-val" style="color: #B8543B; font-weight: 600;">${subject}</p>
              </div>
              <div class="meta-item" style="margin-top: 16px;">
                <p class="meta-label">Full Name</p>
                <p class="meta-val">${name}</p>
              </div>
              ${organisation ? `
              <div class="meta-item" style="margin-top: 16px;">
                <p class="meta-label">Organisation / Institution</p>
                <p class="meta-val">${organisation}</p>
              </div>
              ` : ''}
              <div class="meta-item" style="margin-top: 16px;">
                <p class="meta-label">Email Address</p>
                <p class="meta-val"><a href="mailto:${email}" style="color: #1A5A8A; text-decoration: none;">${email}</a></p>
              </div>
            </div>
            
            <p class="meta-label" style="margin-bottom: 8px;">Message</p>
            <div class="message-container">${message}</div>
          </div>
          <div class="email-footer">
            Sent securely via Iveoma Inquiry System Portal
          </div>
        </div>
      </body>
      </html>
    `;

    // 4. Submit payload directly to Resend's standard API endpoint via fetch
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Iveoma Inquiry Portal <onboarding@resend.dev>',
        to: recipientEmail,
        reply_to: email,
        subject: `[Iveoma Inquiry] ${subject} - ${name}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API response error:', errorText);
      return NextResponse.json(
        { error: 'Failed to deliver message via Resend. Check API status.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error handling contact form API request:', error);
    return NextResponse.json(
      { error: 'An unexpected internal server error occurred.' },
      { status: 500 }
    );
  }
}
