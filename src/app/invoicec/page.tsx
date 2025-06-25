'use client';

import { useState, useEffect } from 'react';

export default function CreateInvoicePage() {
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState<number | ''>('');
    const [description, setDescription] = useState('');
    const [dueAt, setDueAt] = useState('');
    const [years, setYears] = useState<number | ''>('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');
    const [users, setUsers] = useState<any[]>([]);

    // Fetch users on mount
    useEffect(() => {
        fetch('/api/invoice/create')
            .then((res) => res.json())
            .then((data) => setUsers(data.users))
            .catch(() => {});
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setError('');

        const body: any = {
            email: email.trim(),
            amount: Number(amount),
            description: description.trim(),
            dueAt,
        };
        if (years !== '' && !isNaN(Number(years))) {
            body.years = Number(years);
        }

        try {
            const res = await fetch('/api/invoice/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const json = await res.json();

            if (res.ok) {
                setStatus('success');
            } else {
                setStatus('error');
                setError(json.error || 'Something went wrong');
            }
        } catch {
            setStatus('error');
            setError('Network error');
        }
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md space-y-4"
            >
                <h1 className="text-xl font-bold">Create Invoice</h1>

                <div>
                    <label className="block text-sm font-medium">User Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Amount (₹)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                        className="mt-1 w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Due Date</label>
                    <input
                        type="date"
                        value={dueAt}
                        onChange={(e) => setDueAt(e.target.value)}
                        className="mt-1 w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Duration in Years (optional)</label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value === '' ? '' : Number(e.target.value))}
                        className="mt-1 w-full border rounded px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                >
                    {status === 'loading' ? 'Creating...' : 'Create Invoice'}
                </button>

                {status === 'error' && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                )}
                {status === 'success' && (
                    <p className="text-sm text-green-500 text-center">Invoice created successfully!</p>
                )}
            </form>
        </section>
    );
}