"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../../../../utils/supabase/client";

const DashboardPage = () => {
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [generatedCount, setGeneratedCount] = useState<number>(0);
  const [generatedDays, setGeneratedDays] = useState<any[]>([]); // Stores the count of generated images by date
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Reference for the canvas element
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    value: string;
  } | null>(null);

  // Static cost value
  const staticCost = 320; // Static cost value, you can change this as needed

  // Fetch the count of projects and generated images
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the count of projects
        const { count: projectCount, error: projectError } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true });
        if (projectError) throw projectError;
        setProjectsCount(projectCount || 0);

        // Get the count of generated images
        const { count: generatedCount, error: generatedError } = await supabase
          .from("generated")
          .select("*", { count: "exact", head: true });
        if (generatedError) throw generatedError;
        setGeneratedCount(generatedCount || 0);

        // Get the generated images grouped by day (assuming 'created_at' column exists)
        const { data: generatedData, error: generatedDaysError } =
          await supabase
            .from("generated")
            .select("created_at")
            .gte("created_at", "2023-01-01") // Adjust the start date as needed
            .order("created_at", { ascending: true });
        if (generatedDaysError) throw generatedDaysError;

        // Group generated images by date
        const groupedByDate = generatedData.reduce(
          (acc: Record<string, number>, { created_at }: any) => {
            const date = created_at.split("T")[0]; // Extract date from the datetime
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );

        // Prepare data for the chart
        setGeneratedDays(
          Object.entries(groupedByDate).map(([date, count]) => ({
            date,
            count
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Draw the bar chart using canvas
  useEffect(() => {
    const drawChart = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const labels = generatedDays.map((day) => day.date);
      const data = generatedDays.map((day) => day.count);
      const chartWidth = canvas.width;
      const chartHeight = canvas.height;
      const barWidth = chartWidth / labels.length;
      const maxDataValue = Math.max(...data);

      ctx.clearRect(0, 0, chartWidth, chartHeight); // Clear previous chart

      // Draw bars
      data.forEach((value, index) => {
        const barHeight = (value / maxDataValue) * (chartHeight - 40); // Scale bar height
        const x = index * barWidth;
        const y = chartHeight - barHeight - 20;

        ctx.fillStyle = "rgba(75, 192, 192, 0.7)";
        ctx.fillRect(x, y, barWidth - 5, barHeight);

        // Display value on top of the bar
        ctx.fillStyle = "black";
        ctx.fillText(
          value.toString(),
          x + barWidth / 2 - ctx.measureText(value.toString()).width / 2,
          y - 5
        );

        // Tooltip handling on hover
        canvas.addEventListener("mousemove", (e) => {
          const mouseX = e.offsetX;
          const mouseY = e.offsetY;

          if (
            mouseX >= x &&
            mouseX <= x + barWidth - 5 &&
            mouseY >= y &&
            mouseY <= y + barHeight
          ) {
            setTooltip({
              x: mouseX,
              y: mouseY,
              value: `${labels[index]}: ${value}`
            });
          }
        });

        // Hide tooltip if mouse leaves the bar
        canvas.addEventListener("mouseout", () => {
          setTooltip(null);
        });
      });

      // Draw axes
      ctx.beginPath();
      ctx.moveTo(20, 20);
      ctx.lineTo(20, chartHeight - 20); // Y axis
      ctx.lineTo(chartWidth - 20, chartHeight - 20); // X axis
      ctx.strokeStyle = "black";
      ctx.stroke();
    };

    if (generatedDays.length) {
      drawChart();
    }
  }, [generatedDays]);

  return (
    <div className="p-6 py-12 flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Projects and Generated Count */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold">Projects</h3>
          <p className="text-2xl">{projectsCount}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold">Generated Images</h3>
          <p className="text-2xl">{generatedCount}</p>
        </div>

        {/* Static Cost Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold">Static Cost</h3>
          <p className="text-2xl">
            ${Number(+generatedCount * 0.4).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Canvas Bar Chart Section */}
      <div className="bg-white shadow-md rounded-lg p-6 col-span-2 sm:col-span-1">
        <h3 className="text-xl font-semibold">Generated Images Over Time</h3>
        <canvas ref={canvasRef} width={800} height={400}></canvas>
      </div>
      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute bg-gray-800 text-white p-2 rounded"
          style={{ top: tooltip.y, left: tooltip.x }}>
          {tooltip.value}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
