import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "ar"
      ? "سياسة الخصوصية — إيليت موتورز الكويت"
      : "Privacy Policy — Elite Motors KW";
  const description =
    locale === "ar"
      ? "سياسة الخصوصية الخاصة بموقع إيليت موتورز الكويت وكيفية تعاملنا مع بياناتك."
      : "Privacy policy for Elite Motors KW — how we collect, use, and protect your data.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Elite Motors KW",
      locale: locale === "ar" ? "ar_KW" : "en_US",
    },
    twitter: { card: "summary", title, description },
    alternates: {
      canonical: `${SITE_URL}/${locale}/privacy`,
      languages: {
        en: `${SITE_URL}/en/privacy`,
        ar: `${SITE_URL}/ar/privacy`,
      },
    },
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">
          {t("title")}
        </h1>
        <p className="text-text-secondary text-sm mb-10">{t("lastUpdated")}</p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold text-gold mb-3">
              {t("collectTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("collectDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold mb-3">
              {t("useTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("useDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold mb-3">
              {t("sharingTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("sharingDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold mb-3">
              {t("cookiesTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("cookiesDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold mb-3">
              {t("securityTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("securityDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold mb-3">
              {t("changesTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("changesDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold mb-3">
              {t("contactTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("contactDesc")}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
