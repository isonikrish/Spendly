"use client"
import useApp from "@/stores/useApp"

function Dashboard() {
  const { user } = useApp();
  return (
    <div className="bg- p-8">
      <h2 className="text-4xl font-bold">Hi, {user?.name} 👋</h2>
      <p className="text-gray-500 mt-2">
        Here's what happenning with your money, Lets Manage your expense
      </p>
    </div>
  )
}

export default Dashboard