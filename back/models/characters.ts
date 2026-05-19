interface Character {
  id: string;
  name: string;
  system_prompt: string | null;
  description_ia: string;
  created_at: Date;
  updated_at: Date;
}

export default Character;
