'use client';

import { useState, useEffect, useRef } from 'react';

const tabs = ['Users', 'Domains'] as const;

export default function AdminTabs({
                                      users,
                                      domains,
                                  }: {
    users: any[];
    domains: any[];
}) {
    const [activeTab, setActiveTab] = useState(0);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    const [expandedUserId, setExpandedUserId] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedUserId((prev) => (prev === id ? null : id));
    };

    const data = activeTab === 0 ? users : domains;

    useEffect(() => {
        const el = tabRefs.current[activeTab];
        if (el) {
            setIndicatorStyle({
                left: el.offsetLeft,
                width: el.offsetWidth,
            });
        }
    }, [activeTab]);

    return (
        <section className="flex flex-col items-center justify-start h-screen w-screen pt-10">
            {/* Tab Bar */}
            <div className="bg-gray-300 rounded-[20px_20px_0_0] flex relative px-4 py-2 mb-0 w-[90vw] h-12">
                {/* Sliding Indicator */}
                <div
                    className="absolute top-2 -bottom-2 left-0 bg-green-500 rounded-md transition-all duration-300 z-0"
                    style={{
                        left: indicatorStyle.left,
                        width: indicatorStyle.width,
                    }}
                />
                {tabs.map((tab, index) => (
                    <button
                        key={tab}
                        ref={(el) => {
                            tabRefs.current[index] = el;
                        }}
                        onClick={() => setActiveTab(index)}
                        className={`relative z-10 px-8 py-3 transition font-semibold rounded ${
                            index === activeTab ? 'text-black' : 'text-black/60'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Data Table */}
            <div className="bg-gray-300 rounded-[0_0_20px_20px] p-4 w-[90vw] h-[70vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">
                    {tabs[activeTab]} List
                </h2>

                <div className="overflow-auto rounded-md shadow-sm">
                    <table className="min-w-full table-auto border-collapse bg-white text-sm rounded-md overflow-hidden">
                        <thead>
                        <tr className="bg-green-500 text-left text-black font-semibold">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            {activeTab === 0 && <th className="px-4 py-2">Actions</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item: any) => (
                            <>
                                <tr
                                    key={item.id}
                                    className="odd:bg-gray-100 even:bg-gray-50 border-b border-gray-200"
                                >
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2">{item.email}</td>
                                    {activeTab === 0 && (
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => toggleExpand(item.id)}
                                                className="text-sm px-3 py-1 bg-blue-200 rounded hover:bg-blue-300 transition"
                                            >
                                                {expandedUserId === item.id
                                                    ? 'Hide Payments'
                                                    : 'View Payments'}
                                            </button>
                                        </td>
                                    )}
                                </tr>

                                {activeTab === 0 &&
                                    expandedUserId === item.id && (
                                        <tr className="bg-white border-b border-gray-200">
                                            <td colSpan={3} className="p-4">
                                                <div className="text-sm font-medium mb-2">
                                                    Payments:
                                                </div>
                                                {item.payments?.length === 0 ? (
                                                    <p className="text-gray-500">
                                                        No payments found.
                                                    </p>
                                                ) : (
                                                    <ul className="space-y-1">
                                                        {item.payments?.map(
                                                            (payment: any, i: number) => (
                                                                <li
                                                                    key={i}
                                                                    className="bg-gray-100 rounded p-2 text-xs shadow-sm"
                                                                >
                                                                    Amount: ₹{payment.amount} <br />
                                                                    Status: {payment.status} <br />
                                                                    Date:{' '}
                                                                    {new Date(
                                                                        payment.createdAt
                                                                    ).toLocaleDateString()}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                            </>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
