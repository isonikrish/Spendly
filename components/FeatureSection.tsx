"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function FeaturesSection() {
  const router = useRouter();
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">
          Our Amazing Features
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2">
            <CardHeader>
              <Brain className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>Smart Budget Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our AI analyzes your spending patterns and automatically creates
                personalized budgets. It adapts to your lifestyle and suggests
                smart ways to save money.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <Wallet className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>Intelligent Bill Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Never miss a payment again. AI tracks your bills, predicts
                upcoming expenses, and schedules payments automatically while
                maintaining optimal account balance.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <TrendingUp className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>Predictive Financial Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get ahead of your finances with AI-powered predictions. Receive
                smart alerts about potential overspending and personalized
                recommendations for better financial health.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div
        onClick={() => {
          router.push("/signup");
        }}
        className="flex justify-center mt-12 "
      >
        <Button className="p-5 font-medium text-2xl h-auto w-auto">
          Get Started
        </Button>
      </div>
    </section>
  );
}
