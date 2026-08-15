import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "ar"
      ? "الشروط والأحكام — إيليت موتورز الكويت"
      : "Terms & Conditions — Elite Motors KW";
  const description =
    locale === "ar"
      ? "الشروط والأحكام الخاصة باستخدام موقع إيليت موتورز الكويت وخدماتنا."
      : "Terms and conditions for using Elite Motors KW and our vehicle listing services.";
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
      canonical: `${SITE_URL}/${locale}/terms`,
      languages: {
        en: `${SITE_URL}/en/terms`,
        ar: `${SITE_URL}/ar/terms`,
      },
    },
  };
}

export default async function TermsPage() {
  const t = await getTranslations("terms");

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
              {t("serviceTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("serviceDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold mb-3">
              {t("listingTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("listingDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold mb-3">
              {t("commissionTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("commissionDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold mb-3">
              {t("noGuaranteeTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("noGuaranteeDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold mb-3">
              {t("userTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("userDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold mb-3">
              {t("liabilityTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("liabilityDesc")}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold mb-3">
              {t("governingTitle")}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {t("governingDesc")}
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
