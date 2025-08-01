
'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { LayoutDashboard, BotMessageSquare, History, FileText } from 'lucide-react';
import { AxelLogo } from '@/components/axel-logo';
import { Header } from './header';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { usePageLoader } from '@/hooks/use-page-loader';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '#', label: 'Interviews', icon: BotMessageSquare },
  { href: '/reports', label: 'Feedback Reports', icon: FileText },
  { href: '#', label: 'History', icon: History },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { showLoader } = usePageLoader();
  const isLoginPage = pathname === "/";

  if (isLoginPage) {
    return <>{children}</>; // no sidebar, no header
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <AxelLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  onClick={item.href === '#' ? undefined : showLoader}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
