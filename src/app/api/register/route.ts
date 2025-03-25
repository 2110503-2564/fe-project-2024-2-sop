// src/app/api/register/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, tel, password } = await req.json();

    // Validate input
    if (!name || !email || !tel || !password) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await fetch("https://sop-job-fair-backend.vercel.app/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        tel,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || "Registration failed" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}