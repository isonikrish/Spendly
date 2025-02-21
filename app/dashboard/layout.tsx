import Sidebar from "@/components/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex gap-2">
            <Sidebar />
            {children}
        </div>
    );
}
