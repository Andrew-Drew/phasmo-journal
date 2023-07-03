interface Ghost {
    name: string
    wikiUrl: string
    sanityThreshold: number
    strengthsShort: string[]
    abilitiesShort?: string[]
    weaknessesShort: string[]
    evidence: EvidenceType[]
    notes?: string[]
}

interface Evidence {
    displayName: string
    nameShort: string
}

declare const enum EvidenceType {
    Dots = 1,
    Emf = 2,
    Fingerprints = 3,
    FreezingTemps = 4,
    Orbs = 5,
    Writing = 6,
    SpiritBox = 7
}
