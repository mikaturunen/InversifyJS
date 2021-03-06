/// <reference path="../interfaces.d.ts" />

interface SymbolConstructor {
    (description?: string|number): symbol;
}

declare var Symbol: SymbolConstructor;
