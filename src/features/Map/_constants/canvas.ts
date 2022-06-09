export const MIN_SCALE = 0.5;
export const MAX_SCALE = 1.8;
export const INTERVAL = 0.1;

export const zoomLevels: number[] = [];
for (let i = MIN_SCALE; i < MAX_SCALE + INTERVAL; i += INTERVAL) {
  zoomLevels.push(+i.toFixed(1));
}
