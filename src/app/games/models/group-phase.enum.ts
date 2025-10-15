export enum GroupPhase {
    Forming,
    Storming,
    Norming,
    Performing,
    Adjourning
}

export const GroupPhases: { key: string, value: string | GroupPhase }[] = Object.entries(GroupPhase)
    .filter(([key]: [string, string | GroupPhase]) => isNaN(Number(key)))
    .map(([key, value]: [string, string | GroupPhase]) => ({ key, value }));
