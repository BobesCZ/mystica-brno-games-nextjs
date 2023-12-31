## Zprovoznění projektu

### Vercel

Založte databázi přes Vercel > Storage > KV Database [viz návod](https://vercel.com/docs/storage/vercel-kv/quickstart)

### Next-auth - Google

1. Založte Credentials > OAuth client ID [v Google Console](https://console.developers.google.com/apis/credentials)

2. Do sekce **Authorized redirect URIs** přidejte 2 URI [viz návod](https://next-auth.js.org/providers/google#configuration)

3. Zkopírujte údaje ze sekce **Client secrets** do `env.local` > `GOOGLE_CLIENT_ID` a `GOOGLE_CLIENT_SECRET`

4. Vygenerujte `secret` [zde](https://generate-secret.vercel.app/32) a uložte do `env.local` > `NEXTAUTH_SECRET`

5. Vložte `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` a `NEXTAUTH_SECRET` do Vercelu přes Settings [viz návod](https://vercel.com/guides/how-to-add-vercel-environment-variables)

6. Přidejte do `env.local` tento řádek `NEXTAUTH_URL="http://localhost:3000"` (toto je pouze pro local, v produkci se URL adresa zjistí automaticky z Vercelových `System Environment Variables`)

**POZNÁMKA:** Next-auth nefunguje v Preview Environment (Google při pokusů o přihlášení vyhodí chybu).

**POZNÁMKA:** Na lokálním prostředí je Administrace z praktických důvodů přístupná i bez přihlášení (tzn. není rozdíl mezi přihlášeným a nepřihlášeným uživatelem), toto chování upravuje config proměnná `DISABLE_USER_AUTH_ON_DEVELOPMENT`.

## Přidání nového seznamu her

1. Spusťte `npm run dev` a běžte do [Administrace](http://localhost:3000/admin)

2. Nový seznam > Nahrát

3. Nahrajte CSV soubor

4. Vyplňte `Název seznamu` (slouží jen jako interní poznámka pro vás) a klikněte na Uložit

5. Na stránce detailu seznamu klikněte na `Zobrazit BGG loader`

6. Klikněte na tlačítko Načíst X her. Nezavírejte stránku, dokud loader neskončí

7. Po uložení her klikněte v horní části stránky na `Označit jako aktivní`.

**POZNÁMKA:** Seznam her, který nemá všechny hry staženy, nemůže být označen jako aktivní.

## Správa uživatelů

### Přidání uživatele - Google

Příklad: Uživatel Klient chce mít přístup do Administrace

1. Klient musí jít do Administrace na produkci, přihlásit se přes libovolnou službu a kliknout na tlačítko `Požádat o přístup`

2. Developer si spustí projekt lokálně, v Administraci navštíví sekci [Uživatelé](http://localhost:3000/admin/users) a v tabulce na řádku s Klientem klikne na `Udělit přistup`

3. Klient má po přenačtení stránky plný přístup do Administrace.

**POZNÁMKA:** Z bezpečnostních důvodů není možné editovat uživatele na produkci (seznam uživatelů je viditelný, ale tlačítka neaktivní). Jediný, kdo může udělit přístup, je developer na lokálním prostředí.

### Přidání uživatele - Credentials

Přihlášení přes jméno + heslo je jediný způsob, který funguje na Vercel preview.

1. Spusťte `npm run dev` a běžte do [Administrace](http://localhost:3000/admin)

2. Uživatelé > Přidat nového uživatele

3. Vyplňte `Jméno` a `Heslo` a uložte uživatele

4. V tabulce na řádku s uživatelem klikněte na `Udělit přistup`

**POZNÁMKA:** Hesla k uživatelským účtům vidí pouze developer na lokálním prostředí, na produkci se zobrazuje ikona zámku, aby se účet s heslem odlišil od účtů jiných providerů.

**POZNÁMKA:** Na produkci je přihlášení přes jméno + heslo vypnuté, toto chování upravuje config proměnná `DISABLE_CREDENTIALS_ON_PRODUCTION`.

### Smazání uživatele

Po smazání uživatele na lokálním prostředí je nutné revalidovat cache na produkci.

1. Běžte do Administrace na produkci

2. Nastavení > Nastavení Administrace

3. Klikněte na Vymazat cache

**POZNÁMKA:** Pokud developer smaže účet uživatele, který je právě přihlášen, tento uživatel ztratí přístup do Administrace až ve chvíli, kdy v prohlížeči udělá přenačtení stránky. Přechod na jinou stránku (přes odkaz v menu) v rámci Next.js aplikace **nevyvolá** přenačtení, jelikož aplikace je již nacacheována v prohlížeči uživatele.
