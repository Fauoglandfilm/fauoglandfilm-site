// This fixed destination is a private Notion page; Notion enforces membership.
export const KULTURARENA_WORKSPACE = "https://app.notion.com/p/Kulturarena-Start-her-3fbe13ed845f8021bd72d7002a51944e";
export const retiredHeaders = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow, noarchive" };
export function retiredPortal() {
  // Never redirect a credential, encrypted snapshot or command POST to Notion.
  return Response.json({ error: "kulturarena_portal_retired", workspace: KULTURARENA_WORKSPACE }, { status: 410, headers: retiredHeaders });
}
