import connection from '../db-config';
import { snakeToCamel } from '../validators';

/**
 * Factory CRUD générique pour créer des opérations de base de données
 * Élimine la duplication de code entre les tables utilisateurs, personnages, conversations et messages
 */

export interface CRUDConfig {
  tableName: string;
  primaryKey?: string; // par défaut 'id'
}

export const createBaseCRUD = <T>(config: CRUDConfig) => {
  const { tableName, primaryKey = 'id' } = config;

  return {
    /**
     * Trouver un seul enregistrement par ID
     */
    findOne: async (id: string): Promise<T | null> => {
      const query = `SELECT * FROM ${tableName} WHERE ${primaryKey} = $1`;
      const result = await connection.query(query, [id]);
      if (result.rows.length === 0) {
        return null;
      }
      return snakeToCamel<T>(result.rows[0]);
    },

    /**
     * Trouver tous les enregistrements
     */
    findAll: async (): Promise<T[]> => {
      const query = `SELECT * FROM ${tableName}`;
      const result = await connection.query(query);
      return result.rows.map(row => snakeToCamel<T>(row));
    },

    /**
     * Supprimer un seul enregistrement par ID
     */
    deleteOne: async (id: string): Promise<string> => {
      const query = `DELETE FROM ${tableName} WHERE ${primaryKey} = $1`;
      await connection.query(query, [id]);
      return `${tableName} supprimé avec succès`;
    },

    /**
     * Exécuter une requête personnalisée pour les opérations de création/mise à jour
     */
    query: async (sql: string, values: (string | null)[]) => {
      return connection.query(sql, values);
    },
  };
};
