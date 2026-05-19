interface Character {
  id: string;
  name: string;
  systemPrompt: string | null;
  descriptionIa: string;
  createdAt: Date;
  updatedAt: Date;
}

export default Character;
