export interface Task {
  id: number,
  name: string,
  status: boolean,
  date?:Date|null
  category: string | null
}