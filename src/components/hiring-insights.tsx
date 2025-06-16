"use client";

import Link from "next/link";
import { getHiringInsights } from "@/lib/api";
import { HiringDataPoint } from "@/types";
import { ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "./custom-tooltip";
import CustomLegend from "./custom-legend";

export default function HiringInsights() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [chartData, setChartData] = useState<HiringDataPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const insightsData = await getHiringInsights();
        setChartData(insightsData);
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl rounded-xl border border-gray-100 bg-white p-4 shadow-md sm:p-6">
      <div className="mb-4 flex flex-row items-start justify-between sm:flex-row sm:items-center">
        <h2
          data-testid="title"
          className="mb-2 w-full text-lg font-semibold text-gray-800 sm:mb-0 sm:text-xl"
        >
          Hiring Insights
        </h2>
        <div className="relative flex w-full justify-end">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 focus:outline-none sm:px-3"
          >
            Last 30 days
            <ChevronDown
              size={16}
              className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border bg-white shadow-lg">
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
              >
                Last 30 days
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
              >
                Last 90 days
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-50"
              >
                Last 6 months
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="h-[300px] w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            <Loader2 data-testid="loading" className="animate-spin" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e0e0e0"
              />
              <XAxis
                dataKey="day"
                tickFormatter={(value) => String(value).padStart(2, "0")}
                tick={{ dy: 10, fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                interval={1}
              />
              <YAxis
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                ticks={[0, 20, 40, 60, 80, 100]}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#d1d5db",
                  strokeWidth: 1,
                  strokeDasharray: "3 3",
                }}
              />

              <Line
                type="monotone"
                dataKey="applicationToInterview"
                name="Application to Interview Rate"
                stroke="#34D399"
                strokeWidth={2.5}
                dot={false}
                aria-label="Application to Interview Rate"
              />
              <Line
                type="monotone"
                dataKey="offerAcceptance"
                name="Offer Acceptance Rate"
                stroke="#8B5CF6"
                strokeWidth={2.5}
                dot={false}
                aria-label="Offer Acceptance Rate"
              />
              <Line
                type="monotone"
                dataKey="rejection"
                name="Rejection Rate"
                stroke="#F97316"
                strokeWidth={2.5}
                dot={false}
                aria-label="Rejection Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <CustomLegend />
    </div>
  );
}
