import Step from '@/models/step';

export default interface Journey {
    id: number;
    hStart: Date;
    hArrive: Date;
    c02: number;
    duration: number;
    step: Step[];
}
