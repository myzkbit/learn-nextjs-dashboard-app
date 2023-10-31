import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice Edit',
}

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const invoice = await fetchInvoiceById(id);
    const customers = await fetchCustomers();

    // 請求書が存在しなかった場合はNot Found関数をcallする
    if (!invoice) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                { label: 'Invoices', href: '/dashboard/invoices' },
                {
                    label: 'Edit Invoice',
                    href: `/dashboard/invoices/${id}/edit`,
                    active: true,
                },
                ]}
            />
            <Form invoice={invoice} customers={customers} />
        </main>
    );
}