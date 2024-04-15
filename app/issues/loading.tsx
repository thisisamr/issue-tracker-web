'use client'
import { Skeleton } from '@/app/components';
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from 'next/navigation';


export default function Loading() {
    //Fix parent loading duplicate skeleton 
const p = usePathname()
if (p=='/issues/new'){
    return 
}
    let issues = [1, 2, 3, 4, 5]
    return (
        <div className="p-3">
            <div className="mb-5">
                <Button>
                    <Link href={"/issues/new"}>New Issue</Link>
                </Button>
            </div>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Isuue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Status
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell">
                            Created
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues?.map((issue) => {
                        return (
                            <Table.Row key={issue}>
                                <Table.Cell>
                                    <Skeleton />
                                    <div className="block md:hidden">
                                        <Skeleton />
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="hidden md:table-cell ">
                                    <Skeleton />
                                </Table.Cell>
                                <Table.Cell className="hidden md:table-cell">
                                    <Skeleton />
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table.Root>
        </div>
    )
}
