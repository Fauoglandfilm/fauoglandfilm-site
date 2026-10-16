/** Runtime-only destination: never put the private workbook ID in site source. */
export function kulturarenaWorkbookUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "docs.google.com" || url.port || url.username || url.password) return null;
    if (!/^\/spreadsheets\/d\/[A-Za-z0-9_-]+\/edit$/.test(url.pathname)) return null;
    const gid = url.searchParams.get("gid");
    if (gid !== null && !/^\d+$/.test(gid)) return null;
    return `${url.origin}${url.pathname}${gid ? `?gid=${gid}#gid=${gid}` : ""}`;
  } catch {
    return null;
  }
}

export function workbookHome(url: string) {
  const href = url.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  return `<!doctype html><html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Kulturarena · CRM</title><style>body{margin:0;background:#f4f2ec;color:#192a38;font:16px/1.65 system-ui,sans-serif}main{max-width:640px;margin:10vh auto;padding:28px}h1{font-size:38px;line-height:1.15}p{max-width:58ch}.label{font-size:12px;letter-spacing:.16em;color:#a74332;font-weight:700}.open{display:inline-block;background:#192a38;color:white;padding:15px 23px;border-radius:8px;text-decoration:none;font-weight:700}.note{font-size:14px;color:#52616a}button{font:inherit;background:none;border:0;text-decoration:underline;padding:0;color:#52616a;cursor:pointer}</style></head><body><main><p class="label">KULTURARENA / SALGSSYSTEM</p><h1>CRM-et ditt i Google Drive</h1><p>Kundelister, research og Action Stream redigeres direkte i Google-arket. Endre celler, legg til kunder og følg opp salget i det samme oppsettet som hos Fau&amp;Land.</p><p><a class="open" href="${href}" target="_blank" rel="noopener noreferrer">Åpne CRM i Google Drive ↗</a></p><p class="note">Arket har egen Google-tilgang. Logg inn med en Google-konto som har tilgang til Kulturarena-arket.</p><p class="note">Automatisk kundekontakt er ikke aktivert ennå.</p><form method="post" action="/kulturarena/logout"><button type="submit">Logg ut</button></form></main></body></html>`;
}
