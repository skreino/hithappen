import { useLocale } from "@/lib/i18n/locale-provider";
import { ChatCircle } from "@phosphor-icons/react";
export function InboxView() {
  const { t } = useLocale();
  return <main className="view standard-view"><header className="page-title"><p>{t("Le conversazioni, al posto giusto")}</p><h1>Inbox</h1></header><div className="empty-copy"><ChatCircle size={42} weight="light" /><h2>{t("Ci vediamo qui.")}</h2><p>{t("In questa demo la messaggistica non è attiva. Non vengono creati gruppi, inviati messaggi o abbinamenti con altre persone.")}</p><p>{t("Nella versione completa, le conversazioni nasceranno dagli eventi condivisi o da richieste accettate.")}</p></div></main>;
}
