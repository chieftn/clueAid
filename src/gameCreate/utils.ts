export const validatePlayerName = (name: string): string => {
    if (!name) {
        return 'Please enter a name for this player.'
    }

    return '';
};

export const getDuplicatePlayerNames = (playerNames: string[]): Set<string> => {
    const duplicateNames = new Set<string>();
    const allNames = new Set<string>();

    playerNames.forEach(s => {
        if(!s) {
            return;
        }

        if (allNames.has(s)) {
            duplicateNames.add(s);
        }

        allNames.add(s);
    });

    return duplicateNames;
};

export interface HasErrorsParameters {
    playerValidations: Record<number,string>;
    playerNameDuplicates: Set<string>;
    formValidations: string[];
}
export const hasErrors = (parameters: HasErrorsParameters): boolean => {
    if (parameters.formValidations.length > 0 ||
        parameters.playerNameDuplicates.size > 0 ||
        Object.values(parameters.playerValidations).reduce((p, c) => p + c, '')) {
            return true
        }

    return false;
}