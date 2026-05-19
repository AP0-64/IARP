import { Request, Response } from 'express';

import { ValidationError } from '../validators';

/**
 * Enveloppe générique de gestionnaire de route asynchrone
 * Élimine la duplication des blocs try-catch dans les gestionnaires de route
 */
export const asyncHandler = (
  handler: (req: Request, res: Response) => Promise<Response | void>
): ((req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      await handler(req, res);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ errorMessage: error.message });
        return;
      }
      const message =
        error instanceof Error ? error.message : 'Erreur inconnue';
      res.status(500).json({ errorMessage: message });
    }
  };
};
