import { format, formatDistanceToNow, formatRelative } from "date-fns"
import { ptBR, es, enUS } from "date-fns/locale"

type Locale = "pt" | "es" | "en"

// Mapeamento de locales para date-fns
const locales = {
  pt: ptBR,
  es: es,
  en: enUS,
}

// Configurações de formato para cada idioma
const formatConfigs = {
  en: {
    formats: {
      date: {
        short: "MM/dd/yyyy",
        medium: "MMM d, yyyy",
        long: "MMMM d, yyyy",
        full: "EEEE, MMMM d, yyyy",
      },
      time: {
        short: "h:mm a",
        medium: "h:mm:ss a",
        long: "h:mm:ss a z",
      },
      datetime: {
        short: "MM/dd/yyyy, h:mm a",
        medium: "MMM d, yyyy, h:mm:ss a",
        long: "MMMM d, yyyy 'at' h:mm:ss a z",
      },
      number: {
        decimal: ".",
        thousand: ",",
        precision: 2,
      },
      currency: {
        symbol: "$",
        code: "USD",
        name: "US Dollar",
      },
    },
  },
  es: {
    formats: {
      date: {
        short: "dd/MM/yyyy",
        medium: "d 'de' MMM 'de' yyyy",
        long: "d 'de' MMMM 'de' yyyy",
        full: "EEEE, d 'de' MMMM 'de' yyyy",
      },
      time: {
        short: "H:mm",
        medium: "H:mm:ss",
        long: "H:mm:ss z",
      },
      datetime: {
        short: "dd/MM/yyyy, H:mm",
        medium: "d 'de' MMM 'de' yyyy, H:mm:ss",
        long: "d 'de' MMMM 'de' yyyy, H:mm:ss z",
      },
      number: {
        decimal: ",",
        thousand: ".",
        precision: 2,
      },
      currency: {
        symbol: "€",
        code: "EUR",
        name: "Euro",
      },
    },
  },
  pt: {
    formats: {
      date: {
        short: "dd/MM/yyyy",
        medium: "d 'de' MMM 'de' yyyy",
        long: "d 'de' MMMM 'de' yyyy",
        full: "EEEE, d 'de' MMMM 'de' yyyy",
      },
      time: {
        short: "HH:mm",
        medium: "HH:mm:ss",
        long: "HH:mm:ss z",
      },
      datetime: {
        short: "dd/MM/yyyy, HH:mm",
        medium: "d 'de' MMM 'de' yyyy, HH:mm:ss",
        long: "d 'de' MMMM 'de' yyyy, HH:mm:ss z",
      },
      number: {
        decimal: ",",
        thousand: ".",
        precision: 2,
      },
      currency: {
        symbol: "R$",
        code: "BRL",
        name: "Real Brasileiro",
      },
    },
  },
}

/**
 * Formata um número de acordo com o locale
 */
export function formatNumber(value: number, locale: Locale, options?: Intl.NumberFormatOptions): string {
  const defaultOptions = {
    minimumFractionDigits: formatConfigs[locale].formats.number.precision,
    maximumFractionDigits: formatConfigs[locale].formats.number.precision,
  }

  return new Intl.NumberFormat(getFullLocale(locale), { ...defaultOptions, ...options }).format(value)
}

/**
 * Formata um valor monetário de acordo com o locale
 */
export function formatCurrency(value: number, locale: Locale, options?: Intl.NumberFormatOptions): string {
  const defaultOptions = {
    style: "currency",
    currency: formatConfigs[locale].formats.currency.code,
    minimumFractionDigits: formatConfigs[locale].formats.number.precision,
    maximumFractionDigits: formatConfigs[locale].formats.number.precision,
  }

  return new Intl.NumberFormat(getFullLocale(locale), { ...defaultOptions, ...options }).format(value)
}

/**
 * Formata um valor monetário com o símbolo da moeda
 * Útil quando queremos manter o formato mas mudar apenas o símbolo
 */
export function formatCurrencyWithSymbol(value: string, locale: Locale): string {
  // Remove qualquer símbolo de moeda existente
  const numericValue = value.replace(/[^0-9,.]/g, "")

  // Se o valor for um formato como "236.18k", mantém o "k" e adiciona o símbolo da moeda
  if (value.includes("k")) {
    return `${formatConfigs[locale].formats.currency.symbol}${numericValue}k`
  }

  return `${formatConfigs[locale].formats.currency.symbol}${numericValue}`
}

/**
 * Formata uma data de acordo com o locale
 */
export function formatDate(
  date: Date,
  locale: Locale,
  formatType: "short" | "medium" | "long" | "full" = "medium",
): string {
  const formatStr = formatConfigs[locale].formats.date[formatType]
  return format(date, formatStr, { locale: locales[locale] })
}

/**
 * Formata uma data e hora de acordo com o locale
 */
export function formatDateTime(date: Date, locale: Locale, formatType: "short" | "medium" | "long" = "medium"): string {
  const formatStr = formatConfigs[locale].formats.datetime[formatType]
  return format(date, formatStr, { locale: locales[locale] })
}

/**
 * Formata uma hora de acordo com o locale
 */
export function formatTime(date: Date, locale: Locale, formatType: "short" | "medium" | "long" = "medium"): string {
  const formatStr = formatConfigs[locale].formats.time[formatType]
  return format(date, formatStr, { locale: locales[locale] })
}

/**
 * Formata uma data relativa (ex: "há 2 dias") de acordo com o locale
 */
export function formatRelativeDate(date: Date, locale: Locale): string {
  return formatRelative(date, new Date(), { locale: locales[locale] })
}

/**
 * Formata uma distância de tempo até agora (ex: "há 5 minutos") de acordo com o locale
 */
export function formatTimeAgo(date: Date, locale: Locale, options?: Parameters<typeof formatDistanceToNow>[1]): string {
  return formatDistanceToNow(date, {
    locale: locales[locale],
    addSuffix: true,
    ...options,
  })
}

/**
 * Retorna o código de locale completo baseado no idioma
 */
function getFullLocale(locale: Locale): string {
  switch (locale) {
    case "pt":
      return "pt-BR"
    case "es":
      return "es-ES"
    case "en":
    default:
      return "en-US"
  }
}
