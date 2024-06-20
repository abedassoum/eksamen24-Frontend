interface Participant {
    id?: number;
    name: string;
    gender: string;
    age: number;
    club: string;
    disciplines: Discipline[];
    results: Result[];
  }
  
  interface Discipline {
    id: number;
    name: string;
    resultType: string;
  }
  
  interface Result {
    id: number;
    resultType: string;
    date: string;
    resultValue: string;
    disciplineId: number;
  }


  export type { Participant, Discipline, Result };