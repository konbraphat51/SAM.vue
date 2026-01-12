import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const types = `import { DefineComponent } from 'vue';

export type SamAxis = 'arousal' | 'valence' | 'dominance';
export type DisplayFormat = 'five' | 'nine';

export interface SamProps {
  axes?: SamAxis[];
  displayFormat?: DisplayFormat;
  arousalLegendLeft?: string;
  arousalLegendRight?: string;
  valenceLegendLeft?: string;
  valenceLegendRight?: string;
  dominanceLegendLeft?: string;
  dominanceLegendRight?: string;
}

export interface SamEmits {
  (e: 'select', axis: SamAxis, value: number): void;
  (e: 'update:arousal', value: number | null): void;
  (e: 'update:valence', value: number | null): void;
  (e: 'update:dominance', value: number | null): void;
}

export declare const SamSelector: DefineComponent<SamProps, {}, {}, {}, {}, {}, {}, SamEmits>;

export default SamSelector;
`;

const distDir = join(__dirname, '..', 'dist');
const distPath = join(distDir, 'index.d.ts');

// Ensure dist directory exists
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

writeFileSync(distPath, types, 'utf-8');
console.log('Type definitions generated successfully');
