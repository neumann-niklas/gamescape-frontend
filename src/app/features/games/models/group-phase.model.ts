export enum GroupPhase {
    Forming,
    Storming,
    Norming,
    Performing,
    Adjourning
}

export const groupPhases: {
    readonly key: string,
    readonly value: string | GroupPhase
}[] = Object.entries(GroupPhase)
    .filter(([key]: [string, string | GroupPhase]) => isNaN(Number(key)))
    .map(([key, value]: [string, string | GroupPhase]) => ({ key, value }));
