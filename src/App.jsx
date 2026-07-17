import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Cars from "./components/Cars";
import Rentals from "./components/Rentals";
import Clients from "./components/Clients";
import Invoices from "./components/Invoices";
import Login from "./components/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./components/AuthContext";
import Setting from "./components/Setting";
import { useState } from "react";

const translations = {
  en: {
    dashboard: "Dashboard",
    cars: "Cars",
    reservations: "Reservations",
    clients: "Clients",
    contracts: "Contracts",
    logout: "Logout",
    search: "Search",
    addCar: "Add a car",
    delete: "Delete",
    update: "Update",
    ok: "OK",
    cancel: "Cancel",
    confirmDelete: "Are you sure you want to delete this car?",
    fleet: "Fleet",
    clientsTitle: "CLIENTS",
    fullName: "FULL NAME",
    phone: "PHONE",
    licenseNo: "LICENSE NO.",
    no: "No.",
    dashboardTitle: "DASHBOARD",
    availableCars: "Available cars",
    totalBookings: "Total bookings",
    pendingBookings: "Pending bookings",
    activeRentals: "Active rentals",
    carsToReturn: "Cars to return",
    overdueRentals: "Overdue rentals",
    contractList: "Contract list",
    loadingContracts: "Loading contracts...",
    errorLabel: "Error",
    downloadPdf: "Download PDF",
    login: "Login",
    password: "Password",
    demoPassword: "Demo password",
    oldPassword: "Old password",
    newPassword: "New password",
    save: "Save",
    settingsTitle: "Settings",
    changePassword: "Change password",
    brand: "Brand",
    model: "Model",
    year: "Year",
    plate: "Plate",
    price: "Price per day",
    image: "Image",
    status: "Status",
    fuel: "Fuel",
    transmission: "Transmission",
    add: "Add",
    choose: "--choose--",
    available: "Available",
    reserved: "Reserved",
    repair: "Repair",
    gasoline: "Gasoline",
    diesel: "Diesel",
    automatic: "Automatic",
    manual: "Manual",
    loginFailed: "Login failed",
    email: "Email",
    passwordPlaceholder: "Password",
    loginButton: "Login",
    successAddCar: "The car was added successfully",
    errorAddCar: "An error occurred while adding the car.",
    updateCarSuccess: "Car updated successfully",
    updateCarFail: "Update failed",
    reservationsTitle: "RESERVATIONS",
    clientLabel: "CLIENT",
    phoneLabel: "PHONE",
    licenseLabel: "LICENSE NO.",
    vehicleLabel: "VEHICLE",
    plateLabel: "PLATE",
    startLabel: "START",
    endLabel: "END",
    statusLabel: "STATUS",
    operationsLabel: "OPERATIONS",
    pickupLabel: "PICKUP",
    pendingStatus: "Pending",
    cancelledStatus: "Cancelled",
    confirmedStatus: "Confirmed",
    activeStatus: "Active",
    expiredStatus: "Expired",
    chooseStatus: "Choose",
    contractClient: "Client",
    contractDate: "Date",
    contractAction: "Action",
  },
  ar: {
    dashboard: "لوحة التحكم",
    cars: "السيارات",
    reservations: "الحجوزات",
    clients: "العملاء",
    contracts: "العقود",
    logout: "تسجيل الخروج",
    search: "بحث",
    addCar: "إضافة سيارة",
    delete: "حذف",
    update: "تحديث",
    ok: "موافق",
    cancel: "إلغاء",
    confirmDelete: "هل أنت متأكد أنك تريد حذف هذه السيارة؟",
    fleet: "الأسطول",
    clientsTitle: "العملاء",
    fullName: "الاسم الكامل",
    phone: "الهاتف",
    licenseNo: "رقم الرخصة",
    no: "م.",
    dashboardTitle: "لوحة التحكم",
    availableCars: "السيارات المتاحة",
    totalBookings: "إجمالي الحجوزات",
    pendingBookings: "الحجوزات المعلقة",
    activeRentals: "الإيجارات النشطة",
    carsToReturn: "السيارات المطلوب إرجاعها",
    overdueRentals: "الإيجارات المتأخرة",
    contractList: "قائمة العقود",
    loadingContracts: "جارٍ تحميل العقود...",
    errorLabel: "خطأ",
    downloadPdf: "تنزيل PDF",
    login: "تسجيل الدخول",
    password: "كلمة المرور",
    demoPassword: "كلمة المرور التجريبية",
    oldPassword: "كلمة المرور القديمة",
    newPassword: "كلمة المرور الجديدة",
    save: "حفظ",
    settingsTitle: "الإعدادات",
    changePassword: "تغيير كلمة المرور",
    brand: "العلامة التجارية",
    model: "الموديل",
    year: "السنة",
    plate: "اللوحة",
    price: "السعر لكل يوم",
    image: "الصورة",
    status: "الحالة",
    fuel: "الوقود",
    transmission: "الانتقال",
    add: "إضافة",
    choose: "--اختر--",
    available: "متاح",
    reserved: "محجوز",
    repair: "إصلاح",
    gasoline: "بنزين",
    diesel: "ديزل",
    automatic: "أوتوماتيك",
    manual: "يدوي",
    loginFailed: "فشل تسجيل الدخول",
    email: "البريد الإلكتروني",
    passwordPlaceholder: "كلمة المرور",
    loginButton: "تسجيل الدخول",
    successAddCar: "تمت إضافة السيارة بنجاح",
    errorAddCar: "حدث خطأ أثناء إضافة السيارة.",
    updateCarSuccess: "تم تحديث السيارة بنجاح",
    updateCarFail: "فشل التحديث",
    reservationsTitle: "الحجوزات",
    clientLabel: "العميل",
    phoneLabel: "الهاتف",
    licenseLabel: "رقم الرخصة",
    vehicleLabel: "المركبة",
    plateLabel: "اللوحة",
    startLabel: "البداية",
    endLabel: "النهاية",
    statusLabel: "الحالة",
    operationsLabel: "العمليات",
    pickupLabel: "الاستلام",
    pendingStatus: "قيد الانتظار",
    cancelledStatus: "ملغاة",
    confirmedStatus: "مؤكدة",
    activeStatus: "نشطة",
    expiredStatus: "منتهية",
    chooseStatus: "اختر",
    contractClient: "العميل",
    contractDate: "التاريخ",
    contractAction: "الإجراء",
  },
};

