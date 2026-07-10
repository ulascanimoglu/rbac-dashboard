export const LOCALES = ["en", "tr"] as const;
export type Locale = (typeof LOCALES)[number];

const en = {
  "app.name": "Console",
  "common.demo": "Demo data",
  "common.loading": "Loading…",

  "nav.dashboard": "Dashboard",
  "nav.employees": "Employees",
  "nav.users": "Users & Roles",
  "nav.settings": "Settings",

  "header.signOut": "Sign out",
  "header.account": "Account",

  "login.title": "Sign in to Console",
  "login.subtitle": "Pick a role to see how the dashboard changes with permissions.",
  "login.continue": "Continue as {role}",
  "role.admin": "Admin",
  "role.manager": "Manager",
  "role.viewer": "Viewer",
  "role.admin.hint": "Full access — manage employees, users and settings.",
  "role.manager.hint": "Can view and add employees.",
  "role.viewer.hint": "Read-only access to employees.",

  "dashboard.title": "Dashboard",
  "dashboard.subtitle": "An overview of your team.",
  "stats.total": "Total employees",
  "stats.active": "Active",
  "stats.onLeave": "On leave",
  "stats.invited": "Invited",
  "chart.title": "Headcount by department",

  "employees.title": "Employees",
  "employees.subtitle": "Search, sort and manage your team.",
  "employees.search": "Search by name or email",
  "employees.add": "Add employee",
  "employees.count": "{total} employees",

  "table.name": "Name",
  "table.email": "Email",
  "table.department": "Department",
  "table.jobTitle": "Title",
  "table.status": "Status",
  "table.created": "Joined",
  "table.actions": "Actions",

  "status.active": "Active",
  "status.on_leave": "On leave",
  "status.invited": "Invited",

  "action.delete": "Delete",

  "pagination.showing": "Page {page} of {pages}",
  "pagination.prev": "Previous",
  "pagination.next": "Next",

  "empty.title": "No employees found",
  "empty.body": "Try a different search, or add a new employee.",
  "error.title": "Couldn't load employees",
  "error.body": "Something went wrong while fetching the data.",
  "error.retry": "Try again",

  "form.heading": "Add employee",
  "form.hint": "Fields are validated with Zod before saving.",
  "form.field.name": "Full name",
  "form.field.email": "Email",
  "form.field.department": "Department",
  "form.field.jobTitle": "Title",
  "form.field.status": "Status",
  "form.submit": "Save employee",
  "form.saving": "Saving…",
  "form.cancel": "Cancel",
  "form.success": "Employee added",

  "users.title": "Users & Roles",
  "users.subtitle": "How permissions map to each role in this demo.",
  "users.role": "Role",
  "permission.employees_read": "View employees",
  "permission.employees_create": "Add employees",
  "permission.employees_delete": "Delete employees",
  "permission.users_read": "View users & roles",
  "permission.settings_manage": "Manage settings",

  "rbac.denied.title": "You don't have access to this page",
  "rbac.denied.body": "Your role ({role}) can't view this section. Switch role from the top bar to try it.",
  "rbac.denied.back": "Back to dashboard",

  "settings.title": "Settings",
  "settings.subtitle": "Admin-only area.",
  "settings.placeholder": "Settings would live here. This page is gated behind the settings:manage permission.",

  "theme.toggle": "Toggle theme",
  "lang.toggle": "Change language",
  "auth.redirect": "Redirecting…",
};

export type MessageKey = keyof typeof en;
export type Dict = Record<MessageKey, string>;

const tr: Dict = {
  "app.name": "Konsol",
  "common.demo": "Demo veri",
  "common.loading": "Yükleniyor…",

  "nav.dashboard": "Panel",
  "nav.employees": "Çalışanlar",
  "nav.users": "Kullanıcılar ve Roller",
  "nav.settings": "Ayarlar",

  "header.signOut": "Çıkış yap",
  "header.account": "Hesap",

  "login.title": "Konsol'a giriş yap",
  "login.subtitle": "İzinlerle panelin nasıl değiştiğini görmek için bir rol seç.",
  "login.continue": "{role} olarak devam et",
  "role.admin": "Yönetici",
  "role.manager": "Müdür",
  "role.viewer": "İzleyici",
  "role.admin.hint": "Tam erişim — çalışan, kullanıcı ve ayarları yönet.",
  "role.manager.hint": "Çalışanları görüntüleyebilir ve ekleyebilir.",
  "role.viewer.hint": "Çalışanlara sadece okuma erişimi.",

  "dashboard.title": "Panel",
  "dashboard.subtitle": "Ekibine genel bakış.",
  "stats.total": "Toplam çalışan",
  "stats.active": "Aktif",
  "stats.onLeave": "İzinde",
  "stats.invited": "Davetli",
  "chart.title": "Departmana göre çalışan sayısı",

  "employees.title": "Çalışanlar",
  "employees.subtitle": "Ekibini ara, sırala ve yönet.",
  "employees.search": "İsim veya e-posta ile ara",
  "employees.add": "Çalışan ekle",
  "employees.count": "{total} çalışan",

  "table.name": "İsim",
  "table.email": "E-posta",
  "table.department": "Departman",
  "table.jobTitle": "Ünvan",
  "table.status": "Durum",
  "table.created": "Katılım",
  "table.actions": "İşlemler",

  "status.active": "Aktif",
  "status.on_leave": "İzinde",
  "status.invited": "Davetli",

  "action.delete": "Sil",

  "pagination.showing": "Sayfa {page} / {pages}",
  "pagination.prev": "Önceki",
  "pagination.next": "Sonraki",

  "empty.title": "Çalışan bulunamadı",
  "empty.body": "Farklı bir arama dene ya da yeni bir çalışan ekle.",
  "error.title": "Çalışanlar yüklenemedi",
  "error.body": "Veri alınırken bir şeyler ters gitti.",
  "error.retry": "Tekrar dene",

  "form.heading": "Çalışan ekle",
  "form.hint": "Alanlar kaydetmeden önce Zod ile doğrulanır.",
  "form.field.name": "Ad soyad",
  "form.field.email": "E-posta",
  "form.field.department": "Departman",
  "form.field.jobTitle": "Ünvan",
  "form.field.status": "Durum",
  "form.submit": "Çalışanı kaydet",
  "form.saving": "Kaydediliyor…",
  "form.cancel": "İptal",
  "form.success": "Çalışan eklendi",

  "users.title": "Kullanıcılar ve Roller",
  "users.subtitle": "Bu demoda izinlerin rollere göre dağılımı.",
  "users.role": "Rol",
  "permission.employees_read": "Çalışanları görüntüle",
  "permission.employees_create": "Çalışan ekle",
  "permission.employees_delete": "Çalışan sil",
  "permission.users_read": "Kullanıcı ve rolleri görüntüle",
  "permission.settings_manage": "Ayarları yönet",

  "rbac.denied.title": "Bu sayfaya erişimin yok",
  "rbac.denied.body": "Rolün ({role}) bu bölümü göremez. Denemek için üst çubuktan rol değiştir.",
  "rbac.denied.back": "Panele dön",

  "settings.title": "Ayarlar",
  "settings.subtitle": "Sadece yönetici alanı.",
  "settings.placeholder": "Ayarlar burada olurdu. Bu sayfa settings:manage iznine kilitlidir.",

  "theme.toggle": "Temayı değiştir",
  "lang.toggle": "Dili değiştir",
  "auth.redirect": "Yönlendiriliyor…",
};

export const dictionaries: Record<Locale, Dict> = { en, tr };
