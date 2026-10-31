import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { subject, name, phone, email, message } = body;

        // Basic validation
        if (!subject || !name || !email || !message) {
            return NextResponse.json(
                { error: "Заповніть всі обов'язкові поля." },
                { status: 400 }
            );
        }

        await sendEmail({ subject, name, phone, email, message });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("[contact] sendEmail error:", error);
        return NextResponse.json(
            { error: "Не вдалося надіслати повідомлення. Спробуйте пізніше." },
            { status: 500 }
        );
    }
}
