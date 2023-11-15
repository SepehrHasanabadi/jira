export enum TaskStatus {
  VISIBLE="visible",
  ARCHIEVED="archieved"
}

export interface TaskItem {
  id: string,
  static: {
    name: string,
    description: string,
    status: TaskStatus
  },
  custom: [{
    name: string,
    value: string,
    type: string
  }]
}