# Redaktørguide for Tertnes Brass

Pages CMS brukes til forsiden, konserter, nyheter og medlemmer. Redaktører endrer bare innholdsfeltene. Nettsidens layout, farger og Astro-komponenter ligger i kode og kan ikke endres fra CMS-et.

## Logg inn

1. Gå til [app.pagescms.org](https://app.pagescms.org/).
2. Logg inn med GitHub-brukeren som har tilgang til Tertnes Brass-repositoriet.
3. Velg repositoriet `Tertnes-Brass/tb-website` og produksjonsgrenen `main`.

Før første test må Pages CMS sin GitHub-app være installert for organisasjonen eller kontoen som eier repositoriet. Denne tilgangen må godkjennes av en repository-administrator.

## Opprett eller rediger innhold

- **Forside:** Åpne `Faste sider` og velg `Forside`. Her kan du redigere toppteksten, seksjonsoverskriftene, de fem galleribildene og teksten i Støtt oss-feltet. Lenkemål og layout er låst i nettsiden.
- **Konserter:** Opprett én oppføring per konsert. Bruk `Publisert på nettsiden` først når dato, sted og tekst er klare.
- **Nyheter:** Opprett korte nyhetssaker med bilde og alternativ bildetekst. Bare én sak bør være markert som fremhevet.
- **Medlemmer:** Opprett én oppføring per person. Portrett og presentasjon er frivillig i PoC-en.

ID-feltene brukes i filnavn. Bruk bare små bokstaver, tall og bindestrek, for eksempel `hostkonsert-2026`.

Forsiden er én fast innholdsfil og kan ikke slettes i Pages CMS. Overskriften i toppfeltet er delt i flere felt fordi nettsiden viser deler av teksten i burgunder og gull. Kontroller forsiden etter lagring for å se at linjeskiftene fungerer på både mobil og stor skjerm.

## Last opp bilder

1. Velg et bildefelt og trykk for å velge eller laste opp bilde.
2. Bruk JPG, PNG eller WebP. Konsert- og nyhetsbilder bør være liggende; portretter bør være stående.
3. Skriv alltid en kort og konkret alternativ bildetekst som forklarer motivet for personer som bruker skjermleser.

Nye bilder lagres under `public/images/uploads/` og får nettadresse under `/images/uploads/`.

## Lagre og publisere

Når du lagrer i Pages CMS, skrives endringen direkte til Git-repositoriet som en commit. Pages CMS er ikke en egen innholdsdatabase og har ikke et separat «publiser»-lager. Hva som skjer videre avhenger av repoets bygg- og utrullingsoppsett:

- På en testgren blir endringen bare liggende på den grenen til den eventuelt flettes.
- På `main` starter Cloudflare automatisk en ny produksjonsbygging. Endringen blir offentlig når byggingen er fullført.
- `Publisert på nettsiden` bestemmer om en konsert, nyhet eller person blir tatt med i appens offentlige innhold.

Kontroller alltid den aktuelle siden på [tertnesbrass.com](https://tertnesbrass.com/) etter lagring. Ta kontakt med en repository-administrator hvis endringen ikke blir synlig eller siden viser en feil.

PoC-en legger ikke til en egen godkjenningsflyt eller forhåndsvisning. Avtal derfor hvem som kan lagre til produksjonsgrenen før redaktørtesting.

## Rulle tilbake

Alle lagringer er Git-commits. En feil kan rulles tilbake ved å reversere den aktuelle commiten eller gjenopprette en tidligere filversjon i GitHub. Be en repository-administrator om hjelp hvis du er usikker. Bilder slettet fra den nyeste versjonen kan fortsatt finnes i Git-historikken, men bør ikke slettes uten å kontrollere at de ikke brukes andre steder.

## Begrensninger i PoC-en

- Ingen egen adminside bygges inn i nettstedet.
- Ingen forhåndsvisning eller godkjenningskø er konfigurert.
- Navigasjon og kontaktinformasjon er ikke redigerbare i denne avgrensede PoC-en.
- Medlemsregisteret inneholder bare innhold som allerede kunne dokumenteres i den rene hovedgrenen og må fylles ut før reell redaktørtest.
- CMS-oppsettet er ikke vurdert som produksjonsklart før en ikke-teknisk redaktør har testet hele flyten.
