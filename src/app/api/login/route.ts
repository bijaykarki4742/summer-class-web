import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // For demo purposes, accept any email/password combination
    // In a real app, you would validate against a database
    if (email && password) {
      // Simulate a successful login
      return NextResponse.json({
        success: true,
        user: { email, id: '1' },
        token: 'dummy-jwt-token-' + Date.now()
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 