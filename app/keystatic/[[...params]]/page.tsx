import { makePage } from '@keystatic/next/ui/app';
import keystaticConfig from '@/keystatic/config';

export const runtime = 'edge';

export default makePage(keystaticConfig);
