"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "es" | "pt"

// Definições de tradução inline para evitar problemas de importação
const translations = {
  en: {
    common: {
      notifications: "Notifications",
      viewAll: "View All",
      mentions: "Mentions",
      followers: "Followers",
      invites: "Invites",
      followed: "followed you",
      commented: "commented on your post",
      purchased: "Successfully purchased a",
      for: "for",
      seconds: "sec",
      minutes: "min",
      hours: "h",
      days: "d",
      yesterday: "Yesterday",
      today: "Today",
      markAllAsRead: "Mark all as read",
      clearAll: "Clear all",
      noNotifications: "No notifications",
    },
    header: {
      search: "Search for...",
      settings: "Settings",
      profile: "Profile",
      logout: "Logout",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
    },
    languages: {
      en: "English",
      es: "Spanish",
      pt: "Portuguese",
    },
    dashboard: {
      welcome: "Welcome to Synergy,",
      description:
        "An ecommerce dashboard has just that purpose. It provides your ecommerce team with a clear overview of key financial and website KPIs at any time.",
      takeProduct: "Take a Product",
      ecommerce: "Ecommerce",
      dashboards: "Dashboards",
      trafficResources: "Traffic Resources",
      viewStatus: "View Status",
      salesRevenue: "Sales Revenue Overview",
      selectDate: "Select Date",
      totalSales: "Total Sales",
      totalProfit: "Total Profit",
      salesData: "Sales data visualization removed as requested",
      profitData: "Profit data visualization removed as requested",
      total: "Total:",
      formatExamples: "Format Examples",
      numberFormat: "Number Format",
      dateFormat: "Date Format",
      number: "Number",
      currency: "Currency",
      percentage: "Percentage",
      shortDate: "Short Date",
      longDate: "Long Date",
      time: "Time",
      dateTime: "Date and Time",
      timeAgo: "Time Ago",
    },
    menu: {
      email: "Email",
      calendar: "Calendar",
      ecommerce: "Ecommerce",
      hrManagement: "HR Management",
      notes: "Notes",
      social: "Social",
      invoices: "Invoices",
      users: "Users",
      pages: "PAGES",
      authentication: "Authentication",
      pagesGeneric: "Pages",
      components: "COMPONENTS",
      uiElements: "UI Elements",
      plugins: "Plugins",
      navigation: "Navigation",
      forms: "Forms",
      tables: "Tables",
      apexcharts: "Apexcharts",
      icons: "Icons",
      administrator: "Administrator",
      dayView: "Day View",
      weekView: "Week View",
      monthView: "Month View",
      yearView: "Year View",
      dashboard: "Dashboard",
      products: "Products",
      orders: "Orders",
      customers: "Customers",
      employees: "Employees",
      payroll: "Payroll",
      recruitment: "Recruitment",
      feed: "Feed",
      activity: "Activity",
      friends: "Friends",
      list: "List",
      create: "Create",
      userList: "User List",
      userDetails: "User Details",
      userEdit: "User Edit",
      login: "Login",
      register: "Register",
      forgotPassword: "Forgot Password",
      pricing: "Pricing",
      faq: "FAQ",
      blank: "Blank",
      buttons: "Buttons",
      cards: "Cards",
      modals: "Modals",
    },
    notifications: {
      follower: {
        title: "New Follower",
        message: "You have a new follower",
      },
      mention: {
        title: "New Mention",
        message: "Someone mentioned you in a comment",
      },
      purchase: {
        title: "Purchase Successful",
        message: "Your purchase was successful",
      },
    },
  },
  es: {
    common: {
      notifications: "Notificaciones",
      viewAll: "Ver Todo",
      mentions: "Menciones",
      followers: "Seguidores",
      invites: "Invitaciones",
      followed: "te siguió",
      commented: "comentó en tu publicación",
      purchased: "Compra exitosa de un",
      for: "por",
      seconds: "seg",
      minutes: "min",
      hours: "h",
      days: "d",
      yesterday: "Ayer",
      today: "Hoy",
      markAllAsRead: "Marcar todo como leído",
      clearAll: "Borrar todo",
      noNotifications: "No hay notificaciones",
    },
    header: {
      search: "Buscar...",
      settings: "Configuración",
      profile: "Perfil",
      logout: "Cerrar sesión",
      darkMode: "Modo oscuro",
      lightMode: "Modo claro",
    },
    languages: {
      en: "Inglés",
      es: "Español",
      pt: "Portugués",
    },
    dashboard: {
      welcome: "Bienvenido a Synergy,",
      description:
        "Un panel de comercio electrónico tiene precisamente ese propósito. Proporciona a tu equipo de comercio electrónico una visión clara de los KPI financieros y del sitio web en cualquier momento.",
      takeProduct: "Tomar un Producto",
      ecommerce: "Comercio Electrónico",
      dashboards: "Paneles",
      trafficResources: "Fuentes de Tráfico",
      viewStatus: "Ver Estado",
      salesRevenue: "Resumen de Ingresos por Ventas",
      selectDate: "Seleccionar Fecha",
      totalSales: "Ventas Totales",
      totalProfit: "Beneficio Total",
      salesData: "Visualización de datos de ventas eliminada según lo solicitado",
      profitData: "Visualización de datos de beneficios eliminada según lo solicitado",
      total: "Total:",
      formatExamples: "Ejemplos de Formato",
      numberFormat: "Formato de Números",
      dateFormat: "Formato de Fechas",
      number: "Número",
      currency: "Moneda",
      percentage: "Porcentaje",
      shortDate: "Fecha Corta",
      longDate: "Fecha Larga",
      time: "Hora",
      dateTime: "Fecha y Hora",
      timeAgo: "Hace Tiempo",
    },
    menu: {
      email: "Correo",
      calendar: "Calendario",
      ecommerce: "Comercio Electrónico",
      hrManagement: "Gestión de RRHH",
      notes: "Notas",
      social: "Social",
      invoices: "Facturas",
      users: "Usuarios",
      pages: "PÁGINAS",
      authentication: "Autenticación",
      pagesGeneric: "Páginas",
      components: "COMPONENTES",
      uiElements: "Elementos UI",
      plugins: "Plugins",
      navigation: "Navegación",
      forms: "Formularios",
      tables: "Tablas",
      apexcharts: "Gráficos Apex",
      icons: "Iconos",
      administrator: "Administrador",
      dayView: "Vista Diaria",
      weekView: "Vista Semanal",
      monthView: "Vista Mensual",
      yearView: "Vista Anual",
      dashboard: "Panel",
      products: "Productos",
      orders: "Pedidos",
      customers: "Clientes",
      employees: "Empleados",
      payroll: "Nómina",
      recruitment: "Reclutamiento",
      feed: "Noticias",
      activity: "Actividad",
      friends: "Amigos",
      list: "Lista",
      create: "Crear",
      userList: "Lista de Usuarios",
      userDetails: "Detalles de Usuario",
      userEdit: "Editar Usuario",
      login: "Iniciar Sesión",
      register: "Registrarse",
      forgotPassword: "Olvidé mi Contraseña",
      pricing: "Precios",
      faq: "Preguntas Frecuentes",
      blank: "En Blanco",
      buttons: "Botones",
      cards: "Tarjetas",
      modals: "Modales",
    },
    notifications: {
      follower: {
        title: "Nuevo Seguidor",
        message: "Tienes un nuevo seguidor",
      },
      mention: {
        title: "Nueva Mención",
        message: "Alguien te mencionó en un comentario",
      },
      purchase: {
        title: "Compra Exitosa",
        message: "Tu compra fue exitosa",
      },
    },
  },
  pt: {
    common: {
      notifications: "Notificações",
      viewAll: "Ver Todos",
      mentions: "Menções",
      followers: "Seguidores",
      invites: "Convites",
      followed: "seguiu você",
      commented: "comentou em sua publicação",
      purchased: "Comprou com sucesso um",
      for: "por",
      seconds: "seg",
      minutes: "min",
      hours: "h",
      days: "d",
      yesterday: "Ontem",
      today: "Hoje",
      markAllAsRead: "Marcar tudo como lido",
      clearAll: "Limpar tudo",
      noNotifications: "Não há notificações",
    },
    header: {
      search: "Pesquisar...",
      settings: "Configurações",
      profile: "Perfil",
      logout: "Sair",
      darkMode: "Modo escuro",
      lightMode: "Modo claro",
    },
    languages: {
      en: "Inglês",
      es: "Espanhol",
      pt: "Português",
    },
    dashboard: {
      welcome: "Bem-vindo ao Synergy,",
      description:
        "Um painel de e-commerce tem exatamente esse propósito. Ele fornece à sua equipe de e-commerce uma visão clara dos principais KPIs financeiros e do site a qualquer momento.",
      takeProduct: "Escolher um Produto",
      ecommerce: "E-commerce",
      dashboards: "Painéis",
      trafficResources: "Fontes de Tráfego",
      viewStatus: "Ver Status",
      salesRevenue: "Visão Geral da Receita de Vendas",
      selectDate: "Selecionar Data",
      totalSales: "Vendas Totais",
      totalProfit: "Lucro Total",
      salesData: "Visualização de dados de vendas removida conforme solicitado",
      profitData: "Visualização de dados de lucro removida conforme solicitado",
      total: "Total:",
      formatExamples: "Exemplos de Formatação",
      numberFormat: "Formato de Números",
      dateFormat: "Formato de Datas",
      number: "Número",
      currency: "Moeda",
      percentage: "Porcentagem",
      shortDate: "Data Curta",
      longDate: "Data Longa",
      time: "Hora",
      dateTime: "Data e Hora",
      timeAgo: "Tempo Atrás",
    },
    menu: {
      email: "Email",
      calendar: "Calendário",
      ecommerce: "E-commerce",
      hrManagement: "Gestão de RH",
      notes: "Notas",
      social: "Social",
      invoices: "Faturas",
      users: "Usuários",
      pages: "PÁGINAS",
      authentication: "Autenticação",
      pagesGeneric: "Páginas",
      components: "COMPONENTES",
      uiElements: "Elementos UI",
      plugins: "Plugins",
      navigation: "Navegação",
      forms: "Formulários",
      tables: "Tabelas",
      apexcharts: "Gráficos Apex",
      icons: "Ícones",
      administrator: "Administrador",
      dayView: "Visão Diária",
      weekView: "Visão Semanal",
      monthView: "Visão Mensal",
      yearView: "Visão Anual",
      dashboard: "Painel",
      products: "Produtos",
      orders: "Pedidos",
      customers: "Clientes",
      employees: "Funcionários",
      payroll: "Folha de Pagamento",
      recruitment: "Recrutamento",
      feed: "Feed",
      activity: "Atividade",
      friends: "Amigos",
      list: "Lista",
      create: "Criar",
      userList: "Lista de Usuários",
      userDetails: "Detalhes do Usuário",
      userEdit: "Editar Usuário",
      login: "Entrar",
      register: "Registrar",
      forgotPassword: "Esqueci a Senha",
      pricing: "Preços",
      faq: "Perguntas Frequentes",
      blank: "Em Branco",
      buttons: "Botões",
      cards: "Cartões",
      modals: "Modais",
    },
    notifications: {
      follower: {
        title: "Novo Seguidor",
        message: "Você tem um novo seguidor",
      },
      mention: {
        title: "Nova Menção",
        message: "Alguém mencionou você em um comentário",
      },
      purchase: {
        title: "Compra Bem-sucedida",
        message: "Sua compra foi bem-sucedida",
      },
    },
  },
}

type Translations = typeof translations.en

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt")
  const [t, setTranslations] = useState<Translations>(translations.pt)

  useEffect(() => {
    // Verificar se há uma preferência de idioma salva
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "es", "pt"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
      setTranslations(translations[savedLanguage])
    } else {
      // Detectar idioma do navegador, mas usar pt como fallback
      const browserLang = navigator.language.split("-")[0] as Language
      if (["en", "es", "pt"].includes(browserLang)) {
        setLanguageState(browserLang)
        setTranslations(translations[browserLang])
      } else {
        // Usar pt como padrão se o idioma do navegador não for suportado
        setLanguageState("pt")
        setTranslations(translations.pt)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setTranslations(translations[lang])
    localStorage.setItem("language", lang)
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}
