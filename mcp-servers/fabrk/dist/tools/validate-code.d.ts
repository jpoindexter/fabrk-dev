/**
 * Validate Code Tool
 * Check code against Fabrk design system rules
 */
interface ValidateCodeArgs {
    code: string;
    strict?: boolean;
}
interface ValidationIssue {
    rule: string;
    message: string;
    line?: number;
    severity: 'error' | 'warning';
    suggestion?: string;
}
interface ValidationResult {
    valid: boolean;
    errors: ValidationIssue[];
    warnings: ValidationIssue[];
    score: number;
    summary: string;
}
export declare function validateCode(args: ValidateCodeArgs): ValidationResult;
export {};
//# sourceMappingURL=validate-code.d.ts.map