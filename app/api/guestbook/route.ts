import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'
import { CreateGuestbookData } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CreateGuestbookData;
    
    // Validate required fields
    if (!body.visitor_name?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    // Create the guestbook entry
    const response = await cosmic.objects.insertOne({
      type: 'guestbook-entries',
      title: `${body.visitor_name.trim()} - ${new Date().toLocaleDateString()}`,
      metadata: {
        visitor_name: body.visitor_name.trim(),
        message: body.message.trim(),
        email: body.email?.trim() || '',
        homepage_url: body.homepage_url?.trim() || '',
        location: body.location?.trim() || '',
        date_signed: new Date().toISOString().split('T')[0]
      }
    });

    return NextResponse.json({ 
      success: true, 
      id: response.object.id 
    });

  } catch (error) {
    console.error('Error creating guestbook entry:', error);
    return NextResponse.json(
      { error: 'Failed to create guestbook entry' },
      { status: 500 }
    );
  }
}