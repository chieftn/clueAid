export enum AssertionType {
    DoesNotHave,
    Has
}

export interface Assertion {
    playerName: string;
    assertionType: AssertionType;
    cardName: string;
}