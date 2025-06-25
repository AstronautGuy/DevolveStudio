import prisma from '@/lib/prisma';
import AdminTabs from './Tabs'; // keep Tabs component in same folder

export default async function AdminPage() {
    const users = await prisma.user.findMany()

    return <AdminTabs users={users} />;
}