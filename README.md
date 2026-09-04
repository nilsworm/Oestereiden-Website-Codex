# SuS Oestereiden e.V.

Statische React-/Vite-Website für SuS Oestereiden. Die Seite verwendet ausschließlich lokal abgelegte, aus der bisherigen Vereinswebsite übernommene Bild- und Logo-Assets.

## Lokal entwickeln

```bash
npm install
npm run dev
```

Qualitätssicherung und Produktions-Build:

```bash
npm run lint
npm run build
```

## Deployment mit Coolify

Die `compose.yaml` liefert einen einzelnen Dienst auf internem Port `8080`. In Coolify den Dienst aus der Compose-Datei erstellen, Port `8080` als Exposed Port hinterlegen und die Domain zuweisen. Coolifys Traefik übernimmt Domain, TLS und Reverse Proxy; die Compose-Datei veröffentlicht bewusst keinen Host-Port.

Der Produktionscontainer baut die SPA mit Node und liefert sie über unprivilegiertes Nginx aus. `nginx.conf` enthält den SPA-Fallback, Cache-Regeln und den Health-Endpunkt `/healthz`.

Für einen Docker-Host ohne Coolify kann ein Reverse Proxy (z. B. Traefik oder Caddy) den Dienst im Docker-Netzwerk auf `frontend:8080` ansprechen. Ein Host-Port ist hierfür nicht erforderlich.
