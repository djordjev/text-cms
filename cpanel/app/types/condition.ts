export type ConditionOperator = '=' | '>' | '>=' | '<' | '<=' | 'in';

export type ConditionDescriptor = [string, ConditionOperator, string];

export type ConditionAndChain = ConditionDescriptor[];

export type ConditionGroup = ConditionAndChain[];
