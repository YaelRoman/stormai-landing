/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

export type Lang = "en" | "es";

export const i18n = {
  en: {
    // DemoFrame
    chyronLabel: "CHEF GORDON STRIX · LIVE COMMENTARY",
    nextCourse: "NEXT COURSE →",
    getEarlyAccess: "GET EARLY ACCESS →",
    nextCourseTransition: "NEXT COURSE",
    chyrons: [
      "Tonight we cook with zero prior knowledge, two cups of ambition, and a frighteningly capable language model.",
      "Every great pentest begins the same way — mise en place. Know your target before you touch a single endpoint.",
      "We are now inside the kitchen. The heat is on. Several input fields are already sweating.",
      "SQL injection. In 2026. The chef is not surprised. The chef is simply tired.",
      "Seven findings. Zero false positives. Zero courses sent back. The kitchen has been thoroughly health-inspected.",
      "We would award this application zero stars, but the vulnerability density alone deserves a Michelin mention.",
    ],

    // ColdOpen
    networkPresents: "THE SECURITY FOOD NETWORK PRESENTS",
    tagline: "Where every vulnerability is cooked to perfection",
    seasonEpisode: "Season 01 · Episode 01",
    episodeTitle: "A Seven-Course Feast at VulnBank",
    episodeDesc: (critical: number, high: number, duration: number) =>
      `Tonight, Chef Storm serves ${critical} Critical and ${high} High-severity findings in a fully autonomous ${duration}-minute sitting. Zero false positives. Zero courses sent back to the kitchen.`,
    castLabels: {
      Target: "Target",
      Method: "Method",
      Agents: "Agents",
      Runtime: "Runtime",
      Cost: "Cost",
    },
    finePrint1:
      "Filmed before a live audience of security engineers who have definitely seen this at a real bank.",
    finePrint2: "VulnBank is fictional. The vulnerabilities are not. The NDA is.",

    // MiseEnPlace
    mepHeader: "CHEF'S RECIPE CARD · MISE EN PLACE",
    mepTitle: "Penetration Test",
    mepSubtitle: "au VulnBank",
    mepQuote: "Before any great dish, we prepare our ingredients.",
    mepLabels: {
      target: "Target",
      cuisine: "Cuisine",
      chefs: "Chefs",
      prepTime: "Prep time",
      model: "Model",
      foodCost: "Food cost",
    },
    mepValues: {
      cuisine: "Black Box — zero prior knowledge",
      chefs: (n: number) => `${n} autonomous AI agents`,
      prepTime: (n: number) => `~${n} minutes`,
      foodCost: (cost: number) => `$${cost.toFixed(2)} (less than the tasting menu)`,
    },
    difficultyLabel: "DIFFICULTY",
    difficultyValue: "CRITICAL",
    dashboardLabel: "Runs",
    runningLabel: "running",
    sendInstruction: "Send instruction to agent…",
    sendBtn: "Send",
    liveEvents: "Live Events",

    // TheScan
    attackSurfaceMap: "ATTACK SURFACE MAP",
    chefQuip:
      "Mapping the kitchen. Every door, every window, every improperly validated input field.",
    scanning: "scanning...",
    scanLegend: { scanning: "scanning", critical: "critical", high: "high" },
    tableHeaders: ["Severity", "Title", "Endpoint", "CVSS"],

    // MainCourse
    mainCourseHeader: "MAIN COURSE",
    criticalFindings: "Critical Findings",
    chefNote: "CHEF'S NOTE",
    analysisTab: "Analysis",
    pocTab: "Proof of Concept",
    descriptionLabel: "Description",
    impactLabel: "Impact",
    reproSteps: "Reproduction Steps",
    keyPayload: "Key Payload",
    exploitScript: "Exploit Script",
    targetLabel: "Target",
    endpointLabel: "Endpoint",
    foundLabel: "Found",

    // Plating
    chefPresLabel: "CHEF'S PRESENTATION",
    chefPresText:
      "And now the full service. Seven courses. All confirmed. Zero false positives. The chef’s compliments to the kitchen — because none of this should have been possible.",
    findingsLabel: "Findings",
    falsePosLabel: "0 false positives",
    cvssLabel: "CVSS",
    maxLabel: "MAX",
    avgLabel: "AVG",
    scanDetailsLabel: "Scan Details",
    platingTableHeaders: ["Severity", "Title", "Endpoint", "Method", "CVSS", "Found"],
    completed: "completed",

    // Tasting
    criticLabel: "CRITIC’S TABLE · FINAL REVIEW",
    tastingTitle: "The Tasting",
    tastingSubtitle: "A seven-course menu of confirmed exploits",
    tastingFindings: [
      {
        item: "Authentication boundary",
        note: "Fully compromised via SQL injection in 19 minutes.",
      },
      {
        item: "Account takeover surface",
        note: "Three-request takeover of any account, including admin. PIN in response body.",
      },
      {
        item: "Internal secret exposure",
        note: "SSRF chains to jwt_secret, IAM keys, and admin JWT forgery.",
      },
      {
        item: "Authorization enforcement",
        note: "Missing on 3 separate resource types. Consistent failure, not isolated.",
      },
      {
        item: "Financial integrity",
        note: "Negative amounts accepted in 2 separate workflows. Funds generated from nothing.",
      },
    ],
    michelinLabel: "MICHELIN GUIDE",
    michelinTitle: "🌶️🌶️🌶️🌶️🌶️ Four Stars of Catastrophic Failure",
    michelinVerdict:
      "An exceptional dining experience for any attacker. The chef has crafted a menu with no validated inputs, no ownership checks, and the secret recipe pinned to the front door. We would not recommend this restaurant to our enemies.",
    scanStatsLabel: "Scan Statistics",
    statLabels: {
      totalFindings: "Total Findings",
      falsePositives: "False Positives",
      runtime: "Runtime",
      requests: "Requests Made",
      tokens: "Tokens Used",
      cost: "Total Cost",
    },
    poweredBy: "Powered by",
    cachedTokens: (n: number) => `${n}M tokens cached`,
    ctaLabel: "Ready to scan your kitchen?",
    ctaBody:
      "Storm AI runs the same fully autonomous pentest against your own applications. Open source, self-hostable, zero false positives.",
    getStarted: "Get Started →",
    joinWaitlist: "Join Waitlist",
  },

  es: {
    // DemoFrame
    chyronLabel: "CHEF GORDON STRIX · COMENTARIO EN VIVO",
    nextCourse: "SIGUIENTE PLATO →",
    getEarlyAccess: "ACCESO ANTICIPADO →",
    nextCourseTransition: "SIGUIENTE PLATO",
    chyrons: [
      "Esta noche cocinamos con cero conocimiento previo, dos tazas de ambición y un modelo de lenguaje inquietantemente capaz.",
      "Todo gran pentest comienza igual: mise en place. Conoce tu objetivo antes de tocar un solo endpoint.",
      "Ya estamos dentro de la cocina. El calor aumenta. Varios campos de entrada ya están sudando.",
      "Inyección SQL. En 2026. El chef no está sorprendido. El chef simplemente está cansado.",
      "Siete hallazgos. Cero falsos positivos. Cero platos devueltos. La cocina ha sido inspeccionada a fondo.",
      "Le daríamos a esta aplicación cero estrellas, pero la densidad de vulnerabilidades por sí sola merece una mención en la guía Michelin.",
    ],

    // ColdOpen
    networkPresents: "THE SECURITY FOOD NETWORK PRESENTA",
    tagline: "Donde cada vulnerabilidad se cocina a la perfección",
    seasonEpisode: "Temporada 01 · Episodio 01",
    episodeTitle: "Un festín de siete platos en VulnBank",
    episodeDesc: (critical: number, high: number, duration: number) =>
      `Esta noche, el Chef Storm sirve ${critical} hallazgos Críticos y ${high} de Alta severidad en una sesión completamente autónoma de ${duration} minutos. Cero falsos positivos. Cero platos devueltos a la cocina.`,
    castLabels: {
      Target: "Objetivo",
      Method: "Método",
      Agents: "Agentes",
      Runtime: "Duración",
      Cost: "Coste",
    },
    finePrint1:
      "Filmado ante una audiencia en vivo de ingenieros de seguridad que definitivamente han visto esto en un banco real.",
    finePrint2: "VulnBank es ficticio. Las vulnerabilidades no. El NDA tampoco.",

    // MiseEnPlace
    mepHeader: "FICHA DE RECETA DEL CHEF · MISE EN PLACE",
    mepTitle: "Prueba de Penetración",
    mepSubtitle: "au VulnBank",
    mepQuote: "Antes de cualquier gran plato, preparamos nuestros ingredientes.",
    mepLabels: {
      target: "Objetivo",
      cuisine: "Técnica",
      chefs: "Chefs",
      prepTime: "Prep",
      model: "Modelo",
      foodCost: "Coste",
    },
    mepValues: {
      cuisine: "Caja Negra — sin conocimiento previo",
      chefs: (n: number) => `${n} agentes de IA autónomos`,
      prepTime: (n: number) => `~${n} minutos`,
      foodCost: (cost: number) => `$${cost.toFixed(2)} (menos que el menú degustación)`,
    },
    difficultyLabel: "DIFICULTAD",
    difficultyValue: "CRÍTICO",
    dashboardLabel: "Ejecuciones",
    runningLabel: "en curso",
    sendInstruction: "Enviar instrucción al agente…",
    sendBtn: "Enviar",
    liveEvents: "Eventos en vivo",

    // TheScan
    attackSurfaceMap: "MAPA DE SUPERFICIE DE ATAQUE",
    chefQuip:
      "Mapeando la cocina. Cada puerta, cada ventana, cada campo de entrada mal validado.",
    scanning: "escaneando...",
    scanLegend: { scanning: "escaneando", critical: "crítico", high: "alto" },
    tableHeaders: ["Severidad", "Título", "Endpoint", "CVSS"],

    // MainCourse
    mainCourseHeader: "PLATO PRINCIPAL",
    criticalFindings: "Hallazgos Críticos",
    chefNote: "NOTA DEL CHEF",
    analysisTab: "Análisis",
    pocTab: "Prueba de Concepto",
    descriptionLabel: "Descripción",
    impactLabel: "Impacto",
    reproSteps: "Pasos de Reproducción",
    keyPayload: "Payload Clave",
    exploitScript: "Script de Exploit",
    targetLabel: "Objetivo",
    endpointLabel: "Endpoint",
    foundLabel: "Encontrado",

    // Plating
    chefPresLabel: "PRESENTACIÓN DEL CHEF",
    chefPresText:
      "Y ahora el servicio completo. Siete platos. Todos confirmados. Cero falsos positivos. Los cumplidos del chef a la cocina — porque nada de esto debería haber sido posible.",
    findingsLabel: "Hallazgos",
    falsePosLabel: "0 falsos positivos",
    cvssLabel: "CVSS",
    maxLabel: "MÁX",
    avgLabel: "PROM",
    scanDetailsLabel: "Detalles del escaneo",
    platingTableHeaders: ["Severidad", "Título", "Endpoint", "Método", "CVSS", "Encontrado"],
    completed: "completado",

    // Tasting
    criticLabel: "MESA DE LA CRÍTICA · RESEÑA FINAL",
    tastingTitle: "La Cata",
    tastingSubtitle: "Un menú de siete platos de exploits confirmados",
    tastingFindings: [
      {
        item: "Límite de autenticación",
        note: "Completamente comprometido mediante inyección SQL en 19 minutos.",
      },
      {
        item: "Superficie de toma de cuentas",
        note: "Toma de cualquier cuenta, incluida la de admin, en tres peticiones. PIN en el cuerpo de la respuesta.",
      },
      {
        item: "Exposición de secretos internos",
        note: "El SSRF encadena jwt_secret, credenciales IAM y falsificación de JWT de admin.",
      },
      {
        item: "Control de autorización",
        note: "Ausente en 3 tipos de recursos distintos. Fallo sistemático, no aislado.",
      },
      {
        item: "Integridad financiera",
        note: "Importes negativos aceptados en 2 flujos de trabajo separados. Fondos generados de la nada.",
      },
    ],
    michelinLabel: "GUÍA MICHELIN",
    michelinTitle: "🌶️🌶️🌶️🌶️🌶️ Cuatro Estrellas al Fracaso Catastrófico",
    michelinVerdict:
      "Una experiencia gastronómica excepcional para cualquier atacante. El chef ha elaborado un menú sin entradas validadas, sin verificaciones de titularidad y con la receta secreta clavada en la puerta principal. No recommendaríamos este restaurante ni a nuestros enemigos.",
    scanStatsLabel: "Estadísticas del escaneo",
    statLabels: {
      totalFindings: "Hallazgos totales",
      falsePositives: "Falsos positivos",
      runtime: "Duración",
      requests: "Peticiones realizadas",
      tokens: "Tokens usados",
      cost: "Coste total",
    },
    poweredBy: "Impulsado por",
    cachedTokens: (n: number) => `${n}M tokens en caché`,
    ctaLabel: "¿Listo para escanear tu cocina?",
    ctaBody:
      "Storm AI ejecuta el mismo pentest completamente autónomo contra tus propias aplicaciones. Open source, auto-hospedable, cero falsos positivos.",
    getStarted: "Empezar →",
    joinWaitlist: "Unirse a la lista de espera",
  },
};