function Layout({ children, language, onLanguageChange, translations }) {
  const [showSettings, setShowSettings] = useState(false);
  function handleClick(value) {
    setShowSettings(value);
  }
  return (
    <div
      dir="ltr"
      className={`flex flex-col w-screen h-screen ${language === "ar" ? "font-Cairo" : "font-Poppins"} bg-primary overflow-hidden`}
    >
      <SideBar
        onClick={handleClick}
        language={language}
        onLanguageChange={onLanguageChange}
        translations={translations}
      />
      <div className="w-full h-4/5">{children}</div>
      {showSettings && (
        <Setting
          onClick={handleClick}
          language={language}
          onLanguageChange={onLanguageChange}
          translations={translations}
        />
      )}
    </div>
  );
}

function AppRoutes({ language, onLanguageChange, translations }) {
  const { user } = useAuth();

  return (
    <Routes>
      {/* PUBLIC */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login language={language} translations={translations[language]} />
          )
        }
      />

      {/* PROTECTED */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={
            <Layout
              language={language}
              onLanguageChange={onLanguageChange}
              translations={translations[language]}
            >
              <Dashboard
                language={language}
                translations={translations[language]}
                clients={[]}
              />
            </Layout>
          }
        />

        <Route
          path="/cars"
          element={
            <Layout
              language={language}
              onLanguageChange={onLanguageChange}
              translations={translations[language]}
            >
              <Cars language={language} translations={translations[language]} />
            </Layout>
          }
        />

        <Route
          path="/rentals"
          element={
            <Layout
              language={language}
              onLanguageChange={onLanguageChange}
              translations={translations[language]}
            >
              <Rentals
                language={language}
                translations={translations[language]}
              />
            </Layout>
          }
        />

        <Route
          path="/clients"
          element={
            <Layout
              language={language}
              onLanguageChange={onLanguageChange}
              translations={translations[language]}
            >
              <Clients
                language={language}
                translations={translations[language]}
              />
            </Layout>
          }
        />

        <Route
          path="/invoices"
          element={
            <Layout
              language={language}
              onLanguageChange={onLanguageChange}
              translations={translations[language]}
            >
              <Invoices
                language={language}
                translations={translations[language]}
              />
            </Layout>
          }
        />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes
          language={language}
          onLanguageChange={handleLanguageChange}
          translations={translations}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}
