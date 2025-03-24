'use client';

import Link from "next/link";

interface TopMenuItemProps {
    title: string;
    href: string;
    count?: number;
}

export default function TopMenuItem({title, href, count}: TopMenuItemProps) {
    return (
        <Link href={href} className="text-xl text-white hover:text-gray-300 transition-colors duration-200 flex items-center">
            {title}
            {count !== undefined && count > 0 && (
                <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {count}
                </span>
            )}
        </Link>
    );
}