import prisma from '@/lib/prisma';
import AdminTabs from './Tabs'; // keep Tabs component in same folder

export default async function AdminPage() {
    const users = await prisma.user.findMany({
        include: {
            payments: true,
        },
    });
    const payments = await prisma.payments.findMany();

    return <AdminTabs users={users} domains={payments} />;
}