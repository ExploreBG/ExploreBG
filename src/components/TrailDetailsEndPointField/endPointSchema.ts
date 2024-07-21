import { z } from 'zod';

import { endPointValidation } from '@/utils/validations';

export const endPointSchema = z.object({
    endPoint: endPointValidation
});