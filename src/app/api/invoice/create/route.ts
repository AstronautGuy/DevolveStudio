import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function getFinancialYear(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // Jan = 0

    return month < 3
        ? `${year - 1}-${(year % 100).toString().padStart(2, '0')}`
        : `${year}-${((year + 1) % 100).toString().padStart(2, '0')}`;
}

export async function POST(req: NextRequest) {
    try {
        const { email, amount, description, dueAt, years } = await req.json();

        if (!email || !amount || !dueAt) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const users = await prisma.user.findMany();

        const user = users.find(u => u.email.toLowerCase().trim() === email.toLowerCase().trim());

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const lastInvoice = await prisma.invoice.findFirst({
            orderBy: { id: 'desc' },
        });

        const lastNumber = lastInvoice
            ? parseInt(lastInvoice.invoiceNumber.split('/').pop() || '1000')
            : 1000;

        const nextNumber = lastNumber + 1;
        const invoiceNumber = `DEVLV/${getFinancialYear()}/${nextNumber}`;

        const invoiceData: any = {
            userId: user.id,
            invoiceNumber,
            amount,
            description,
            status: 'unpaid',
            dueAt: new Date(dueAt),
            recurringCycle: years ? 'yearly' : undefined,
            renewalDate: years
                ? new Date(new Date(dueAt).setFullYear(new Date(dueAt).getFullYear() + Number(years)) - 24 * 60 * 60 * 1000)
                : undefined,
        };

        const invoice = await prisma.invoice.create({ data: invoiceData });

        return NextResponse.json({ success: true, invoice });
    } catch (err) {
        console.error('Create invoice error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json({ users });
    } catch (err) {
        console.error('Error fetching users:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}