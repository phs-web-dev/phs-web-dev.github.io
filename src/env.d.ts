/// <reference types="astro/client" />

import type JSConfetti from "js-confetti";

declare global {
  interface Window {
    jsConfetti: JSConfetti;
  }

  interface Schedule {
    type: string;
    periods: Period[];
  }

  interface Period {
    period: string;
    startTime: number;
    endTime: number;
  }
}
