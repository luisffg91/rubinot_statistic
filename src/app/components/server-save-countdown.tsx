'use client';

import { useEffect, useState } from 'react';
import { timeUntilServerSave, type Countdown } from '@/domain/services/server-save';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Indicador de contagem regressiva para o próximo Server Save (10h Brasília).
 * Atualiza a cada segundo. Enquanto não montou no cliente, mostra um placeholder
 * estável para evitar divergência de hidratação (o horário só existe no cliente).
 */
export function ServerSaveCountdown() {
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  useEffect(() => {
    const tick = () => setCountdown(timeUntilServerSave(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const value = countdown
    ? `${pad(countdown.hours)}:${pad(countdown.minutes)}:${pad(countdown.seconds)}`
    : '--:--:--';

  return (
    <div
      className="server-save"
      data-testid="server-save"
      title="Server Save diário às 10h (horário de Brasília)"
    >
      <svg
        className="server-save__icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="server-save__label">Server Save</span>
      <time className="server-save__value" dateTime={value} aria-live="off">
        {value}
      </time>
    </div>
  );
}
