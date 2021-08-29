
interface Lang {
    ja: string;
    en: string;
}

export function i18n(params: Lang): string {
    return params.ja;
}