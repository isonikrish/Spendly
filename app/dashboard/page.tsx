<<<<<<< HEAD
import DashboardHeroSection from "@/components/DashboardHeroSection";
import DashboardMainContent from "@/components/DashboardMainContent";
=======
"use client"
import useApp from "@/stores/useApp"
>>>>>>> 52528b85859e6443957a1724c9c7f9e0506ae870

function Dashboard() {
  const { user } = useApp();
  return (
<<<<<<< HEAD
    <div className="p-10 h-auto w-full">
      <DashboardHeroSection />
      <DashboardMainContent />
    </div>
  );
=======
    <div className="bg- p-8">
      <h2 className="text-4xl font-bold">Hi, {user?.name} 👋</h2>
      <p className="text-gray-500 mt-2">
        Here's what happenning with your money, Lets Manage your expense
      </p>
    </div>
  )
>>>>>>> 52528b85859e6443957a1724c9c7f9e0506ae870
}

export default Dashboard;
