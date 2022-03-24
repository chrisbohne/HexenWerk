import { flatLayout, Layout, pixelToHex, Point, hexCorners } from './hexLogic';

const centerPoint = Point(0, 0);

const flat = Layout(flatLayout, Point(10, 10), centerPoint);

export const centerHex = pixelToHex(flat, centerPoint);

export const corners = hexCorners(flat, { x: 0, y: 0, z: 0 });
