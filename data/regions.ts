// TODO: remove enum representation

export enum ERegion {
  "UNSKO_SANSKI_KANTON" = "UNSKO_SANSKI_KANTON",
  "POSAVSKI_KANTON" = "POSAVSKI_KANTON",
  "TUZLANSKI_KANTON" = "TUZLANSKI_KANTON",
  "ZENICKO_DOBOJSKI_KANTON" = "ZENICKO_DOBOJSKI_KANTON",
  "BOSANSKO_PODRINJSKI_KANTON" = "BOSANSKO_PODRINJSKI_KANTON",
  "SREDNJOBOSANSKI_KANTON" = "SREDNJOBOSANSKI_KANTON",
  "HERCEGOVACKO_NERETVANSKI_KANTON" = "HERCEGOVACKO_NERETVANSKI_KANTON",
  "ZAPADNOHERCEGOVACKI_KANTON" = "ZAPADNOHERCEGOVACKI_KANTON",
  "KANTON_SARAJEVO" = "KANTON_SARAJEVO",
  "KANTON_10" = "KANTON_10",
  "BANJALUCKA_REGIJA" = "BANJALUCKA_REGIJA",
  "DOBOJSKO_BIJELJINSKA_REGIJA" = "DOBOJSKO_BIJELJINSKA_REGIJA",
  "SARAJEVSKO_ZVORNICKA_REGIJA" = "SARAJEVSKO_ZVORNICKA_REGIJA",
  "TREBINJSKO_FOCANSKA_REGIJA" = "TREBINJSKO_FOCANSKA_REGIJA",
  "BRCKO_DISTRIKT" = "BRCKO_DISTRIKT",
}

export const regions = [
  {
    value: "UNSKO_SANSKI_KANTON" as const,
    label: "Unsko-sanski kanton",
    orderPriority: 100,
  },
  {
    value: "POSAVSKI_KANTON" as const,
    label: "Posavski kanton",
    orderPriority: 200,
  },
  {
    value: "TUZLANSKI_KANTON" as const,
    label: "Tuzlanski kanton",
    orderPriority: 300,
  },
  {
    value: "ZENICKO_DOBOJSKI_KANTON" as const,
    label: "Zeničko-dobojski kanton",
    orderPriority: 400,
  },
  {
    value: "BOSANSKO_PODRINJSKI_KANTON" as const,
    label: "Bosansko-podrinjski kanton",
    orderPriority: 500,
  },
  {
    value: "SREDNJOBOSANSKI_KANTON" as const,
    label: "Srednjobosanski kanton",
    orderPriority: 600,
  },
  {
    value: "HERCEGOVACKO_NERETVANSKI_KANTON" as const,
    label: "Hercegovačko-neretvanski kanton",
    orderPriority: 700,
  },
  {
    value: "ZAPADNOHERCEGOVACKI_KANTON" as const,
    label: "Zapadnohercegovački kanton",
    orderPriority: 800,
  },
  {
    value: "KANTON_SARAJEVO" as const,
    label: "Kanton Sarajevo",
    orderPriority: 900,
  },
  { value: "KANTON_10", label: "Kanton 10", orderPriority: 1000 } as const,
  {
    value: "BANJALUCKA_REGIJA" as const,
    label: "Banjalučka regija",
    orderPriority: 1100,
  },
  {
    value: "DOBOJSKO_BIJELJINSKA_REGIJA" as const,
    label: "Dobojsko-bijeljinska regija",
    orderPriority: 1200,
  },
  {
    value: "SARAJEVSKO_ZVORNICKA_REGIJA" as const,
    label: "Sarajevsko-zvornička regija",
    orderPriority: 1300,
  },
  {
    value: "TREBINJSKO_FOCANSKA_REGIJA" as const,
    label: "Trebinjsko-fočanska regija",
    orderPriority: 1400,
  },
  {
    value: "BRCKO_DISTRIKT" as const,
    label: "Brčko distrikt",
    orderPriority: 1500,
  },
];

export const regionValues = [
  "UNSKO_SANSKI_KANTON",
  "POSAVSKI_KANTON",
  "TUZLANSKI_KANTON",
  "ZENICKO_DOBOJSKI_KANTON",
  "BOSANSKO_PODRINJSKI_KANTON",
  "SREDNJOBOSANSKI_KANTON",
  "HERCEGOVACKO_NERETVANSKI_KANTON",
  "ZAPADNOHERCEGOVACKI_KANTON",
  "KANTON_SARAJEVO",
  "KANTON_10",
  "BANJALUCKA_REGIJA",
  "DOBOJSKO_BIJELJINSKA_REGIJA",
  "SARAJEVSKO_ZVORNICKA_REGIJA",
  "TREBINJSKO_FOCANSKA_REGIJA",
  "BRCKO_DISTRIKT",
] as const;

export const regionsByValue = new Map(regions.map((o) => [o.value, o]));
