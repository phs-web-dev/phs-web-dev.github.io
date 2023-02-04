/// <reference types="@astrojs/image/client" />

import type JSConfetti from "js-confetti";

declare global {
  interface Window {
    addConfetti: () => void;
  }

  //
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
