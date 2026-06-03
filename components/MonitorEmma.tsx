"use client";
import { useState, useEffect } from "react";

interface Metricas {
  cpu: number;
  ram: number;
  red: number;
  temperatura: number;
}

export default function MonitorEmma() {
  const [metricas, setMetricas] = useState<Metricas>({
    cpu: 0,
    ram: 0,
    red: 0,
    temperatura: 0,
  });

  useEffect(() => {
    const intervalo = setInterval(() => {
      setMetricas({
        cpu: Math.floor(Math.random() * 60) + 20,
        ram: Math.floor(Math.random() * 40) + 40,
        red: Math.floor(Math.random() * 80) + 10,
        temperatura: Math.floor(Math.random() * 20) + 50,
      });
    }, 1500);
    return () => clearInterval(intervalo);
  }, []);

  const getColor = (valor: number): string => {
    if (valor < 50) return "bg-green-500";
    if (valor < 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  const metricsData = [
    { label: "CPU", valor: metricas.cpu, unidad: "%" },
    { label: "RAM", valor: metricas.ram, unidad: "%" },
    { label: "Red", valor: metricas.red, unidad: "Mbps" },
    { label: "Temperatura", valor: metricas.temperatura, unidad: "°C" },
  ];

  return (
    <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl w-full max-w-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Panel de Emma</h2>
          <p className="text-gray-400 text-sm">Monitor en tiempo real</p>
        </div>
        <span className="flex items-center gap-2 text-green-400 text-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          En línea
        </span>
      </div>

      <div className="space-y-4">
        {metricsData.map((m) => (
          <div key={m.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">{m.label}</span>
              <span className="font-mono text-white">
                {m.valor}{m.unidad}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-700 ${getColor(m.valor)}`}
                style={{ width: `${Math.min(m.valor, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700 text-xs text-gray-500 text-center">
        Desarrollado por Emma · rama: Emma
      </div>
    </div>
  );
}