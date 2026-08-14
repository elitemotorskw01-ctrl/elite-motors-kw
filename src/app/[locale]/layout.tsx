import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SetHtmlAttributes from "@/components/layout/SetHtmlAttributes";
import ScrollToTop from "@/components/layout/ScrollToTop";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import NavigationProgress from "@/components/layout/NavigationProgress";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <SetHtmlAttributes locale={locale} />
      <Suspense>
        <NavigationProgress />
      </Suspense>
      <Header />
      <main className="min-h-screen pt-16 md:pt-20">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
    </NextIntlClientProvider>
  );
}
